import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    category: "Kidney Health",
    questions: [
      { q: "What are the early signs of kidney disease?", a: "Early signs may include fatigue, swelling in the ankles or feet, changes in urination, and unexplained nausea. It's important to consult a doctor if you notice these symptoms." },
      { q: "How can I keep my kidneys healthy?", a: "Maintain a balanced diet, stay hydrated, manage blood pressure, avoid excessive salt, and exercise regularly." },
      { q: "How much water should I drink daily for kidney health?", a: "Generally, 2–3 liters per day is recommended, but needs vary depending on activity, climate, and medical conditions." },
      { q: "Does high blood pressure affect kidneys?", a: "Yes. High blood pressure is one of the leading causes of kidney damage over time." },
      { q: "Can kidney damage be reversed?", a: "Some acute kidney injuries can be reversed if treated early, but chronic kidney disease is usually irreversible." },
      { q: "Are herbal supplements safe for kidneys?", a: "Not always. Some herbs can harm kidneys. Always consult your doctor before using them." },
      { q: "Does protein intake affect kidneys?", a: "Excessive protein intake can strain the kidneys, especially if you already have kidney issues." },
      { q: "Is dark-colored urine always a sign of kidney problems?", a: "Not necessarily. It could be dehydration, but persistent changes should be checked by a doctor." }
    ]
  },
  {
    category: "AI Feature",
    questions: [
      { q: "How does the AI detect kidney disease?", a: "Our AI analyzes symptoms and risk factors, comparing them with medical datasets to provide an initial risk assessment. It does not replace professional medical advice." },
      { q: "Is my personal data safe?", a: "Yes. We use strict privacy protocols and do not store personal health data without your consent." },
      { q: "Does the AI work offline?", a: "No, it requires an internet connection to process and compare your data with medical datasets." },
      { q: "Can the AI diagnose other diseases?", a: "Currently, it is specialized for kidney disease risk assessment." },
      { q: "How accurate is the AI's prediction?", a: "It is highly accurate in detecting risk patterns but is not a substitute for medical diagnosis." },
      { q: "Can I share my AI results with my doctor?", a: "Yes, and it is recommended for further medical advice." },
      { q: "Is the AI free to use?", a: "Yes, our AI tool is free for public use as part of our awareness initiative." }
    ]
  },
  {
    category: "About the Project",
    questions: [
      { q: "Who developed this project?", a: "This project was developed as part of a graduation project by a dedicated team passionate about kidney health awareness." },
      { q: "Can I contribute or donate?", a: "Yes! You can visit our Donate page to support awareness programs, research, and patient assistance." },
      { q: "Is this project open-source?", a: "Currently, the core AI code is private, but parts of the website will be open-sourced." },
      { q: "Where can I learn more about kidney health?", a: "We provide educational resources and links to reputable health organizations on our Lifestyle Tips page." },
      { q: "How often is the site updated?", a: "We regularly update with new FAQs, tips, and AI improvements." },
      { q: "Is the information medically verified?", a: "Yes, our content is reviewed with guidance from healthcare professionals." }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionCount = 0;

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      {faqData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="faq-section">
          <h2>{section.category}</h2>
          {section.questions.map((item, qIndex) => {
            questionCount++;
            const index = questionCount;
            return (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? "open" : ""}`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleQuestion(index)}
                >
                  <span>{item.q}</span>
                  <span className="faq-toggle">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="faq-answer">{item.a}</div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
