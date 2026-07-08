import React from 'react';

// Placeholder follower counts — replace with real figures from each platform
// before launch. Structure/labels match the cs.ieeesliit.com reference.
const STATS = [
  { value: '200+', label: 'YouTube Subscribers' },
  { value: '350+', label: 'Instagram Followers' },
  { value: '1200+', label: 'Facebook Followers' },
  { value: '480+', label: 'LinkedIn Followers' },
  { value: '15+', label: 'X Followers' },
  { value: '40+', label: 'Threads Followers' },
  { value: '90+', label: 'Telegram Followers' },
  { value: '260+', label: 'WhatsApp Followers' },
];

export default function StatsGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="card-hover text-center py-6 px-3 rounded-2xl border"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
          >
            <p className="text-xs font-semibold" style={{ color: 'var(--ias-navy)' }}>{s.label}</p>
            <p className="font-display text-2xl sm:text-3xl mt-2" style={{ color: 'var(--ias-gold)' }}>{s.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
