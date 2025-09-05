import React, { useState, useEffect } from "react";
import "./Donation.css";

export default function Donation() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    cardNumber: "",
    amount: "10",
    customAmount: "",
  });

  const [showOTP, setShowOTP] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      const numericValue = value.replace(/\D/g, "").slice(0, 14);
      setFormData((prev) => ({ ...prev, cardNumber: numericValue }));
    } else if (name === "customAmount") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, customAmount: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      formData.cardNumber.length !== 14 ||
      (formData.amount === "Custom" && !formData.customAmount.trim())
    ) {
      alert("Please fill all required fields correctly.");
      return;
    }
    setShowOTP(true);
  };

  const handleVerifyOTP = () => {
    if (otpInput === "123456") {
      setShowOTP(false);
      setShowThankYou(true);
      setFormData({
        name: "",
        email: "",
        cardNumber: "",
        amount: "10",
        customAmount: "",
      });
      setOtpInput("");
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => setShowThankYou(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showThankYou]);

  return (
    <>
      <div className="donation-container">
        <h2>❤️ Support Kidney Health</h2>
        <p className="donation-desc">
          Your donation helps raise awareness and support kidney disease research, education, and treatment.
        </p>

        <form onSubmit={handleSubmit} className="donation-form" noValidate>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="cardNumber">Visa Card Number (14 digits)</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="12345678901234"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength={14}
            inputMode="numeric"
            pattern="\d{14}"
            required
          />

          <label htmlFor="amount">Choose Donation Amount</label>
          <select
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          >
            <option value="10">$10</option>
            <option value="25">$25</option>
            <option value="50">$50</option>
            <option value="Custom">Custom</option>
          </select>

          {formData.amount === "Custom" && (
            <>
              <label htmlFor="customAmount">Enter Custom Amount</label>
              <input
                type="text"
                id="customAmount"
                name="customAmount"
                placeholder="Enter amount"
                value={formData.customAmount}
                onChange={handleChange}
                inputMode="numeric"
                required
              />
            </>
          )}

          <button type="submit" className="donate-button">
            Donate Now
          </button>
        </form>
      </div>

      {/* OTP Modal */}
      {showOTP && (
        <div className="otp-overlay">
          <div className="otp-modal">
            <h3>Enter OTP</h3>
            <p>Please enter the 6-digit OTP sent to your email or phone.</p>
            <input
              type="text"
              maxLength={6}
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              autoFocus
              placeholder="123456"
            />
            <div className="otp-buttons">
              <button onClick={handleVerifyOTP}>Verify</button>
              <button onClick={() => setShowOTP(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Popup */}
      {showThankYou && (
        <div className="thank-you-popup">
          <p>Thank you for your donation! ❤️</p>
        </div>
      )}
    </>
  );
}
