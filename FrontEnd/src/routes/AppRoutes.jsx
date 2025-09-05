import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
// import Donation from "../pages/Donation/Donation.jsx";
 import AiFeature from "../pages/SymptomChecker/SymptomChecker.jsx"; 
 import LifestyleTips from "../pages/LifestyleTips/LifestyleTips.jsx";
 import FAQ from "../pages/FAQ/FAQ.jsx";
 import NewsEvents from "../pages/NewsEvents/NewsEvents.jsx";
 import ResearchDevelopment from "../pages/ResearchDevelopment/ResearchDevelopment.jsx";
 import Donation from "../pages/Donation/Donation.jsx";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news-events" element={<NewsEvents />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/lifestyle-tips" element={<LifestyleTips />} />
      <Route path="/research-development" element={<ResearchDevelopment />} />
      <Route path="/Donation" element={<Donation />} />
      <Route path="/symptom-checker" element={<AiFeature />} />
      {/* <Route path="/donation" element={<Donation />} />
      <Route path="/lifestyle-tips" element={<LifestyleTips />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/news-events" element={<NewsEvents />} />
      <Route path="/research-development" element={<ResearchDevelopment />} /> */}
    </Routes>
  );
}






// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from "../pages/Home/Home.jsx";


// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       {/* Add more routes here */}
//     </Routes>
//   );
// }