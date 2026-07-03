import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { committeeMembers } from '../data/committee';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setImages(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: 'var(--ias-green)' }}>
          Gallery
        </span>
        <h1 className="font-display text-4xl mt-3">Moments From Our Events</h1>
      </div>

      <h2 className="font-display text-xl mb-4">Organizing Committee</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-16">
        {committeeMembers.map((m) => (
          <button key={m.full_name} onClick={() => setLightbox(m.photo)} className="card-hover rounded-xl overflow-hidden aspect-square cursor-pointer">
            <img src={m.photo} alt={m.full_name} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <h2 className="font-display text-xl mb-4">Event Photos</h2>
      {loading ? (
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading gallery...</p>
      ) : images.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
          <ImageIcon className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No event photos uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <button key={img.id} onClick={() => setLightbox(img.image_url)} className="card-hover rounded-xl overflow-hidden aspect-square cursor-pointer">
              <img src={img.image_url} alt={img.caption || ''} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white cursor-pointer" aria-label="Close"><X size={24} /></button>
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-lg fade-in-snap" />
        </div>
      )}
    </section>
  );
}
