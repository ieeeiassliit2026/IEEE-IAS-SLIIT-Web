import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import StatsGrid from '../components/StatsGrid';
import CommitteeSlider from '../components/CommitteeSlider';
import EventTimeline from '../components/EventTimeline';
import FAQAccordion from '../components/FAQAccordion';

export default function HomePage() {
  return (
    <>
      <HeroBanner
        eyebrow="IEEE Industry Applications Society — SLIIT"
        title="Powering Industry Through Innovation"
        subtitle="Bridging students with real-world electrical, electronic, and industrial engineering practice — through workshops, industrial visits, and hands-on projects."
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/about" className="btn-shimmer px-6 py-3 rounded-full bg-emerald-500 text-white text-sm font-semibold">
            About Us
          </Link>
          <Link to="/events" className="px-6 py-3 rounded-full border border-white/30 text-white text-sm font-semibold link-underline">
            Explore Events <ArrowRight size={14} className="inline ml-1" />
          </Link>
        </div>
      </HeroBanner>

      <StatsGrid />
      <CommitteeSlider />
      <EventTimeline limit={5} />
      <FAQAccordion />
    </>
  );
}
