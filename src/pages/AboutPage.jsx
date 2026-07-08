import React from 'react';
import { Target, Eye, Zap } from 'lucide-react';
import StatsGrid from '../components/StatsGrid';
import PageHero from '../components/PageHero';

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About"
        accent="Us"
        subtitle="IEEE Industry Applications Society (IAS) SLIIT Student Chapter connects students to the industrial and electrical engineering community, providing hands-on exposure to power systems, automation, and professional practice."
      />

      <StatsGrid />

      <section className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-6">
        {[
          { icon: Target, title: 'Our Mission', text: 'To bridge the gap between academic learning and industrial application by empowering students with practical exposure to electrical and industrial engineering systems.' },
          { icon: Eye, title: 'Our Vision', text: 'To be the leading student community in Sri Lanka connecting undergraduates with real industry practice in automation, robotics, and power systems.' },
          { icon: Zap, title: 'Our Strategy', text: 'Empower SLIIT undergraduates through technical education, workshops, and competitions — fostering collaboration, mentorship, and personalized services that build global partnerships and leadership.' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="card-hover rounded-2xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
            <Icon size={22} style={{ color: 'var(--ias-green)' }} />
            <h3 className="font-semibold mt-4 mb-2">{title}</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{text}</p>
          </div>
        ))}
      </section>
    </>
  );
}
