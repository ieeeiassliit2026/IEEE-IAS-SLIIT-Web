import React from 'react';
import { Target, Eye, Award } from 'lucide-react';
import BgImg from '../assets/bg2.jpg';
import StatsGrid from '../components/StatsGrid';

export default function AboutPage() {
  return (
    <>
      <section className="relative py-24 text-center overflow-hidden">
        <img src={BgImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 fade-in-snap">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: 'var(--ias-green)' }}>
            About Us
          </span>
          <h1 className="font-display text-4xl sm:text-5xl mt-3 mb-5">Who We Are</h1>
          <p className="text-base" style={{ color: 'var(--text-muted)' }}>
            IEEE Industry Applications Society (IAS) SLIIT Student Chapter connects students to the industrial and
            electrical engineering community, providing hands-on exposure to power systems, automation, and
            professional practice through workshops, industrial visits, and technical publications.
          </p>
        </div>
      </section>

      <StatsGrid />

      <section className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-6">
        {[
          { icon: Target, title: 'Our Mission', text: 'To bridge the gap between academic learning and industrial application by empowering students with practical exposure to electrical and industrial engineering systems.' },
          { icon: Eye, title: 'Our Vision', text: 'To be the leading student community in Sri Lanka connecting undergraduates with real industry practice in automation, robotics, and power systems.' },
          { icon: Award, title: 'Our Achievements', text: 'Multiple industrial visits, technical workshops, and a growing member base actively engaged across SLIIT and partner institutions.' },
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
