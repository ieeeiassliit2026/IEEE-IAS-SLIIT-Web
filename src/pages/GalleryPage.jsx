import React, { useEffect, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import IASLogo from '../assets/IAS.png';
import { committeeMembers } from '../data/committee';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="max-w-2xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: 'var(--ias-green)' }}>
          Gallery
        </span>
        <h1 className="font-display text-4xl mt-3">Media &amp; Gallery</h1>
        <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
          Check out the vibrant and exciting events in IEEE Industry Applications Society, SLIIT!
        </p>
      </div>

      <h2 className="font-display text-xl mb-4">Organizing Committee</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-14">
        {committeeMembers.map((m) => (
          <a key={m.full_name} href={m.linkedin} target="_blank" rel="noreferrer" className="card-hover rounded-xl overflow-hidden aspect-square block">
            <img src={m.photo} alt={m.full_name} className="w-full h-full object-cover" />
          </a>
        ))}
      </div>

      <h2 className="font-display text-xl mb-4">Event Photos</h2>
      {loading ? (
        <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>Loading gallery...</p>
      ) : images.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
          <ImageIcon className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No event photos uploaded yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {images.map((img) => (
            <div key={img.id} className="card-hover relative rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
              <img src={img.image_url} alt={img.caption || ''} className="w-full aspect-[4/3] object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

              {img.caption && (
                <span
                  className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'var(--ias-green)' }}
                >
                  <img src={IASLogo} alt="" className="h-4 w-4 object-contain rounded-full bg-white p-0.5" />
                  {img.caption}
                </span>
              )}
              {img.photographer && (
                <span className="absolute bottom-3 right-3 text-[10px] font-medium text-white/80">
                  Photographer: {img.photographer}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
