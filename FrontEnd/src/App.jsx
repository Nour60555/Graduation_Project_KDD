import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;




// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import Header from './components/Header/Header.jsx';
// import Footer from './components/Footer/Footer.jsx';
// import AppRoutes from "./routes/AppRoutes.jsx";
// import './App.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="app-container">
//         <Header />
//         <main className="main-content">
//           <AppRoutes />
//         </main>
//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
