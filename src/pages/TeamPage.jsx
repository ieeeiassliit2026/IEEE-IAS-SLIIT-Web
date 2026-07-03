import React from 'react';
import { LinkedinIcon } from '../components/BrandIcons';
import { committeeMembers } from '../data/committee';

export default function TeamPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: 'var(--ias-green)' }}>
          Our Team
        </span>
        <h1 className="font-display text-4xl mt-3">Executive Committee 2026</h1>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {committeeMembers.map((m) => (
          <a
            key={m.full_name}
            href={m.linkedin}
            target="_blank"
            rel="noreferrer"
            className="card-hover group rounded-2xl overflow-hidden border"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={m.photo} alt={m.full_name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 text-[var(--ias-navy)] opacity-0 group-hover:opacity-100 transition-opacity">
                <LinkedinIcon size={14} />
              </div>
            </div>
            <div className="p-4">
              <p className="font-semibold text-sm">{m.full_name}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{m.position}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
