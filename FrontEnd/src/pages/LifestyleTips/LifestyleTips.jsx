import React from "react";
import "./LifestyleTips.css";

export default function LifestyleTips() {
  const tips = [
    {
      emoji: "💧",
      title: "Stay Hydrated",
      desc: "Drink plenty of water unless advised otherwise by your doctor."
    },
    {
      emoji: "🧂",
      title: "Reduce Salt Intake",
      desc: "Too much salt increases blood pressure and damages kidneys."
    },
    {
      emoji: "🏃",
      title: "Exercise Regularly",
      desc: "Walking, swimming, or yoga helps manage weight and blood pressure."
    },
    {
      emoji: "🥗",
      title: "Eat a Kidney-Friendly Diet",
      desc: "Include fresh fruits, vegetables, and lean proteins."
    },
    {
      emoji: "🚭",
      title: "Avoid Smoking & Alcohol",
      desc: "These can worsen kidney damage and cause other issues."
    },
    {
      emoji: "🍔",
      title: "Limit Processed Foods",
      desc: "Packaged foods often contain high sodium and phosphorus."
    },
    {
      emoji: "💉",
      title: "Manage Diabetes & Hypertension",
      desc: "These are the leading causes of kidney disease."
    },
    {
      emoji: "🩺",
      title: "Regular Checkups",
      desc: "Get your blood pressure and kidney function tested regularly."
    },
    {
      emoji: "😴",
      title: "Get Enough Sleep",
      desc: "Aim for 7–8 hours each night to support overall health."
    }
  ];

  return (
    <div className="lifestyle-container">
      <h2>🌿 Lifestyle Tips</h2>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <span className="tip-emoji">{tip.emoji}</span>
            <h3>{tip.title}</h3>
            <p>{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
