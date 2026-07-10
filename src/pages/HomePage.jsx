import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ImageHero from '../components/ImageHero';
import CommitteeSlider from '../components/CommitteeSlider';
import EventTimeline from '../components/EventTimeline';
import FAQAccordion from '../components/FAQAccordion';
import HeroImg from '../assets/hero.jpg';
import AboutImg from '../assets/bg.jpg';

function FeedbackBand() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      message: form.message,
    });
    if (error) {
      setStatus('error');
      return;
    }
    setForm({ name: '', email: '', message: '' });
    setStatus('sent');
  };

  return (
    <div style={{ background: 'var(--ias-navy)' }}>
      <div className="grid max-w-screen-xl lg:grid-cols-2 items-center gap-10 sm:p-12 p-8 mx-auto max-sm:p-4">
        <div className="max-w-lg max-lg:mx-auto max-lg:text-center max-lg:mb-6">
          <h2 className="font-display text-4xl md:text-6xl font-extrabold" style={{ color: 'var(--ias-gold)' }}>
            Feedback Time!
          </h2>
          <p className="text-sm text-white/70 mt-4 leading-relaxed">
            No backstage pass needed here — your ideas take center stage. Share away, we're all ears!
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <input
              type="text" placeholder="Name" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm text-gray-900 outline-none"
            />
            <input
              type="email" placeholder="Email" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm text-gray-900 outline-none"
            />
            <textarea
              placeholder="Your Feedback" rows="6" required value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-md px-6 bg-[#f0f1f2] text-sm text-gray-900 pt-3 outline-none"
            />
            {status === 'error' && <p className="text-xs text-rose-500">Something went wrong. Please try again.</p>}
            {status === 'sent' && <p className="text-xs" style={{ color: 'var(--ias-green)' }}>Thanks — your feedback is in!</p>}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-shimmer text-white font-semibold rounded-xl text-sm px-6 py-3 block w-full cursor-pointer disabled:opacity-60"
              style={{ background: 'var(--ias-green)' }}
            >
              {status === 'sending' ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>

        <div className="z-10 lg:block hidden">
          <img src={AboutImg} alt="" className="w-full rounded-3xl object-cover max-h-[520px]" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ImageHero
        image={HeroImg}
        height="h-[90vh]"
        title={<>IEEE<br />Industry Applications Society of<br />SLIIT</>}
        subtitle="Embrace the opportunity to join our community and make your mark in industrial and electrical engineering with the IEEE Industry Applications Society of the Sri Lanka Institute of Information Technology."
      >
        <button
          onClick={scrollToAbout}
          className="bg-white w-fit text-gray-900 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105 hover:shadow-lg drop-shadow-2xl cursor-pointer"
        >
          Explore
        </button>
      </ImageHero>

      <div id="about" className="grid md:flex gap-10 md:gap-20 my-20 md:my-28 w-4/5 mx-auto justify-center items-center">
        <img src={AboutImg} alt="Who we are" className="w-full md:w-2/5 h-fit rounded-3xl object-cover" />
        <div className="grid w-full md:w-1/2 items-center">
          <h1 className="font-display md:text-6xl text-4xl font-bold mb-8 text-center md:text-left" style={{ color: 'var(--ias-green)' }}>
            Who are we?
          </h1>
          <p className="text-center md:text-left leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            We are the IEEE Industry Applications Society at SLIIT, <br />a community passionate about
            industrial and electrical engineering. <br /><br />
            Our mission is to promote innovation, networking, and knowledge sharing. We are here to give you
            the opportunity to make a difference as a volunteer in the world of industry and technology.
          </p>
        </div>
      </div>

      <CommitteeSlider />
      <EventTimeline limit={5} />
      <FAQAccordion />
      <FeedbackBand />
    </>
  );
}
