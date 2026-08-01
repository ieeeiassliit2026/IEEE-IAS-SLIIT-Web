import React, { useEffect, useState } from 'react';
import { Newspaper, PenLine, Send } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Loader from '../components/Loader';
import { useAuth } from '../lib/AuthContext';
import ImageHero from '../components/ImageHero';
import FeatureCard from '../components/FeatureCard';
import Reveal from '../components/Reveal';
import HeroBg from '../assets/HeroOC.jpg';

function SubmitArticleForm({ onSubmitted }) {
  const [form, setForm] = useState({ title: '', description: '', image_url: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.from('news_items').insert({
      title: form.title,
      description: form.description,
      image_url: form.image_url || null,
      published_at: new Date().toISOString(),
      status: 'pending',
    });
    if (error) {
      setStatus('error');
      return;
    }
    setForm({ title: '', description: '', image_url: '' });
    setStatus('sent');
    if (onSubmitted) onSubmitted();
  };

  return (
    <div className="rounded-2xl border p-6 mb-12" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
      <h3 className="font-display text-lg mb-1 flex items-center gap-2">
        <PenLine size={18} style={{ color: 'var(--ias-green)' }} /> Submit an Article
      </h3>
      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
        Your article will appear after approval by the admin team.
      </p>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
        <input
          type="text" placeholder="Article Title" required value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="px-3 py-2 rounded-lg border text-sm outline-none focus:border-[var(--ias-green)] w-full"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
        />
        <input
          type="url" placeholder="Cover Image URL (optional)" value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="px-3 py-2 rounded-lg border text-sm outline-none focus:border-[var(--ias-green)] w-full"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
        />
        <textarea
          placeholder="Write your article..." rows="4" required value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="sm:col-span-2 px-3 py-2 rounded-lg border text-sm outline-none focus:border-[var(--ias-green)] w-full"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
        />
        {status === 'error' && <p className="text-xs text-rose-500 sm:col-span-2">Something went wrong. Please try again.</p>}
        {status === 'sent' && <p className="text-xs sm:col-span-2" style={{ color: 'var(--ias-green)' }}>Submitted! Your article is pending approval.</p>}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="sm:col-span-2 btn-shimmer py-2 rounded-lg text-white text-sm font-semibold cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: 'var(--ias-green)' }}
        >
          <Send size={14} /> {status === 'sending' ? 'Submitting...' : 'Submit for Review'}
        </button>
      </form>
    </div>
  );
}

export default function NewsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  const loadNews = () => {
    supabase
      .from('news_items')
      .select('*')
      .or('status.is.null,status.eq.approved')
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        setItems(data || []);
        setLoading(false);
      });
  };

  useEffect(() => { loadNews(); }, []);

  return (
    <>
      <ImageHero image={HeroBg} height="h-[55vh]" title="Newsletter" subtitle="Articles, announcements, and updates from IEEE IAS SLIIT." />

      <section className="max-w-6xl mx-auto px-6 py-16">
        {session && <SubmitArticleForm onSubmitted={loadNews} />}

        {loading ? (
          <Loader text="Loading articles..." />
        ) : items.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <Newspaper className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No articles posted yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map((n, i) => (
              <Reveal key={n.id} delay={i * 80} direction="scale">
                <FeatureCard
                  image={n.image_url}
                  title={n.title}
                  description={n.description}
                  date={new Date(n.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
