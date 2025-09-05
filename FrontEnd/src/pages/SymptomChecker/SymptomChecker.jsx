import React, { useState } from "react";
import "./SymptomChecker.css";

export default function SymptomChecker() {
  const [formData, setFormData] = useState({
    age: "",
    bp: "",
    sg: "",
    bgr: "",
    bu: "",
    sc: "",
    sod: "",
    pot: "",
    hemo: "",
    pcv: "",
    wbcc: "",
    rbcc: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const labels = {
    age: "Age (years)",
    bp: "Blood Pressure (mm Hg)",
    sg: "Specific Gravity (1.005 - 1.025)",
    bgr: "Blood Glucose Random (mg/dl)",
    bu: "Blood Urea (mg/dl)",
    sc: "Serum Creatinine (mg/dl)",
    sod: "Sodium (mEq/L)",
    pot: "Potassium (mEq/L)",
    hemo: "Hemoglobin (g/dl)",
    pcv: "Packed Cell Volume (%)",
    wbcc: "White Blood Cell Count (/cmm)",
    rbcc: "Red Blood Cells (million/cmm)",
  };

  const placeholders = {
    age: "e.g. 45",
    bp: "e.g. 120",
    sg: "e.g. 1.02",
    bgr: "e.g. 90",
    bu: "e.g. 15",
    sc: "e.g. 1.0",
    sod: "e.g. 140",
    pot: "e.g. 4.5",
    hemo: "e.g. 16",
    pcv: "e.g. 48",
    wbcc: "e.g. 8000",
    rbcc: "e.g. 5",
  };

  const validationRanges = {
    age: [1, 120],
    bp: [30, 250],
    sg: [1.005, 1.025],
    bgr: [1, 1000],
    bu: [1, 300],
    sc: [0.1, 15],
    sod: [50, 200],
    pot: [2, 10],
    hemo: [3, 20],
    pcv: [10, 60],
    wbcc: [1000, 25000],
    rbcc: [1, 10],
  };

  const fieldGroups = {
    "General Info": ["age", "bp", "sg"],
    "Blood Tests": ["bgr", "bu", "sc", "sod", "pot", "hemo"],
    "Cell Counts": ["pcv", "wbcc", "rbcc"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateInputs = () => {
    for (let [key, val] of Object.entries(formData)) {
      if (val === "") continue;
      const num = Number(val);
      const [min, max] = validationRanges[key];
      if (isNaN(num) || num < min || num > max) {
        return `${labels[key]} should be between ${min} and ${max}`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);
    const validationMsg = validateInputs();
    if (validationMsg) {
      setValidationError(validationMsg);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const cleanedData = Object.fromEntries(
        Object.entries(formData).map(([key, val]) => [
          key,
          val === "" ? null : Number(val),
        ])
      );

      const response = await fetch("http://127.0.0.1:9000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Server error: ${errText}`);
      }

      const data = await response.json();

      let predictionText = "";
      if (data.prediction.toLowerCase() === "ckd") {
        predictionText =
          "⚠️ You are classified as having Chronic Kidney Disease (CKD).";
      } else if (data.prediction.toLowerCase() === "notckd") {
        predictionText = "✅ You are not classified as having CKD.";
      } else {
        predictionText = "⚠️ Unexpected result.";
      }

      setResult({ ...data, predictionText });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      age: "",
      bp: "",
      sg: "",
      bgr: "",
      bu: "",
      sc: "",
      sod: "",
      pot: "",
      hemo: "",
      pcv: "",
      wbcc: "",
      rbcc: "",
    });
    setResult(null);
    setError(null);
    setValidationError(null);
  };

  const handleTestData = () => {
    setFormData({
      age: 45,
      bp: 120,
      sg: 1.02,
      bgr: 90,
      bu: 15,
      sc: 1.0,
      sod: 140,
      pot: 4.5,
      hemo: 16,
      pcv: 48,
      wbcc: 8000,
      rbcc: 5,
    });
    setResult(null);
    setError(null);
    setValidationError(null);
  };

  return (
    <div className="symptom-checker-container">
      <h2 className="title">Kidney Disease Symptom Checker</h2>
      <p className="subtitle">
        Enter test results to check the likelihood of Chronic Kidney Disease
        (CKD).
      </p>

      {!result && (
        <form className="symptom-form" onSubmit={handleSubmit}>
          {Object.entries(fieldGroups).map(([group, keys]) => (
            <fieldset key={group} className="form-section">
              <legend>{group}</legend>
              <div className="form-grid">
                {keys.map((key) => (
                  <div key={key} className="form-group">
                    <label htmlFor={key}>{labels[key]}</label>
                    <input
                      id={key}
                      type="number"
                      step="any"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={placeholders[key]}
                    />
                  </div>
                ))}
              </div>
            </fieldset>
          ))}

          {validationError && (
            <div className="validation-error">{validationError}</div>
          )}

          <div className="form-buttons">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Checking..." : "Submit"}
            </button>
            <button
              type="button"
              className="reset-btn"
              onClick={handleTestData}
            >
              Enter Test Data
            </button>
          </div>
        </form>
      )}

      {result && (
        <div className="result-box">
          <h3>Prediction Result</h3>
          <p>
            <strong>Result:</strong>{" "}
            <span
              className={
                result.prediction.toLowerCase() === "ckd"
                  ? "danger-text"
                  : "safe-text"
              }
            >
              {result.predictionText}
            </span>
          </p>

          <p className="timestamp">
            Checked at: {new Date(result.timestamp).toLocaleString()}
          </p>
          <button className="reset-btn" onClick={handleReset}>
            Try Again
          </button>
        </div>
      )}

      {error && (
        <div className="error-box">
          <p>Error: {error}</p>
          <button className="reset-btn" onClick={handleReset}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
