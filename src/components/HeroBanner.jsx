import React, { useState, useEffect } from 'react';
import HeroImg from '../assets/hero.jpg';
import BgImg from '../assets/bg.jpg';
import Bg2Img from '../assets/bg2.jpg';

const SLIDES = [HeroImg, BgImg, Bg2Img];

export default function HeroBanner({ eyebrow, title, subtitle, children }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms]"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1210] via-[#0a1210]/70 to-[#0a1210]/40" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white fade-in-snap">
        {eyebrow && (
          <span className="inline-block font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--ias-gold)] mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-4xl sm:text-6xl font-medium leading-tight mb-5">{title}</h1>
        {subtitle && <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8">{subtitle}</p>}
        {children}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className="w-6 h-1 rounded-full transition-all cursor-pointer"
            style={{ background: i === index ? '#fff' : 'rgba(255,255,255,0.35)' }}
          />
        ))}
      </div>
    </section>
  );
}
