import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, ClipboardCheck, Calendar, Save, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function AttendancePage() {
  const [researchers, setResearchers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [records, setRecords] = useState({}); // { `${researcherId}-${sessionId}`: status }
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [dirty, setDirty] = useState(false);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    setLoading(true);
    const [resR, sessR, recR] = await Promise.all([
      supabase.from('researchers').select('id, name, role_type').order('display_order').order('name'),
      supabase.from('attendance_sessions').select('*').order('session_date', { ascending: true }),
      supabase.from('attendance_records').select('*'),
    ]);

    setResearchers(resR.data || []);
    setSessions(sessR.data || []);

    // Build records map
    const map = {};
    (recR.data || []).forEach((r) => {
      map[`${r.researcher_id}-${r.session_id}`] = r.status;
    });
    setRecords(map);
    setLoading(false);
  }

  const toggleAttendance = useCallback((researcherId, sessionId) => {
    const key = `${researcherId}-${sessionId}`;
    setRecords((prev) => {
      const current = prev[key] ?? 0;
      return { ...prev, [key]: current === 1 ? 0 : 1 };
    });
    setDirty(true);
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      // Upsert all records
      const upserts = [];
      for (const r of researchers) {
        for (const s of sessions) {
          const key = `${r.id}-${s.id}`;
          upserts.push({
            researcher_id: r.id,
            session_id: s.id,
            status: records[key] ?? 0,
          });
        }
      }

      // Batch upsert — Supabase supports onConflict
      if (upserts.length > 0) {
        const { error } = await supabase
          .from('attendance_records')
          .upsert(upserts, { onConflict: 'researcher_id,session_id' });
        if (error) throw error;
      }

      setDirty(false);
      alert('Attendance saved!');
    } catch (err) {
      alert('Error saving: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function addSession(e) {
    e.preventDefault();
    if (!newDate) return;
    try {
      const { error } = await supabase
        .from('attendance_sessions')
        .insert([{ session_date: newDate, title: newTitle || null }]);
      if (error) throw error;
      setAddSessionOpen(false);
      setNewDate('');
      setNewTitle('');
      fetchAll();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  const filteredResearchers = researchers.filter((r) =>
    filterType === 'all' || r.role_type === filterType
  );

  // Compute per-researcher stats
  const getStats = (researcherId) => {
    let present = 0, total = sessions.length;
    sessions.forEach((s) => {
      const key = `${researcherId}-${s.id}`;
      if (records[key] === 1) present++;
    });
    const pct = total > 0 ? Math.round((present / total) * 100) : 0;
    return { present, total, pct };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-[3px] border-a-border border-t-a-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Filter */}
          <div className="flex gap-0.5 p-0.5 bg-a-bg border border-a-border rounded-lg">
            {['all', 'student', 'research_assistant', 'faculty'].map((t) => (
              <button key={t} onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  filterType === t ? 'bg-a-accent text-white' : 'text-a-text-s hover:text-a-text'
                }`}>
                {t === 'all' ? 'All' : t.replace('_', ' ')}
              </button>
            ))}
          </div>

          <span className="text-xs text-a-text-m">
            {sessions.length} session(s) • {filteredResearchers.length} researcher(s)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setAddSessionOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-a-sf-hover text-a-text border border-a-border rounded-lg text-sm font-medium hover:bg-a-sf-active transition-colors cursor-pointer">
            <Plus size={16} /> Add Session
          </button>
          <button onClick={handleSave} disabled={saving || !dirty}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              dirty
                ? 'bg-gradient-to-r from-a-accent to-a-accent-2 text-white hover:shadow-lg hover:shadow-a-accent/30'
                : 'bg-a-sf-hover text-a-text-m border border-a-border cursor-not-allowed'
            }`}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Attendance Grid */}
      {sessions.length === 0 ? (
        <div className="bg-a-surface border border-a-border rounded-xl text-center py-16">
          <div className="w-16 h-16 rounded-full bg-a-accent/10 text-a-accent flex items-center justify-center mx-auto mb-3">
            <ClipboardCheck size={28} />
          </div>
          <h4 className="font-semibold text-a-text">No sessions yet</h4>
          <p className="text-sm text-a-text-s mt-1">Add a session date to start recording attendance.</p>
        </div>
      ) : (
        <div className="bg-a-surface border border-a-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto a-scroll">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-a-text-m border-b border-r border-a-border bg-a-bg sticky left-0 z-[4] min-w-[200px]">
                    Researcher
                  </th>
                  {sessions.map((s) => (
                    <th key={s.id} className="px-2 py-2.5 text-[10px] font-semibold text-a-text-m border-b border-a-border bg-a-bg whitespace-nowrap text-center min-w-[48px]">
                      <div>{format(parseISO(s.session_date), 'd MMM')}</div>
                    </th>
                  ))}
                  <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-a-text-m border-b border-l border-a-border bg-a-bg text-center min-w-[60px]">%</th>
                </tr>
              </thead>
              <tbody>
                {filteredResearchers.map((r) => {
                  const stats = getStats(r.id);
                  return (
                    <tr key={r.id} className="hover:bg-a-sf-hover/50 transition-colors">
                      <td className="px-3 py-2 border-b border-r border-a-border sticky left-0 bg-a-surface z-[3]">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-a-text text-xs truncate max-w-[160px]">{r.name}</span>
                        </div>
                      </td>
                      {sessions.map((s) => {
                        const key = `${r.id}-${s.id}`;
                        const present = records[key] === 1;
                        return (
                          <td key={s.id} className="px-1 py-1.5 border-b border-a-border text-center">
                            <button
                              onClick={() => toggleAttendance(r.id, s.id)}
                              className={`att-cell w-7 h-7 rounded-md font-bold text-[11px] inline-flex items-center justify-center cursor-pointer border-none ${
                                present
                                  ? 'bg-a-success/15 text-a-success'
                                  : 'bg-a-danger/10 text-a-danger/70'
                              }`}
                            >
                              {present ? '1' : '0'}
                            </button>
                          </td>
                        );
                      })}
                      <td className="px-3 py-2 border-b border-l border-a-border text-center">
                        <span className={`font-bold text-xs ${
                          stats.pct >= 75 ? 'text-a-success' :
                          stats.pct >= 50 ? 'text-a-warning' :
                          'text-a-danger'
                        }`}>
                          {stats.pct}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Session Modal */}
      {addSessionOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 anim-fade" onClick={() => setAddSessionOpen(false)}>
          <div className="bg-a-surface border border-a-border rounded-xl w-full max-w-[400px] anim-slide" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-a-border">
              <h3 className="text-lg font-semibold text-a-text">Add Session</h3>
              <button onClick={() => setAddSessionOpen(false)} className="text-a-text-m hover:text-a-text transition-colors cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={addSession} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Date *</label>
                <input type="date" required value={newDate} onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors [color-scheme:dark]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Title (optional)</label>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="Regular session, workshop..." />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setAddSessionOpen(false)}
                  className="px-4 py-2 bg-a-sf-hover text-a-text border border-a-border rounded-lg text-sm font-medium hover:bg-a-sf-active transition-colors cursor-pointer">Cancel</button>
                <button type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-a-accent to-a-accent-2 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-a-accent/30 transition-all cursor-pointer">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
