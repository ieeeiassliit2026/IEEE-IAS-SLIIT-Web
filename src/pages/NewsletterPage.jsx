import React, { useEffect, useState } from 'react';
import { Mail, Download } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import NewsletterBox from '../components/NewsletterBox';
import PageHero from '../components/PageHero';

export default function NewsletterPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('newsletter_issues')
      .select('*')
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        setIssues(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHero title="Publications &" accent="Updates" subtitle="Newsletter editions from IEEE IAS SLIIT — technical articles, event recaps, and announcements." />

      <section className="max-w-6xl mx-auto px-6 py-16">
        {loading ? (
          <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>Loading issues...</p>
        ) : issues.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border mb-16" style={{ borderColor: 'var(--border)' }}>
            <Mail className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No newsletter editions published yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {issues.map((issue) => (
              <div key={issue.id} className="card-hover rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
                {issue.cover_image_url && (
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={issue.cover_image_url} alt={issue.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color: 'var(--ias-green)' }}>
                    {new Date(issue.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <h3 className="font-semibold mb-1">{issue.title}</h3>
                  {issue.description && <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{issue.description}</p>}
                  <a href={issue.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold link-underline" style={{ color: 'var(--ias-green)' }}>
                    <Download size={13} /> View / Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <NewsletterBox />
      </section>
    </>
  );
}
