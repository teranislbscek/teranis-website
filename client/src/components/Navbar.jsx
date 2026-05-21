import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import myIcon from "./icon.png";

const NavItem = ({ to, label, onClick }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (to.startsWith('/')) {
    return (
      <li className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
        <RouterLink to={to} onClick={onClick}>{label}</RouterLink>
      </li>
    );
  }

  return (
    <li className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
      {isHome ? (
        <ScrollLink to={to} smooth={true} duration={500} onClick={onClick}>
          {label}
        </ScrollLink>
      ) : (
        <a href={`/#${to}`} onClick={onClick}>{label}</a>
      )}
    </li>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-950/80 backdrop-blur-md border-b border-white/5 py-4 md:px-6 fixed w-full z-50 shadow-lg">
      <div className="flex px-6 justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img
              className="md:w-14 md:h-14 w-12 h-12"
              src={myIcon}
              alt="Icon"
            />
            <span className="md:text-4xl ml-2 text-cyan-400 font-bold drop-shadow-sm hover:scale-105 transition-transform duration-300">Teranis</span>
          </a>
        </div>

        {/* Hamburger Icon */}
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={toggleMenu}
        >
          <Menu size={28} />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white text-lg font-medium">
          <NavItem to="about" label="ABOUT" />
          <NavItem to="events" label="EVENTS" />
          <NavItem to="contact" label="CONTACT US" />
          <NavItem to="/certificates/verify" label="VERIFY CERTIFICATE" />
          <NavItem to="/certificates" label="CERTIFICATES" />
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="bg-gray-950/95 backdrop-blur-lg w-full flex flex-col space-y-10 text-white py-4 text-xl items-center font-medium md:hidden shadow-[0px_10px_15px_rgba(255,255,255,0.01)] border-b border-white/5">
          <NavItem to="about" label="ABOUT" onClick={toggleMenu} />
          <NavItem to="events" label="EVENTS" onClick={toggleMenu} />
          <NavItem to="contact" label="CONTACT US" onClick={toggleMenu} />
          <NavItem to="/certificates/verify" label="VERIFY CERTIFICATE" onClick={toggleMenu} />
          <NavItem to="/certificates" label="CERTIFICATES" onClick={toggleMenu} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
