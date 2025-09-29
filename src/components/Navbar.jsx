import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/eventplus.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItemClasses = (isActive) =>
    `no-underline font-bold px-6 py-2.5 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/50 w-full text-center ${ // Added w-full and text-center for mobile layout
      isActive
        ? 'text-white bg-gradient-to-r from-pink-600 to-rose-600 shadow-[0_8px_24px_rgba(199,78,111,0.4)] scale-100 sm:scale-105'
        : 'text-slate-700 hover:text-pink-600 hover:bg-pink-50 hover:shadow-[0_4px_16px_rgba(199,78,111,0.15)] hover:scale-100 sm:hover:scale-105'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-pink-200/50 shadow-[0_8px_32px_rgba(199,78,111,0.08)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        
        {/* Top Bar: Logo and Menu Button */}
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <img 
                src={logo} 
                alt="EVENT+" 
                className="relative h-8 sm:h-10 w-auto block drop-shadow-[0_4px_12px_rgba(199,78,111,0.3)]" 
              />
            </div>
            <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 bg-clip-text text-transparent">
              {/* If you want to add text next to logo, add it here */}
            </span>
          </Link>

          {/* Hamburger Button (Visible on Small Screens) */}
          <button
            className="sm:hidden p-2 rounded-lg text-pink-600 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                // Close Icon (X)
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                // Menu Icon (Hamburger)
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation Links (Visible on SM screens and up) */}
          <div className="hidden sm:flex gap-2">
            <NavLink to="/" end className={({ isActive }) => navItemClasses(isActive)}>Home</NavLink>
            <NavLink to="/event" className={({ isActive }) => navItemClasses(isActive)}>Events</NavLink>
            <NavLink to="/contact" className={({ isActive }) => navItemClasses(isActive)}>Contact</NavLink>
          </div>
        </div>

        {/* Mobile Menu (Conditionally Rendered) */}
        {isMenuOpen && (
          <div 
            id="mobile-menu" 
            className="flex flex-col gap-3 mt-4 sm:hidden pb-2"
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            <NavLink to="/" end className={({ isActive }) => navItemClasses(isActive)}>Home</NavLink>
            <NavLink to="/event" className={({ isActive }) => navItemClasses(isActive)}>Events</NavLink>
            <NavLink to="/contact" className={({ isActive }) => navItemClasses(isActive)}>Contact</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;