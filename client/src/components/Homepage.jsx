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
          Welcome to <span className="text-indigo-400">Teranis25</span>
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
            href="/magazine25"
            className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
          >
            MAGAZINE 2025
          </a>
          <a
            href="/brochure.pdf"
            download
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
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
              <h3 className="text-2xl font-bold mb-4">About Teranis</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Teranis25 is a grand celebration of technology and innovation,
                bringing together brilliant minds from across the region. Join
                us for cutting-edge workshops, dynamic talks, and vibrant
                cultural events.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <ul>
                  {["Home", "Events", "About", "Contact"].map((link, index) => (
                    <li key={index}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
              <p className="text-sm text-gray-400 mb-4">
                <strong>Email:</strong> teranis@lbscek.ac.in
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-lg font-semibold text-center md:text-left">
                <p>© 2025 Teranis25. All rights reserved.</p>
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
                    link: "https://www.linkedin.com/company/teranis-2025/about/",
                  },
                ].map((social, index) => (
                  <a key={index} href={social.link}>
                    <social.icon className="text-2xl cursor-pointer hover:text-indigo-400 transition-colors" />
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
