import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/donation">Donation</Link>
        <Link to="/lifestyle-tips">Lifestyle Tips</Link>
      </div>
      <p>Email us at: <a href="mailto:support@kidneyhealth.org">support@kidneyhealth.org</a></p>
      <p>© {new Date().getFullYear()} Kidney Health Project. All rights reserved.</p>
    </footer>
  );
}




// import React from 'react';
// import './Footer.css';

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <p>© {new Date().getFullYear()} CKD Project. All rights reserved.</p>
//     </footer>
//   );
// }
