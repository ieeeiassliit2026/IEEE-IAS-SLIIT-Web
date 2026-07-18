import React, { useEffect, useState } from 'react';
import { Star, Users } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import BandHero from '../components/BandHero';
import HeroImg from '../assets/bg.jpg';

function MemberCard({ member }) {
  return (
    <div className="card-hover rounded-2xl overflow-hidden border text-center p-5" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
      <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2" style={{ borderColor: member.is_top_volunteer ? 'var(--ias-green)' : 'var(--border)' }}>
        {member.photo_url ? (
          <img src={member.photo_url} alt={member.full_name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--ias-green)]/15 text-[var(--ias-green)] font-display text-xl">
            {member.full_name.charAt(0)}
          </div>
        )}
        {member.is_top_volunteer && (
          <span className="absolute -top-0.5 -right-0.5 bg-[var(--ias-green)] text-white rounded-full p-1">
            <Star size={10} fill="currentColor" />
          </span>
        )}
      </div>
      <p className="font-semibold text-sm">{member.full_name}</p>
      {member.role_title && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{member.role_title}</p>}
      {member.contribution_note && <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{member.contribution_note}</p>}
    </div>
  );
}

export default function MemberWallPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('member_wall')
      .select('*')
      .order('is_top_volunteer', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setMembers(data || []);
        setLoading(false);
      });
  }, []);

  const topVolunteers = members.filter((m) => m.is_top_volunteer);
  const others = members.filter((m) => !m.is_top_volunteer);

  return (
    <>
      <BandHero title="Member" accent="Wall" image={HeroImg} text="Celebrating registered IEEE IAS members and recognizing the top volunteers who make our chapter thrive." />

      <section className="max-w-6xl mx-auto px-6 py-16">
      {loading ? (
        <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>Loading members...</p>
      ) : members.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
          <Users className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No members listed yet.</p>
        </div>
      ) : (
        <>
          {topVolunteers.length > 0 && (
            <div className="mb-14">
              <h2 className="font-display text-2xl mb-5 flex items-center gap-2">
                <Star size={18} className="text-[var(--ias-green)]" fill="currentColor" /> Top Volunteers
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                {topVolunteers.map((m) => <MemberCard key={m.id} member={m} />)}
              </div>
            </div>
          )}
          {others.length > 0 && (
            <div>
              <h2 className="font-display text-2xl mb-5">Registered Members</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                {others.map((m) => <MemberCard key={m.id} member={m} />)}
              </div>
            </div>
          )}
        </>
      )}
      </section>
    </>
  );
}
