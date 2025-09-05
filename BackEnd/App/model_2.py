# %%
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

# %%
from sklearn.preprocessing import LabelEncoder, OrdinalEncoder
from sklearn.impute import SimpleImputer
from imblearn.over_sampling import SMOTE

# -------------------
# 1. Load dataset
# -------------------
df = pd.read_csv(r"D:\Work\Others\Hamed\Project\BackEnd\Data\csv_result-chronic_kidney_disease_full.csv", on_bad_lines='skip')
df.replace("?", np.nan, inplace=True)
df.columns = df.columns.str.strip().str.replace("'", "")

target_col = "class"
id_col = "id"
leak_cols = [
    'htn', 'dm', 'cad', 'appet', 'pe', 'ane',
    'pcc', 'ba', 'al', 'su', 'rbc', 'pc'
]

# -------------------
# 2. Separate target & features
# -------------------
y = df[target_col]
X = df.drop(columns=[target_col, id_col] + leak_cols)

# -------------------
# 3. Identify column types BEFORE conversion
# -------------------
numeric_cols = X.select_dtypes(include=['number']).columns.tolist()
categorical_cols = X.select_dtypes(exclude=['number']).columns.tolist()

# -------------------
# 4. Encode target
# -------------------
label_enc = LabelEncoder()
y_encoded = label_enc.fit_transform(y)  # 0 = ckd, 1 = notckd

# -------------------
# 5. Process numeric columns
# -------------------
# Convert numeric-looking strings to floats
for col in numeric_cols:
    X[col] = pd.to_numeric(X[col], errors='coerce')

num_imputer = SimpleImputer(strategy='mean')
X_num = num_imputer.fit_transform(X[numeric_cols]) if numeric_cols else np.empty((len(X), 0))

# -------------------
# 6. Process categorical columns
# -------------------
# Impute missing categories
cat_imputer = SimpleImputer(strategy='most_frequent')
X_cat = cat_imputer.fit_transform(X[categorical_cols]) if categorical_cols else np.empty((len(X), 0))

# Encode categories for SMOTE
cat_encoder = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)
X_cat_enc = cat_encoder.fit_transform(X_cat) if categorical_cols else np.empty((len(X), 0))

# -------------------
# 7. Combine numeric + categorical
# -------------------
X_processed = np.hstack([X_num, X_cat_enc])
processed_columns = numeric_cols + categorical_cols

# -------------------
# 8. Apply SMOTE
# -------------------
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_processed, y_encoded)

# -------------------
# 9. Decode numeric + categorical columns
# -------------------
# Numeric part
df_num_resampled = pd.DataFrame(X_resampled[:, :len(numeric_cols)], columns=numeric_cols)

# Categorical part
if categorical_cols:
    X_cat_decoded = cat_encoder.inverse_transform(X_resampled[:, len(numeric_cols):])
    df_cat_resampled = pd.DataFrame(X_cat_decoded, columns=categorical_cols)
else:
    df_cat_resampled = pd.DataFrame()

# Combine decoded data
df_resampled = pd.concat([df_num_resampled, df_cat_resampled], axis=1)

# Add target back
df_resampled[target_col] = label_enc.inverse_transform(y_resampled)

# -------------------
# 10. Save to CSV
# -------------------
df_resampled.to_csv("resampled_data.csv", index=False)

print("Original class distribution:")
print(pd.Series(y_encoded).value_counts())

print("\nNew class distribution after SMOTE:")
print(pd.Series(y_resampled).value_counts())

print("\nSaved as resampled_data.csv")


# %%
df = pd.read_csv("resampled_data.csv", on_bad_lines='skip')

# Target column
target_col = "class"
X = df.drop(columns=[target_col])
y = df[target_col]

# Encode target
label_enc = LabelEncoder()
y = label_enc.fit_transform(y)  # 0 = no CKD, 1 = CKD

# Identify numeric & categorical columns
numeric_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()
categorical_cols = X.select_dtypes(exclude=['int64', 'float64']).columns.tolist()

# %%
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='mean'))
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', LabelEncoder())  # This won't work in ColumnTransformer directly
])

# Handle categorical encoding separately using OrdinalEncoder
from sklearn.preprocessing import OrdinalEncoder
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1))
])

# Combine transformations
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_cols),
        ('cat', categorical_transformer, categorical_cols)
    ]
)

# Model
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(random_state=42))
])

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)

print(f"Model accuracy: {model.score(X_test, y_test):.2f}")
from sklearn.metrics import classification_report
y_pred = model.predict(X_test)
X_train
print(classification_report(y_test, y_pred, target_names=label_enc.classes_))


# %%
model.fit(X, y)
# downloading the model
import pickle
with open("kidney_model.pkl", "wb") as f:
    pickle.dump(model, f)

# %%
def predict_from_input():
    user_data = {}
    for col in X.columns:
        val = input(f"Enter value for '{col}' (leave blank for NaN): ").strip()
        user_data[col] = np.nan if val == "" else val

    # Convert to DataFrame
    user_df = pd.DataFrame([user_data])

    # Convert numeric columns to float
    for col in numeric_cols:
        user_df[col] = pd.to_numeric(user_df[col], errors='coerce')

    prediction = model.predict(user_df)[0]
    pred_label = label_enc.inverse_transform([prediction])[0]
    print(f"\nPrediction: {pred_label}")

# %%
predict_from_input()

# %%


