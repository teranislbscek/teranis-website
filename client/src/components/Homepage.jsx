import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Events from "./Events";
import About from "./About";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";

/* ── tiny animated counter ── */
const AnimatedCounter = ({ target, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2.5, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [count, rounded, target]);

  return <>{display}{suffix}</>;
};

const Homepage = () => {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  /* track mouse for parallax spotlight */
  useEffect(() => {
    const handler = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  /* stagger children helper */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const childUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  /* stat badges */
  const stats = [
    { value: 25, suffix: "+", label: "Events" },
    { value: 600, suffix: "+", label: "Attendees" },
    { value: 60, suffix: "K+", label: "Cash Prizes" },
  ];

  return (
    <div className="homepage text-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="hero-section relative w-full min-h-screen flex flex-col justify-center items-center text-white overflow-hidden"
      >
        {/* ── Gradient mesh blobs ── */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-all duration-700"
          style={{
            background: `
              radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(6,182,212,0.12) 0%, transparent 60%),
              radial-gradient(500px circle at 80% 20%, rgba(59,130,246,0.10) 0%, transparent 50%),
              radial-gradient(400px circle at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 50%)
            `,
          }}
        />

        {/* ── Orbital rings ── */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          {[280, 360, 440].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: `rgba(6,182,212,${0.12 - i * 0.03})`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 30 + i * 15, repeat: Infinity, ease: "linear" }}
            />
          ))}
          {/* glowing dot on ring */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(6,182,212,0.6)]"
            style={{ top: "calc(50% - 140px)", left: "50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            initial={{ transformOrigin: "0 140px" }}
          />
        </div>

        {/* ── Floating particles (subtle accent dots) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
              style={{
                top: `${15 + Math.random() * 70}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* ── Main content ── */}
        <motion.div
          className="relative z-10 flex flex-col items-center px-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >


          {/* Main heading */}
          <motion.h1
            variants={childUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-center leading-[1.05] tracking-tight"
          >
            <span className="block text-white">Welcome to</span>
            <span className="relative inline-block mt-1">
              <span className="text-cyan-400">Teranis</span>
              <span className="text-cyan-400">26</span>
              {/* underline accent */}
              <motion.span
                className="absolute -bottom-2 left-0 h-[3px] rounded-full bg-cyan-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            variants={childUp}
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-400 font-light text-center max-w-2xl leading-relaxed"
          >
            A grand celebration of innovation, technology, and creativity.
            <br className="hidden sm:block" />
            Experience groundbreaking workshops, dynamic talks & vibrant events.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={childUp}
            className="flex gap-4 mt-10 flex-wrap justify-center z-20"
          >
            <a
              href="/certificates/verify"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-sm tracking-wide text-black rounded-full bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5"
            >
              VERIFY CERTIFICATE
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a
              href="/magazine26"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-sm tracking-wide text-white rounded-full bg-cyan-600 hover:bg-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-800/40 hover:-translate-y-0.5"
            >
              MAGAZINE 2026
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            {/* <a
              href="/brochure.pdf"
              download
              className="relative inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-sm tracking-wide text-white rounded-full bg-white/[0.06] backdrop-blur-lg border border-white/10 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              BROCHURE
              <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" /></svg>
            </a> */}
          </motion.div>

          {/* Stat badges – inline row below buttons */}
          <motion.div
            variants={childUp}
            className="flex gap-6 sm:gap-10 mt-14 flex-wrap justify-center"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-0.5 px-5 py-3 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08]"
              >
                <span className="text-2xl font-bold text-cyan-400">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </span>
                <span className="text-[11px] text-gray-500 font-medium tracking-wider uppercase">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <ScrollLink to="about" smooth duration={800}>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-medium">Scroll</span>
            <motion.div
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5 mx-auto mt-1"
              animate={{}}
            >
              <motion.div
                className="w-1 h-1.5 rounded-full bg-cyan-400"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </ScrollLink>
        </motion.div>

        {/* ── Bottom fade ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[1] pointer-events-none" />
      </section>

      {/* About Section */}
      <About />
      {/* Events Section */}
      <Events />
      {/* Contact Section */}
      <section
        id="contact"
        className="relative min-h-screen py-24 bg-gray-950 text-white flex items-center justify-center overflow-hidden"
      >
        {/* subtle grid pattern bg */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-6xl w-full px-8 text-center flex flex-col items-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-3">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-16 tracking-tight">
            Get in <span className="text-cyan-400">Touch</span>
          </h2>

          <div className="bg-white/[0.03] border border-white/[0.07] backdrop-blur-md p-12 rounded-3xl shadow-2xl max-w-3xl mx-auto relative group">
            <div className="absolute top-0 left-10 right-10 h-px bg-cyan-400/30 group-hover:bg-cyan-400/60 transition-colors duration-300" />
            <p className="text-gray-400 text-center mb-10 leading-relaxed text-lg">
              Have questions or inquiries? Feel free to reach out to us
              directly!
            </p>

            <div className="space-y-8 flex flex-col items-center">
              <div className="flex flex-col items-center text-gray-300 text-lg text-center">
                <span className="text-lg font-medium">
                  <strong>Student Coordinator:</strong>
                </span>
                <span className="flex items-center gap-2 mt-2">
                  Srinivas - <a href="https://wa.me/+919539704565" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">+91 95397 04565</a>
                </span>
              </div>

              {/* <div className="flex flex-col items-center text-gray-300 text-lg text-center">
                <span className="text-lg font-medium">
                  <strong>Staff Coordinator:</strong>
                </span>
                <span className="flex items-center gap-2">
                  Prof Nishy Reshmi - +91 95396 12398
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-950 border-t border-white/[0.05] py-16 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-cyan-400 tracking-wide uppercase">About Teranis</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Teranis26 is a grand celebration of technology and innovation,
                bringing together brilliant minds from across the region. Join
                us for cutting-edge workshops, dynamic talks, and vibrant
                cultural events.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-cyan-400 tracking-wide uppercase">Quick Links</h3>
              <ul className="space-y-2">
                <ul>
                  {["Home", "Events", "About", "Contact"].map((link, index) => (
                    <li key={index}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-cyan-400 tracking-wide uppercase">Contact Us</h3>
              <p className="text-sm text-gray-400 mb-4">
                <strong>Email:</strong> teranis@lbscek.ac.in
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-lg font-semibold text-center md:text-left">
                <p>© 2026 Teranis26. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 justify-center">
                {[
                  {
                    icon: FaInstagram,
                    color: "red-400",
                    link: "https://www.instagram.com/teranis.lbscek/",
                  },
                  {
                    icon: FaLinkedinIn,
                    color: "blue-400",
                    link: "https://www.linkedin.com/company/teranis-2026/about/",
                  },
                ].map((social, index) => (
                  <a key={index} href={social.link}>
                    <social.icon className="text-2xl cursor-pointer hover:text-cyan-400 hover:scale-110 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
