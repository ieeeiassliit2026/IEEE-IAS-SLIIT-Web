import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import ImageHero from '../components/ImageHero';
import HeroBg from '../assets/bg2.jpg';
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

  // Close the lightbox on Escape, matching the click-to-dismiss overlay.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <>
      <ImageHero
        image={HeroBg}
        height="h-[60vh]"
        title="Media & Gallery"
        subtitle="Check out the vibrant and exciting events in IEEE Industry Applications Society, SLIIT"
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl mb-6 text-center">Organizing Committee</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 mb-16">
          {committeeMembers.map((m) => (
            <a
              key={m.full_name}
              href={m.linkedin}
              target="_blank"
              rel="noreferrer"
              className="card-hover rounded-xl overflow-hidden aspect-square block"
              style={{ border: '2px solid var(--ias-green)' }}
            >
              <img src={m.photo} alt={m.full_name} className="w-full h-full object-cover" />
            </a>
          ))}
        </div>

        <h2 className="font-display text-2xl mb-6 text-center">Event Photos</h2>
        {loading ? (
          <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>Loading gallery...</p>
        ) : images.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <ImageIcon className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No event photos uploaded yet.</p>
          </div>
        ) : (
          /* CSS masonry columns, as CS's gallery does */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setLightbox(img)}
                className="mb-3 block w-full cursor-pointer transition duration-300 hover:brightness-75 break-inside-avoid"
              >
                <img
                  src={img.image_url}
                  alt={img.caption || ''}
                  className="w-full rounded-sm shadow-md"
                  style={{ border: '2px solid var(--ias-green)' }}
                />
                {(img.caption || img.photographer) && (
                  <span className="flex items-center justify-between gap-2 pt-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="truncate">{img.caption}</span>
                    {img.photographer && <span className="shrink-0">📷 {img.photographer}</span>}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 fade-in-snap"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white cursor-pointer"
            aria-label="Close"
          >
            <X size={40} />
          </button>
          <img
            src={lightbox.image_url}
            alt={lightbox.caption || ''}
            className="max-w-[85%] max-h-[80vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
