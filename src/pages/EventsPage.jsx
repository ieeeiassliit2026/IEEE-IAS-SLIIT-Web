import React, { useEffect, useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import HeroImg from '../assets/hero.jpg';

function EventCard({ event, onOpen }) {
  return (
    <button
      onClick={() => onOpen(event)}
      className="card-hover text-left rounded-2xl overflow-hidden border cursor-pointer"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
    >
      {event.image_url && (
        <div className="aspect-video overflow-hidden">
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5">
        <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color: 'var(--ias-green)' }}>
          {new Date(event.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
        <h3 className="font-semibold mb-1">{event.title}</h3>
        {event.description && <p className="text-sm line-clamp-2" style={{ color: 'var(--text-muted)' }}>{event.description}</p>}
      </div>
    </button>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: false })
      .then(({ data }) => {
        setEvents(data || []);
        setLoading(false);
      });
  }, []);

  const upcoming = events.filter((e) => e.status === 'upcoming');
  const completed = events.filter((e) => e.status === 'completed');

  return (
    <>
      {/* ── Hero band: bold typographic title + photo ── */}
      <section className="grid sm:grid-cols-2 items-stretch" style={{ background: 'var(--bg)' }}>
        <div className="flex flex-col justify-center px-8 sm:px-14 py-16">
          <h1 className="font-display font-medium leading-[0.9] text-6xl sm:text-7xl" style={{ color: 'var(--text)' }}>
            Event
          </h1>
          <h1 className="font-display font-medium leading-[0.9] text-6xl sm:text-7xl" style={{ color: 'var(--ias-green)' }}>
            News
          </h1>
        </div>
        <div className="h-56 sm:h-auto overflow-hidden">
          <img src={HeroImg} alt="" className="w-full h-full object-cover" style={{ filter: 'grayscale(0.2)' }} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
      {loading ? (
        <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>Loading events...</p>
      ) : events.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
          <Calendar className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No events published yet — check back soon.</p>
        </div>
      ) : (
        <div className="space-y-14">
          <div>
            <h2 className="font-display text-2xl mb-5 text-center">Ongoing Events</h2>
            {upcoming.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {upcoming.map((e) => <EventCard key={e.id} event={e} onOpen={setSelected} />)}
              </div>
            ) : (
              <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>No ongoing events right now.</p>
            )}
          </div>
          {completed.length > 0 && (
            <div>
              <h2 className="font-display text-2xl mb-5 text-center">Past Events</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {completed.map((e) => <EventCard key={e.id} event={e} onOpen={setSelected} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full rounded-2xl overflow-hidden fade-in-snap"
            style={{ background: 'var(--bg-elevated)' }}
          >
            {selected.image_url && <img src={selected.image_url} alt={selected.title} className="w-full aspect-video object-cover" />}
            <div className="p-6 relative">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 cursor-pointer" aria-label="Close">
                <X size={18} />
              </button>
              <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: 'var(--ias-green)' }}>
                {new Date(selected.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <h3 className="font-display text-xl mb-3">{selected.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{selected.description}</p>
            </div>
          </div>
        </div>
      )}
      </section>
    </>
  );
}
