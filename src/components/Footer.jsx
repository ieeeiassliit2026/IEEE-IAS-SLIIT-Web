import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, FacebookIcon } from './BrandIcons';
import IASLogo from '../assets/IAS.png';
import NewsletterBox from './NewsletterBox';

export default function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <NewsletterBox />

        <div className="grid sm:grid-cols-3 gap-10 mt-16 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
          <div>
            <img src={IASLogo} alt="IEEE IAS SLIIT" className="h-9 w-auto object-contain mb-3" />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              IEEE Industry Applications Society — Student Chapter, SLIIT.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li><Link to="/about" className="link-underline">About Us</Link></li>
              <li><Link to="/events" className="link-underline">Events</Link></li>
              <li><Link to="/magazine" className="link-underline">Magazine</Link></li>
              <li><Link to="/contact" className="link-underline">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Connect</h4>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/ieee-industry-applications-society-of-sliit/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[var(--ias-green)] transition-colors">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://www.instagram.com/ias_sliit/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[var(--ias-green)] transition-colors">
                <InstagramIcon size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-[var(--ias-green)] transition-colors">
                <FacebookIcon size={18} />
              </a>
              <a href="mailto:ias@ieeesliit.com" aria-label="Email" className="hover:text-[var(--ias-green)] transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <p className="text-xs text-center mt-12" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} IEEE Industry Applications Society, SLIIT Student Chapter.
        </p>
      </div>
    </footer>
  );
}
