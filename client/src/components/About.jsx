import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = useMemo(
    () => [
      { value: "25+", label: "Exciting Events" },
      { value: "600+", label: "Attendees" },
      { value: "₹60K+", label: "In Cash Prizes" },
    ],
    []
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center py-20 md:py-28 bg-gray-950 text-white overflow-hidden"
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full">
        {/* ── Top: heading + description in a two-col layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-16 md:mb-20">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-3">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              About{" "}
              <span className="text-cyan-400">Teranis26</span>
            </h2>
          </motion.div>

          {/* Right — description */}
          <motion.div
            className="flex"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            {/* accent bar */}
            <div className="hidden md:block w-px bg-white/10 mr-8 mt-2 flex-shrink-0 self-stretch" />
            <p className="text-base md:text-lg text-gray-400 leading-relaxed md:pt-2">
              Teranis26 is a grand celebration of technology and innovation,
              bringing together brilliant minds from across the region.
              Join us for cutting-edge workshops, dynamic talks, and vibrant
              cultural events that push the boundaries of what&apos;s possible.
            </p>
          </motion.div>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 md:p-10 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={
                inView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.15,
                ease: "easeOut",
              }}
            >
              {/* top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-cyan-400/30 group-hover:bg-cyan-400/60 transition-colors duration-300" />

              <h3 className="text-5xl md:text-6xl font-extrabold text-cyan-400">
                {stat.value}
              </h3>
              <p className="text-sm md:text-base text-gray-400 mt-3 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
