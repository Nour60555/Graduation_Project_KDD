import React from "react";
import "./ResearchDevelopment.css";

export default function ResearchDevelopment() {
  return (
    <div className="research-container">
      <header className="research-header">
        <h1>🧠 Research & Development</h1>
        <p>
          Comprehensive research on <strong>Early Detection of Chronic Kidney Disease</strong> using AI
          and the dietary impact on kidney health.
        </p>
      </header>

      <section className="research-section">
        <h2>1. Introduction</h2>
        <p>
          Artificial intelligence (AI) has emerged as a transformative tool for early detection and prognosis of
          chronic kidney disease (CKD), offering considerable improvements in diagnostic accuracy and patient outcome predictions.
          By integrating vast amounts of patient data—imaging studies, laboratory results, and genetic information—
          AI-driven systems can identify subtle patterns that traditional diagnostic methods might overlook.
        </p>
      </section>

      <section className="research-section">
        <h2>2. Literature Review</h2>
        <p>
          Machine learning (ML) and deep learning (DL) methods have demonstrated high accuracy in CKD detection.
          ML techniques like <strong>support vector machines (SVM)</strong> and <strong>artificial neural networks (ANN)</strong>
          can analyze complex, non-linear data, while convolutional neural networks (CNNs) excel at detecting early damage in renal imaging.
        </p>
        <p>
          Ensemble methods combine multiple AI models to enhance predictive performance, while feature selection techniques
          improve model interpretability and clinical trust.
        </p>
      </section>

      <section className="research-section">
        <h2>3. Methodology</h2>
        <p>
          This research follows a systematic approach using the <strong>PRISMA framework</strong> for structured review and meta-analysis.
          Data sources include Scopus (2021–2026) with 534 relevant documents analyzed. Bibliometric tools like VOSviewer and
          Publish or Perish were used to identify trends, impactful studies, and key authors.
        </p>
      </section>

      <section className="research-section">
        <h2>4. Results</h2>
        <p>
          AI research in CKD detection is led by <strong>India (134 docs)</strong>, <strong>China (105)</strong>,
          and the <strong>United States (105)</strong>, followed by Saudi Arabia, the UK, Taiwan, Japan, South Korea, and Canada.
          These nations demonstrate strong AI integration in healthcare, especially in chronic disease management.
        </p>
      </section>

      <section className="research-section">
        <h2>5. Conclusion</h2>
        <p>
          AI’s integration into CKD detection represents a paradigm shift from reactive to proactive care.
          With advancements in explainable AI, feature selection, and clinical decision support systems, AI is positioned to
          transform CKD management, enhance patient outcomes, and optimize healthcare resources.
        </p>
      </section>
    </div>
  );
}
