// components/Navbar.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi'; // Hamburguesa y cerrar

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-white text-black px-2 py-1 font-bold rounded text-xs sm:text-sm md:text-base">
            RM
          </div>
          <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl whitespace-nowrap">
            ROYER MERCHAN <span className="text-xs sm:text-sm"></span>
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden sm:flex gap-4 md:gap-6 text-xs sm:text-sm md:text-base">
          <NavLink to="/" className="hover:text-gray-400">About me</NavLink>
          <NavLink to="/proyects" className="hover:text-gray-400">Proyects</NavLink>
          <NavLink to="/skill" className="hover:text-gray-400">Skills</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-black px-4 pb-4 flex flex-col gap-2 text-sm">
          <NavLink to="/" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>About me</NavLink>
          <NavLink to="/proyects" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Proyects</NavLink>
          <NavLink to="/skill" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Skills</NavLink>
        </div>
      )}
    </header>
  );
}