import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import pickle

DATA_PATH = "../data/csv_result-chronic_kidney_disease_full.csv"
MODEL_PATH = "../ckd_model.pkl"

def load_and_preprocess_data(path):
    print(f"🔍 Loading dataset from: {path}\n")
    # Load CSV with warnings on bad lines
    df = pd.read_csv(path, on_bad_lines='warn')

    # Strip quotes and whitespace from column names
    df.columns = [col.strip().strip("'") for col in df.columns]
    print(f"✅ Columns loaded: {df.columns.tolist()}")

    # Drop 'id' column if exists
    if 'id' in df.columns:
        df.drop(columns=['id'], inplace=True)
        print("🧹 Dropped 'id' column\n")

    # Replace '?' with NaN
    df.replace('?', np.nan, inplace=True)

    # Detect numeric and categorical columns (exclude target 'class')
    numeric_cols = []
    categorical_cols = []
    for col in df.columns:
        if col == 'class':
            continue
        sample = df[col].dropna().iloc[:10]
        if sample.empty:
            # If no data, treat as categorical to be safe
            categorical_cols.append(col)
            continue
        try:
            pd.to_numeric(sample)
            numeric_cols.append(col)
        except:
            categorical_cols.append(col)

    print(f"🔢 Numeric columns detected: {numeric_cols}")
    print(f"🔤 Categorical columns detected: {categorical_cols}\n")

    # Convert numeric columns to numeric dtype
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce')

    # Show missing values count
    print("🚨 Missing Values per column:")
    print(df.isnull().sum(), "\n")

    # Impute missing values: numeric -> median, categorical -> mode
    for col in numeric_cols:
        median_val = df[col].median()
        df[col] = df[col].fillna(median_val)
        print(f"Imputed numeric column '{col}' with median: {median_val}")

    for col in categorical_cols:
        mode_val = df[col].mode(dropna=True)[0] if not df[col].mode(dropna=True).empty else 'missing'
        df[col] = df[col].fillna(mode_val)
        print(f"Imputed categorical column '{col}' with mode: '{mode_val}'")

    print()

    # Encode categorical columns + target 'class' with LabelEncoder
    label_encoders = {}
    for col in categorical_cols + ['class']:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le
        print(f"Encoded '{col}' with classes: {list(le.classes_)}")

    print("\n✅ Data preprocessing complete.\n")

    return df, label_encoders, numeric_cols, categorical_cols

def train_and_save_model(df, label_encoders, numeric_cols, categorical_cols, model_path):
    print("🚀 Starting model training...")
    X = df.drop(columns=['class'])
    y = df['class']

    # Split data into train and test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"🧪 Training samples: {len(X_train)}, Testing samples: {len(X_test)}")

    # Train RandomForestClassifier
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)

    accuracy = model.score(X_test, y_test)
    print(f"🎯 Accuracy on test set: {accuracy:.4f}")

    # Save model, label encoders, and column info as pickle
    with open(model_path, 'wb') as f:
        pickle.dump({
            'model': model,
            'label_encoders': label_encoders,
            'numeric_cols': numeric_cols,
            'categorical_cols': categorical_cols
        }, f)

    print(f"✅ Model saved to: {model_path}\n")

if __name__ == "__main__":
    df, label_encoders, numeric_cols, categorical_cols = load_and_preprocess_data(DATA_PATH)
    train_and_save_model(df, label_encoders, numeric_cols, categorical_cols, MODEL_PATH)