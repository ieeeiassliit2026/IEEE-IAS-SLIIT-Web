import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, FacebookIcon } from '../components/BrandIcons';
import { supabase } from '../lib/supabaseClient';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const { error } = await supabase.from('contact_submissions').insert(form);
    if (error) {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    } else {
      setStatus('done');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <>
      <section className="text-center py-20 px-6">
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: 'var(--ias-green)' }}>
          Contact Us
        </span>
        <h1 className="font-display text-4xl mt-3 mb-4">Let's Get In Touch</h1>
        <p className="max-w-xl mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
          Have a question, partnership idea, or just want to say hello? We'd love to hear from you.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="rounded-2xl border p-6 space-y-5" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5" style={{ color: 'var(--ias-green)' }} />
              <div>
                <p className="text-sm font-semibold">Email</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>ias@ieeesliit.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5" style={{ color: 'var(--ias-green)' }} />
              <div>
                <p className="text-sm font-semibold">Location</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>SLIIT Malabe Campus, New Kandy Road, Malabe, Sri Lanka</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="mt-0.5" style={{ color: 'var(--ias-green)' }} />
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>+94 78 526 4854</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a href="https://www.linkedin.com/company/ieee-industry-applications-society-of-sliit/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[var(--ias-green)] transition-colors">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://www.instagram.com/ias_sliit/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[var(--ias-green)] transition-colors">
                <InstagramIcon size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-[var(--ias-green)] transition-colors">
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border h-64" style={{ borderColor: 'var(--border)' }}>
            <iframe
              title="SLIIT Malabe Campus Map"
              src="https://www.google.com/maps?q=SLIIT+Malabe+Campus&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border p-6 sm:p-8 space-y-4" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
          {status === 'done' ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <Check size={32} className="text-emerald-500" />
              <p className="font-semibold">Message sent!</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name"
                  className="px-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-500"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg)' }} />
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Your email"
                  className="px-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-500"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg)' }} />
              </div>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-500"
                style={{ borderColor: 'var(--border)', background: 'var(--bg)' }} />
              <textarea name="message" required rows={6} value={form.message} onChange={handleChange} placeholder="Your message"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-500 resize-y"
                style={{ borderColor: 'var(--border)', background: 'var(--bg)' }} />
              {status === 'error' && <p className="text-xs text-rose-500">{error}</p>}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-shimmer w-full py-3 rounded-xl bg-emerald-500 text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {status === 'loading' ? 'Sending...' : <>Send Message <Send size={14} /></>}
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
}
