from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ValidationError
import pickle
import pandas as pd
import os
import time
import traceback
from sklearn.preprocessing import LabelEncoder

# =========================
# Constants & File Paths
# =========================
MODEL_PATH = "ckd_model.pkl"
CSV_PATH = r"D:\Work\Others\Hamed\Project\BackEnd\Data\csv_result-chronic_kidney_disease_full.csv"

# =========================
# Globals
# =========================
model = None
label_encoder = None
last_model_timestamp = None

# =========================
# Utility: Logging helper
# =========================
def log_event(event: str, data=None, is_error=False):
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    prefix = "❌ ERROR" if is_error else "✅ INFO"
    if data is not None:
        print(f"[{ts}] {prefix} | {event} | Data: {data}")
    else:
        print(f"[{ts}] {prefix} | {event}")

# =========================
# Load label encoder
# =========================
def load_label_encoder():
    global label_encoder
    try:
        df = pd.read_csv(CSV_PATH, on_bad_lines='skip')
        df.replace("?", None, inplace=True)
        df.columns = df.columns.str.strip().str.replace("'", "")
        label_encoder = LabelEncoder()
        label_encoder.fit(df["class"])
        log_event("LabelEncoder initialized", list(label_encoder.classes_))
    except Exception as e:
        log_event("Failed to load label encoder", str(e), is_error=True)
        raise

# =========================
# Load or hot-reload model
# =========================
def load_model():
    global model, last_model_timestamp
    try:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file '{MODEL_PATH}' not found. Train it first using model_3.py.")

        current_timestamp = os.path.getmtime(MODEL_PATH)
        if model is None or current_timestamp != last_model_timestamp:
            with open(MODEL_PATH, "rb") as f:
                model = pickle.load(f)
            last_model_timestamp = current_timestamp
            log_event("Model loaded successfully", {"last_modified": time.ctime(last_model_timestamp)})
    except Exception as e:
        log_event("Failed to load model", traceback.format_exc(), is_error=True)
        raise

# =========================
# Input Schema
# =========================
class PatientData(BaseModel):
    age: float | None = Field(None, gt=0, lt=120)
    bp: float | None = Field(None, gt=30, lt=250)
    sg: float | None = Field(None, ge=1, le=1.025)
    bgr: float | None = Field(None, gt=0, lt=1000)
    bu: float | None = Field(None, gt=0, lt=300)
    sc: float | None = Field(None, gt=0, lt=15)
    sod: float | None = Field(None, gt=50, lt=200)
    pot: float | None = Field(None, gt=2, lt=10)
    hemo: float | None = Field(None, gt=3, lt=20)
    pcv: float | None = Field(None, gt=10, lt=60)
    wbcc: float | None = Field(None, gt=1000, lt=25000)
    rbcc: float | None = Field(None, gt=1, lt=10)

# =========================
# App Initialization
# =========================
app = FastAPI(
    title="CKD Prediction API",
    description="API for predicting Chronic Kidney Disease using a trained machine learning model.",
    version="1.1.0"
)

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Startup
# =========================
@app.on_event("startup")
def startup_event():
    log_event("Starting API...")
    load_label_encoder()
    load_model()
    log_event("API startup complete")

# =========================
# Routes
# =========================
@app.get("/")
def read_root():
    return {
        "message": "✅ CKD Prediction API is running.",
        "usage": "POST to /predict with patient data.",
        "model_last_loaded": time.ctime(last_model_timestamp) if last_model_timestamp else None
    }

@app.post("/predict")
def predict(data: PatientData, request: Request):
    try:
        # Hot reload model if updated
        load_model()

        # Convert to DataFrame
        input_df = pd.DataFrame([data.dict()]).astype(float)

        # Validate that at least one feature is provided
        if input_df.isnull().all(axis=1).iloc[0]:
            raise ValueError("No valid input features provided.")

        # Prediction
        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0].max()

        result = {
            "prediction": label_encoder.inverse_transform([prediction])[0],
            "probability": round(float(probability), 4),
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "client": request.client.host
        }

        log_event("Prediction made", {"input": data.dict(), "output": result})
        return result

    except ValidationError as ve:
        log_event("Validation error", ve.errors(), is_error=True)
        raise HTTPException(status_code=422, detail=ve.errors())
    except ValueError as ve:
        log_event("Bad input value", str(ve), is_error=True)
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        log_event("Unexpected error during prediction", traceback.format_exc(), is_error=True)
        raise HTTPException(status_code=500, detail="Internal server error. See server logs for details.")
    
# Predefined test cases for quick model testing
TEST_CASES = {
    1: {  # CKD-like case
        "age": 20, "bp": 80, "sg": 1.0, "bgr": 120, "bu": 40, "sc": 1.5,
        "sod": 111, "pot": 2, "hemo": 15, "pcv": 40, "wbcc": 7000, "rbcc": 6
    },
    2: {  # Non-CKD-like case
        "age": 45, "bp": 120, "sg": 1.02, "bgr": 90, "bu": 15, "sc": 1.0,
        "sod": 140, "pot": 4.5, "hemo": 16, "pcv": 48, "wbcc": 8000, "rbcc": 5
    }
}

@app.get("/test_case/{case_id}")
def run_test_case(case_id: int, request: Request):
    try:
        if case_id not in TEST_CASES:
            raise HTTPException(status_code=404, detail="Test case not found")

        load_model()
        data = TEST_CASES[case_id]
        input_df = pd.DataFrame([data]).astype(float)

        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0].max()

        result = {
            "case_id": case_id,
            "input": data,
            "prediction": label_encoder.inverse_transform([prediction])[0],
            "probability": round(float(probability), 4),
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "client": request.client.host
        }

        log_event("Test case run", result)
        return result

    except Exception as e:
        log_event("Error running test case", str(e), is_error=True)
        raise HTTPException(status_code=500, detail="Internal server error.")