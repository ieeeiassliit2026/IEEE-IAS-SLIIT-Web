import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import IASLogo from '../assets/IAS.png';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/magazine', label: 'Magazine' },
  { to: '/newsletter', label: 'Newsletter' },
  { to: '/members', label: 'Member Wall' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('ias-theme') === 'dark');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('ias-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ background: 'color-mix(in srgb, var(--bg-elevated) 85%, transparent)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={IASLogo} alt="IEEE IAS SLIIT" className="h-9 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="link-underline" style={{ color: 'var(--text-muted)' }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden flex flex-col px-6 pb-4 gap-3 fade-in-snap">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium py-1" style={{ color: 'var(--text-muted)' }}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
