import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import "./Home.css";

// Demo data (replace with real API data when available)
const ageData = [
  { age: "0–18", cases: 12 },
  { age: "19–35", cases: 38 },
  { age: "36–50", cases: 67 },
  { age: "51+", cases: 95 },
];

const genderData = [
  { name: "Male", value: 39 },
  { name: "Female", value: 84 },
];

const GENDER_COLORS = ["#2563eb", "#dc92e2ff"];

export default function Home() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Empowering Early Detection & Awareness of Kidney Disease</h1>
            <p>
              Use our tools to understand symptoms, explore real-time data, and
              support life-saving care.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" to="/symptom-checker">
                Check Symptoms
              </Link>
              <a className="btn btn-outline" href="#dashboard">
                View the Distribution
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="bubble b1" />
            <div className="bubble b2" />
            <div className="bubble b3" />
          </div>
        </div>
      </section>

      {/* DASHBOARD SNAPSHOT */}
      <section id="dashboard" className="dashboard">
        <div className="section-head">
          <h2>CKD Snapshot</h2>
          <p>Track the impact of kidney disease by age and gender.</p>
        </div>

        <div className="charts-grid">
          {/* Age Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Age Distribution</h3>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageData}>
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cases" fill="#89c97fff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Gender Distribution</h3>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                  >
                    {genderData.map((entry, i) => (
                      <Cell key={entry.name} fill={GENDER_COLORS[i % 2]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="section-head">
          <h2>Explore Our Tools</h2>
          <p>Take action with AI insights, prevention guidance, and data.</p>
        </div>

        <div className="cards">
          <Link to="/symptom-checker" className="card">
            <div className="card-icon">🧠</div>
            <h3>AI Symptom Checker</h3>
            <p>Identify early signs before they progress.</p>
            <span className="card-cta">Start Checking →</span>
          </Link>

          <Link to="/lifestyle-tips" className="card">
            <div className="card-icon">🍎</div>
            <h3>Prevention & Diet Tips</h3>
            <p>Simple steps to protect your kidneys every day.</p>
            <span className="card-cta">Learn More →</span>
          </Link>

          <Link to="/Donation" className="card">
            <div className="card-icon">💖</div>
            <h3>Donation & Support</h3>
            <p>Help fund early detection programs and life-saving care.</p>
            <span className="card-cta">Donate Now →</span>
         </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact">
        <div className="contact-inner">
          <h2>Contact Us</h2>
          <p>
            Have a question, want to help, or need guidance? We’re here for you.
          </p>
          <a className="email" href="mailto:support@kidneyhealth.org">
            support@kidneyhealth.org
          </a>
        </div>
      </section>
    </div>
  );
}



// import React from 'react';
// import './Home.css';

// export default function Home() {
//   return (
//     <div className="home-container">
//       <h2>Welcome to CKD Project</h2>
//       <p>This is the home page of your React + Vite app.</p>
//     </div>
//   );
// }
