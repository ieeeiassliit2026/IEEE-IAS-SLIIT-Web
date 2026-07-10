import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import IASLogo from '../assets/IAS.png';
import { useAuth } from '../lib/AuthContext';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/community', label: 'Community' },
  { to: '/events', label: 'Events' },
  { to: '/news', label: 'News' },
  { to: '/magazine', label: 'Magazine' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dark, setDark] = useState(() => localStorage.getItem('ias-theme') === 'dark');
  const location = useLocation();
  const { session } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('ias-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => setIsOpen(false), [location]);

  // Hide the bar while scrolling down, reveal it again on the way back up.
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowNavbar(!(y > lastScrollY && y > 100));
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('nav')) setIsOpen(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const linkClass = ({ isActive }) =>
    `font-semibold text-sm whitespace-nowrap transition-colors ${isActive ? 'text-[var(--ias-green)]' : 'hover:text-[var(--ias-green)]'}`;

  return (
    <div className="mx-auto lg:w-2/3">
      <nav
        className={`relative lg:fixed top-0 left-1/2 -translate-x-1/2 w-full lg:w-[1040px] z-50 shadow-2xl px-5 py-3 lg:rounded-b-3xl transition-transform duration-500 ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ background: 'var(--bg-elevated)', color: 'var(--text)' }}
      >
        <div className="flex justify-between items-center lg:justify-center gap-4 mx-auto">
          <Link to="/">
            <img src={IASLogo} alt="IEEE IAS SLIIT" className="h-10 w-auto object-contain lg:mr-8" />
          </Link>

          <div className="hidden lg:flex gap-6 items-center">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <Link
              to={session ? '/profile' : '/login'}
              className="font-semibold text-sm px-4 py-1.5 rounded-full text-white whitespace-nowrap"
              style={{ background: 'var(--ias-green)' }}
            >
              {session ? 'Profile' : 'Login'}
            </Link>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {/* Burger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div
              className="cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setIsOpen((o) => !o); }}
              role="button"
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-1 rounded mb-1 transition-transform ${isOpen ? 'translate-y-2 rotate-45' : ''}`} style={{ background: 'var(--text)' }} />
              <div className={`w-6 h-1 rounded mb-1 transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`} style={{ background: 'var(--text)' }} />
              <div className={`w-6 h-1 rounded transition-transform ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} style={{ background: 'var(--text)' }} />
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`absolute top-full left-0 w-full font-semibold shadow-md p-4 text-center transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          style={{ background: 'var(--bg-elevated)' }}
        >
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="block py-2 text-sm">
              {l.label}
            </NavLink>
          ))}
          <NavLink to={session ? '/profile' : '/login'} className="block py-2 text-sm" style={{ color: 'var(--ias-green)' }}>
            {session ? 'Profile' : 'Login / Register'}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
