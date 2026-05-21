import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SCRIPT_BASE_URL =
  "https://script.google.com/macros/s/AKfycbyGCdU9D2b8oILQ4Kc5tDFBqVddodzDROR2PW6D0NnwBEIT2kynM8rBus7qNiX7j9Q/exec";

const CertificateSkeletonCard = () => (
  <div className="group relative block p-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl shadow-xl">
    <div className="absolute top-0 left-6 right-6 h-px bg-cyan-400/30" />

    <div className="flex flex-col h-full justify-center gap-4 min-h-[7.5rem]">
      <div className="h-6 w-5/6 rounded-full bg-white/10 animate-pulse" />
      <div className="h-4 w-3/5 rounded-full bg-white/5 animate-pulse" />
    </div>
  </div>
);

const Certificates = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(`${SCRIPT_BASE_URL}?type=certificates`);
        const json = await response.json();

        if (json.status === "success" && Array.isArray(json.data)) {
          setLinks(json.data);
        } else {
          setError(json.message || "Unable to load certificates.");
        }
      } catch (fetchError) {
        console.error("Error fetching certificates:", fetchError);
        setError("Unable to load certificates.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gray-950 pt-32 pb-20 px-6 sm:px-8 overflow-hidden text-white">
      {/* subtle grid pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-3">
            Achievements
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            <span className="text-cyan-400">Teranis26</span> Certificates
          </h1>
          <p className="text-gray-400 text-lg">
            Explore and download your certificates
          </p>
        </motion.div>

        {loading ? (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            <CertificateSkeletonCard />
            <CertificateSkeletonCard />
            <CertificateSkeletonCard />
            <CertificateSkeletonCard />
            <CertificateSkeletonCard />
            <CertificateSkeletonCard />
          </div>
        ) : error ? (
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center text-gray-300">
            {error}
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {links.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative block p-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              {/* top accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-cyan-400/30 group-hover:bg-cyan-400/80 transition-colors duration-300" />
              
              <div className="flex flex-col h-full justify-center">
                <span className="font-semibold text-gray-200 text-lg leading-snug group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>
                
                <span className="mt-4 text-cyan-400 text-sm font-medium flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  View Drive
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
