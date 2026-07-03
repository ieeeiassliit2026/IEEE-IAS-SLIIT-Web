import React from 'react';

const STATS = [
  { value: '500+', label: 'Members Reached' },
  { value: '30+', label: 'Events Hosted' },
  { value: '15+', label: 'Industry Partners' },
  { value: '4', label: 'Years Active' },
];

export default function StatsGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="card-hover text-center py-8 px-4 rounded-2xl border"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
          >
            <p className="font-display text-3xl sm:text-4xl" style={{ color: 'var(--ias-green)' }}>{s.value}</p>
            <p className="text-xs mt-2 tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
