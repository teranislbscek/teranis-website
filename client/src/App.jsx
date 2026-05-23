import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import ParticlesComponent from "./components/ParticlesComponent";
import LoadingScreen from "./components/LoadingScreen";
import CertificateVerifier from "./components/CertificateVerifier"; // Import Verifier Component
import Certificates from "./components/Certificates";
import FlipbookEmbed from "./components/FlipbookEmbed";
import VerifyRedirect from "./components/VerifyRedirect";

const LOADING_SCREEN_COOLDOWN_MS = 24 * 60 * 60 * 1000;

const NotFound = () => (
  <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4 pt-32 pb-10 text-white">
    <div className="mx-auto flex w-full max-w-3xl items-center justify-center">
      <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-300">
          The page you tried to visit cannot be found. Use the button below to
          return to the home page.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500"
        >
          Go to Home
        </a>
      </div>
    </div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(() => {
    try {
      const lastSeenLoading = Number(
        window.localStorage.getItem("teranis:lastLoadingScreenAt") || 0
      );

      return (
        !lastSeenLoading ||
        Date.now() - lastSeenLoading > LOADING_SCREEN_COOLDOWN_MS
      );
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "teranis:lastLoadingScreenAt",
        String(Date.now())
      );
    } catch {
      // Ignore storage failures and fall back to the loading state only.
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]);

  function AppContent() {
    const location = useLocation();
    const isVerifyRoute = location.pathname.startsWith("/verify");

    if (isVerifyRoute) {
      return <VerifyRedirect />;
    }

    return (
      <div className="app-container h-auto flex gap-4 flex-col font-sophia justify-between items-center text-white">
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Navbar />
            <ParticlesComponent />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/certificates/verify" element={<CertificateVerifier />} />
              <Route path="/magazine" element={<FlipbookEmbed />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        )}
      </div>
    );
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
