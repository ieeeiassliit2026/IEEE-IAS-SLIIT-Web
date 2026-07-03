import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/AuthContext';

const TABS = ['Contact Messages', 'Events', 'Gallery', 'Newsletter Issues', 'Member Wall'];

function Field(props) {
  return (
    <input
      {...props}
      className="px-3 py-2 rounded-lg border text-sm outline-none focus:border-emerald-500 w-full"
      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
    />
  );
}

export default function AdminDashboardPage() {
  const { session, signOut } = useAuth();
  const [tab, setTab] = useState(TABS[0]);
  const [contacts, setContacts] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [issues, setIssues] = useState([]);
  const [members, setMembers] = useState([]);

  const [newEvent, setNewEvent] = useState({ title: '', description: '', event_date: '', event_type: 'workshop', status: 'upcoming', image_url: '' });
  const [newImage, setNewImage] = useState({ image_url: '', caption: '' });
  const [newIssue, setNewIssue] = useState({ title: '', description: '', file_url: '', cover_image_url: '', published_at: '' });
  const [newMember, setNewMember] = useState({ full_name: '', role_title: '', contribution_note: '', photo_url: '', is_top_volunteer: false });

  const reload = () => {
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).then(({ data }) => setContacts(data || []));
    supabase.from('events').select('*').order('event_date', { ascending: false }).then(({ data }) => setEvents(data || []));
    supabase.from('gallery_images').select('*').order('created_at', { ascending: false }).then(({ data }) => setGallery(data || []));
    supabase.from('newsletter_issues').select('*').order('published_at', { ascending: false }).then(({ data }) => setIssues(data || []));
    supabase.from('member_wall').select('*').order('created_at', { ascending: false }).then(({ data }) => setMembers(data || []));
  };

  useEffect(() => { if (session) reload(); }, [session]);

  if (!session) {
    return <div className="max-w-md mx-auto px-6 py-20 text-center"><p style={{ color: 'var(--text-muted)' }}>Please log in to view the admin dashboard.</p></div>;
  }

  const addEvent = async (e) => {
    e.preventDefault();
    await supabase.from('events').insert(newEvent);
    setNewEvent({ title: '', description: '', event_date: '', event_type: 'workshop', status: 'upcoming', image_url: '' });
    reload();
  };
  const addImage = async (e) => {
    e.preventDefault();
    await supabase.from('gallery_images').insert(newImage);
    setNewImage({ image_url: '', caption: '' });
    reload();
  };
  const addIssue = async (e) => {
    e.preventDefault();
    await supabase.from('newsletter_issues').insert(newIssue);
    setNewIssue({ title: '', description: '', file_url: '', cover_image_url: '', published_at: '' });
    reload();
  };
  const addMember = async (e) => {
    e.preventDefault();
    await supabase.from('member_wall').insert(newMember);
    setNewMember({ full_name: '', role_title: '', contribution_note: '', photo_url: '', is_top_volunteer: false });
    reload();
  };
  const remove = async (table, id) => {
    await supabase.from(table).delete().eq('id', id);
    reload();
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">Admin Dashboard</h1>
        <button onClick={signOut} className="text-xs font-mono uppercase tracking-wide px-4 py-2 rounded-full border cursor-pointer" style={{ borderColor: 'var(--border)' }}>
          Sign Out
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-8 border-b" style={{ borderColor: 'var(--border)' }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 text-sm font-medium cursor-pointer border-b-2 -mb-px"
            style={{ borderColor: tab === t ? 'var(--ias-green)' : 'transparent', color: tab === t ? 'var(--ias-green)' : 'var(--text-muted)' }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Contact Messages' && (
        <div className="space-y-3">
          {contacts.length === 0 && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No messages yet.</p>}
          {contacts.map((c) => (
            <div key={c.id} className="rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-sm">{c.name} — <span style={{ color: 'var(--text-muted)' }}>{c.email}</span></p>
                <span className="text-xs font-mono uppercase" style={{ color: 'var(--text-muted)' }}>{new Date(c.created_at).toLocaleDateString()}</span>
              </div>
              {c.subject && <p className="text-xs font-semibold mb-1">{c.subject}</p>}
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{c.message}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'Events' && (
        <div className="space-y-6">
          <form onSubmit={addEvent} className="grid sm:grid-cols-2 gap-3 rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}>
            <Field placeholder="Title" required value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            <Field type="date" required value={newEvent.event_date} onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })} />
            <Field placeholder="Image URL" value={newEvent.image_url} onChange={(e) => setNewEvent({ ...newEvent, image_url: e.target.value })} />
            <select value={newEvent.status} onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })} className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
            <textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="sm:col-span-2 px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }} />
            <button type="submit" className="sm:col-span-2 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold cursor-pointer">Add Event</button>
          </form>
          {events.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}>
              <div><p className="font-semibold text-sm">{e.title}</p><p className="text-xs" style={{ color: 'var(--text-muted)' }}>{e.event_date} · {e.status}</p></div>
              <button onClick={() => remove('events', e.id)} className="text-xs text-rose-500 cursor-pointer">Delete</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'Gallery' && (
        <div className="space-y-6">
          <form onSubmit={addImage} className="grid sm:grid-cols-2 gap-3 rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}>
            <Field placeholder="Image URL" required value={newImage.image_url} onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })} />
            <Field placeholder="Caption" value={newImage.caption} onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })} />
            <button type="submit" className="sm:col-span-2 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold cursor-pointer">Add Image</button>
          </form>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {gallery.map((g) => (
              <div key={g.id} className="relative group">
                <img src={g.image_url} alt="" className="w-full aspect-square object-cover rounded-lg" />
                <button onClick={() => remove('gallery_images', g.id)} className="absolute inset-0 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Newsletter Issues' && (
        <div className="space-y-6">
          <form onSubmit={addIssue} className="grid sm:grid-cols-2 gap-3 rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}>
            <Field placeholder="Title" required value={newIssue.title} onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })} />
            <Field type="date" required value={newIssue.published_at} onChange={(e) => setNewIssue({ ...newIssue, published_at: e.target.value })} />
            <Field placeholder="Cover Image URL" value={newIssue.cover_image_url} onChange={(e) => setNewIssue({ ...newIssue, cover_image_url: e.target.value })} />
            <Field placeholder="File URL (PDF)" required value={newIssue.file_url} onChange={(e) => setNewIssue({ ...newIssue, file_url: e.target.value })} />
            <textarea placeholder="Description" value={newIssue.description} onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })} className="sm:col-span-2 px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }} />
            <button type="submit" className="sm:col-span-2 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold cursor-pointer">Add Issue</button>
          </form>
          {issues.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}>
              <p className="font-semibold text-sm">{i.title}</p>
              <button onClick={() => remove('newsletter_issues', i.id)} className="text-xs text-rose-500 cursor-pointer">Delete</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'Member Wall' && (
        <div className="space-y-6">
          <form onSubmit={addMember} className="grid sm:grid-cols-2 gap-3 rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}>
            <Field placeholder="Full Name" required value={newMember.full_name} onChange={(e) => setNewMember({ ...newMember, full_name: e.target.value })} />
            <Field placeholder="Role / Title" value={newMember.role_title} onChange={(e) => setNewMember({ ...newMember, role_title: e.target.value })} />
            <Field placeholder="Photo URL" value={newMember.photo_url} onChange={(e) => setNewMember({ ...newMember, photo_url: e.target.value })} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={newMember.is_top_volunteer} onChange={(e) => setNewMember({ ...newMember, is_top_volunteer: e.target.checked })} />
              Top Volunteer
            </label>
            <textarea placeholder="Contribution note" value={newMember.contribution_note} onChange={(e) => setNewMember({ ...newMember, contribution_note: e.target.value })} className="sm:col-span-2 px-3 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }} />
            <button type="submit" className="sm:col-span-2 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold cursor-pointer">Add Member</button>
          </form>
          {members.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}>
              <p className="font-semibold text-sm">{m.full_name} {m.is_top_volunteer && '⭐'}</p>
              <button onClick={() => remove('member_wall', m.id)} className="text-xs text-rose-500 cursor-pointer">Delete</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
