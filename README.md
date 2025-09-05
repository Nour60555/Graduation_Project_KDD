# Kidney Disease Detection (KDD) 🩺🌐

A full-stack web application for the **early detection and awareness of Chronic Kidney Disease (CKD)**. Built with **React + Vite** (frontend) and **FastAPI + Machine Learning** (backend). Features include:

- 🔍 AI-powered symptom checker
- 📊 Real-time insights and data visualizations
- 📰 Kidney health news & research
- 💡 Lifestyle tips for prevention
- ❤️ Donation feature to support awareness

---

## 💡 Project Overview

**Kidney Disease Detection (KDD)** is designed to:

- Detect possible CKD from user input via an AI model.
- Visualize data and trends for public awareness.
- Share educational content and the latest research.
- Promote kidney health and preventive lifestyles.
- Encourage community contribution through donations.

---

## 📁 Folder & File Structure

An overview of the core project layout:

```
Grad_Project_KDD/
│
├── backend/                      # FastAPI + ML backend
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── model_3.py           # ML model logic (training, loading, predicting)
│   │   ├── ckd_model.pkl        # Trained ML model
│   │   └── resampled_data.csv   # Processed dataset
│   └── data/
│       └── csv_result-chronic_kidney_disease_full.csv  # Original dataset
│
├── frontend/                    # React + Vite frontend
│   ├── public/
│   │   └── assets/images/       # Logos and other static images
│   ├── src/
│   │   ├── components/          # Reusable UI components (Header, Footer, etc.)
│   │   ├── pages/               # Individual pages (Home, FAQ, etc.)
│   │   ├── data/                # Static JS data files (news, tips, etc.)
│   │   ├── api/                 # API interaction (e.g., symptomChecker)
│   │   ├── routes/              # App routing
│   │   ├── theme/               # Theme and context provider
│   │   ├── App.jsx              # App root component
│   │   ├── main.jsx             # ReactDOM entry point
│   │   └── index.css            # Global styles
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🖥️ Running the Project

### ▶️ Backend (FastAPI + ML)

Start the API server from the root directory:

```bash
cd backend/app
uvicorn main:app --reload --port 9000
```

> Access it at `http://localhost:9000`

---

### 💻 Frontend (React + Vite)

Start the frontend in dev mode:

```bash
cd frontend
npm install       # First-time setup
npm run dev
```

> Opens at `http://localhost:5173` by default

---

## 🔄 Git Version Control

### 📌 Initial Setup

```bash
git init
git remote add origin https://github.com/Youssif10/Graduation_Project_KDD/
```

---

### ⬆️ Push Changes

```bash
git add .
git commit -m "Your message"
git push origin main
```

> 🔄 Pull first to avoid conflicts:

```bash
git pull origin main
```

---

### ⬇️ Pull Latest Updates

```bash
git pull origin main
```

---

## 🎉 Contributing

Feel free to open issues or pull requests to contribute to the project. Let's make CKD awareness more accessible!

---

Happy coding! 🚀
