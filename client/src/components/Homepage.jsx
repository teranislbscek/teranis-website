import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Events from "./Events";
import About from "./About";
import { motion } from "framer-motion";

const Homepage = () => {
  return (
    <div className="homepage text-white">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="hero-section w-full mt-12 min-h-screen flex flex-col justify-center items-center text-white py-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight"
        >
          Welcome to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-extrabold drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Teranis26</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300 mt-6 text-center max-w-3xl leading-relaxed"
        >
          A grand celebration of innovation, technology, and creativity.
          Experience groundbreaking workshops, dynamic talks, and vibrant
          events.
        </motion.p>

        {/* Buttons */}
        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex gap-6 mt-10 flex-wrap justify-center z-50"
        >
          <a
            href="/magazine26"
            className="relative px-8 py-3 font-semibold text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-1"
          >
            MAGAZINE 2026
          </a>
          <a
            href="/brochure.pdf"
            download
            className="relative px-8 py-3 font-semibold text-white rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-1"
          >
            BROCHURE
          </a>
        </motion.div>
      </section>

      {/* Events Section */}
      <Events />
      {/* About Section */}
      <About />
      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-b h-screen from-gray-900 to-black text-white flex items-center justify-center"
      >
        <div className="max-w-6xl w-full px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-wide">
            Get in Touch
          </h2>

          <div className="bg-gray-800 p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto">
            <p className="text-gray-400 text-center mb-10 leading-relaxed text-lg">
              Have questions or inquiries? Feel free to reach out to us
              directly!
            </p>

            <div className="space-y-8 flex flex-col items-center">
              <div className="flex flex-col items-center text-gray-300 text-lg text-center">
                <span className="text-lg font-medium">
                  <strong>Student Coordinator:</strong>
                </span>
                <span className="flex items-center gap-2">
                  Adnan Haaris - 9495282111
                </span>
              </div>

              <div className="flex flex-col items-center text-gray-300 text-lg text-center">
                <span className="text-lg font-medium">
                  <strong>Staff Coordinator:</strong>
                </span>
                <span className="flex items-center gap-2">
                  Prof Nishy Reshmi - +91 95396 12398
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-t from-gray-900 to-gray-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">About Teranis</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Teranis26 is a grand celebration of technology and innovation,
                bringing together brilliant minds from across the region. Join
                us for cutting-edge workshops, dynamic talks, and vibrant
                cultural events.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Quick Links</h3>
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
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Contact Us</h3>
              <p className="text-sm text-gray-400 mb-4">
                <strong>Email:</strong> teranis@lbscek.ac.in
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
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
