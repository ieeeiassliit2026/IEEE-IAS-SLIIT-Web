import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import HeroImg from '../assets/HeroOC.jpg';

export default function HeroBanner({ eyebrow, title, subtitle, children }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden lg:-mt-[68px]">
      <img
        src={HeroImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.03)', transition: 'transform 8s ease' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1210] via-[#0a1210]/70 to-[#0a1210]/40" />

      <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center text-white transition-all duration-1000 ease-out ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {eyebrow && (
          <span
            className="inline-block font-mono text-[11px] tracking-[0.3em] uppercase mb-4 transition-all duration-700 delay-200"
            style={{ color: 'var(--ias-green)', opacity: entered ? 1 : 0, transform: entered ? 'translateY(0)' : 'translateY(12px)' }}
          >
            {eyebrow}
          </span>
        )}
        <h1
          className="font-display text-4xl sm:text-6xl font-medium leading-tight mb-5 transition-all duration-700 delay-300"
          style={{ opacity: entered ? 1 : 0, transform: entered ? 'translateY(0)' : 'translateY(16px)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 transition-all duration-700 delay-500"
            style={{ opacity: entered ? 1 : 0, transform: entered ? 'translateY(0)' : 'translateY(12px)' }}
          >
            {subtitle}
          </p>
        )}
        <div
          className="transition-all duration-700 delay-700"
          style={{ opacity: entered ? 1 : 0, transform: entered ? 'translateY(0)' : 'translateY(12px)' }}
        >
          {children}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <ChevronDown size={18} className="text-white/40 animate-bounce" />
      </div>
    </section>
  );
}
