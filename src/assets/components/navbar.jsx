
// components/Navbar.jsx
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-black text-white fixed top-0 left 0 w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-white text-black px-2 py-1 font-bold rounded">RM</div>
          <span className="font-bold text-lg">ROYER MERCHAN  </span>
        </div>
        {/* Links */}
        <nav className="flex gap-6">
          <NavLink to="/" className="hover:text-gray-400">About me</NavLink>
          <NavLink to="/proyects" className="hover:text-gray-400">Proyects</NavLink>
          <NavLink to="/skill" className="hover:text-gray-400">Skills</NavLink>
        
          
        </nav>
      </div>
    </header>
  );
}
