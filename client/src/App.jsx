import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import ParticlesComponent from "./components/ParticlesComponent";
import LoadingScreen from "./components/LoadingScreen";
import CertificateVerifier from "./components/CertificateVerifier"; // Import Verifier Component
import Certificates from "./components/Certificates";
import FlipbookEmbed from "./components/FlipbookEmbed";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app-container h-auto flex gap-4 flex-col font-sophia justify-between items-center text-white">
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Navbar />
            <ParticlesComponent />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/verify" element={<CertificateVerifier />} />
              <Route path="/certificates25" element={<Certificates />} />
              <Route path="/magazine25" element={<FlipbookEmbed />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
