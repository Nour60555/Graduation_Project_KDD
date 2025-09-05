import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, OrdinalEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from imblearn.over_sampling import SMOTE
from sklearn.metrics import classification_report

def train_model():
    print("📂 Loading dataset...")
    df = pd.read_csv(r"D:\Work\Others\Hamed\Project\BackEnd\Data\csv_result-chronic_kidney_disease_full.csv", on_bad_lines='skip')
    df.replace("?", np.nan, inplace=True)
    df.columns = df.columns.str.strip().str.replace("'", "")

    target_col = "class"
    id_col = "id"
    leak_cols = [
        'htn', 'dm', 'cad', 'appet', 'pe', 'ane',
        'pcc', 'ba', 'al', 'su', 'rbc', 'pc'
    ]

    # Separate target & features
    y = df[target_col]
    X = df.drop(columns=[target_col, id_col] + leak_cols)

    # Identify column types
    numeric_cols = X.select_dtypes(include=['number']).columns.tolist()
    categorical_cols = X.select_dtypes(exclude=['number']).columns.tolist()

    # Encode target
    label_enc = LabelEncoder()
    y_encoded = label_enc.fit_transform(y)

    # Convert numeric columns
    for col in numeric_cols:
        X[col] = pd.to_numeric(X[col], errors='coerce')

    # Impute numeric
    num_imputer = SimpleImputer(strategy='mean')
    X_num = num_imputer.fit_transform(X[numeric_cols]) if numeric_cols else np.empty((len(X), 0))

    # Impute categorical
    cat_imputer = SimpleImputer(strategy='most_frequent')
    X_cat = cat_imputer.fit_transform(X[categorical_cols]) if categorical_cols else np.empty((len(X), 0))

    # Encode categorical for SMOTE
    cat_encoder = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)
    X_cat_enc = cat_encoder.fit_transform(X_cat) if categorical_cols else np.empty((len(X), 0))

    # Combine numeric + categorical
    X_processed = np.hstack([X_num, X_cat_enc])

    # Apply SMOTE
    print("🔄 Applying SMOTE to balance dataset...")
    smote = SMOTE(random_state=42)
    X_resampled, y_resampled = smote.fit_resample(X_processed, y_encoded)

    # Prepare final DataFrame
    df_num_resampled = pd.DataFrame(X_resampled[:, :len(numeric_cols)], columns=numeric_cols)
    if categorical_cols:
        X_cat_decoded = cat_encoder.inverse_transform(X_resampled[:, len(numeric_cols):])
        df_cat_resampled = pd.DataFrame(X_cat_decoded, columns=categorical_cols)
    else:
        df_cat_resampled = pd.DataFrame()

    df_resampled = pd.concat([df_num_resampled, df_cat_resampled], axis=1)
    df_resampled[target_col] = label_enc.inverse_transform(y_resampled)

    print("💾 Saving resampled dataset...")
    df_resampled.to_csv("resampled_data.csv", index=False)

    # Load resampled data for training
    df = pd.read_csv("resampled_data.csv", on_bad_lines='skip')
    X = df.drop(columns=[target_col])
    y = df[target_col]
    y = label_enc.fit_transform(y)

    # Identify numeric & categorical columns
    numeric_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()
    categorical_cols = X.select_dtypes(exclude=['int64', 'float64']).columns.tolist()

    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='mean'))
    ])

    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('encoder', OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1))
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_cols),
            ('cat', categorical_transformer, categorical_cols)
        ]
    )

    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(random_state=42))
    ])

    print("⚡ Training model...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model.fit(X_train, y_train)

    acc = model.score(X_test, y_test)
    print(f"✅ Model trained with accuracy: {acc:.2f}")
    y_pred = model.predict(X_test)
    print("\n📊 Classification Report:\n")
    print(classification_report(y_test, y_pred, target_names=label_enc.classes_))

    # Save model
    print("💾 Saving trained model to ckd_model.pkl...")
    with open("ckd_model.pkl", "wb") as f:
        pickle.dump(model, f)
    print("🎉 Training complete! Model ready for use.")

if __name__ == "__main__":
    train_model()
