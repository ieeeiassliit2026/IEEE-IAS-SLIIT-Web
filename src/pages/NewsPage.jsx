import React, { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import ImageHero from '../components/ImageHero';
import FeatureCard from '../components/FeatureCard';
import HeroBg from '../assets/HeroOC.jpg';

export default function NewsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('news_items')
      .select('*')
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        setItems(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ImageHero image={HeroBg} height="h-[55vh]" title="IEEE Hot News" subtitle="Announcements and updates from IEEE IAS SLIIT." />

      <section className="max-w-6xl mx-auto px-6 py-16">
        {loading ? (
          <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>Loading news...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <Newspaper className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No news posted yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map((n) => (
              <FeatureCard
                key={n.id}
                image={n.image_url}
                title={n.title}
                description={n.description}
                date={new Date(n.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
