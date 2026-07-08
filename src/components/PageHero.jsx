import React from 'react';

export default function PageHero({ title, accent, subtitle }) {
  return (
    <section className="py-16 sm:py-20 px-6 text-center" style={{ background: 'var(--ias-navy)', color: '#fff' }}>
      <h1 className="font-display text-5xl sm:text-6xl leading-none mb-4">
        {title} {accent && <span style={{ color: 'var(--ias-gold)' }}>{accent}</span>}
      </h1>
      {subtitle && <p className="text-sm text-white/60 max-w-lg mx-auto">{subtitle}</p>}
    </section>
  );
}
