import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, Trash2, X, Trophy, Search, Save } from 'lucide-react';

export default function ScoresPage() {
  const [researchers, setResearchers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [scores, setScores] = useState([]); // Raw scores from DB
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResearcher, setSelectedResearcher] = useState(null);
  const [form, setForm] = useState({ session_id: '', score: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [editingScore, setEditingScore] = useState(null);

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    setLoading(true);
    const [resR, sessR, scR] = await Promise.all([
      supabase.from('researchers').select('id, name, role_type, department').order('name'),
      supabase.from('attendance_sessions').select('*').order('session_date', { ascending: true }),
      supabase.from('scores').select('*').order('created_at', { ascending: false }),
    ]);
    setResearchers(resR.data || []);
    setSessions(sessR.data || []);
    setScores(scR.data || []);
    setLoading(false);
  }

  // Aggregate scores per researcher
  const getResearcherScores = (researcherId) => {
    return scores.filter((s) => s.researcher_id === researcherId);
  };

  const getTotalScore = (researcherId) => {
    return getResearcherScores(researcherId).reduce((sum, s) => sum + Number(s.score || 0), 0);
  };

  const filtered = researchers
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => getTotalScore(b) - getTotalScore(a));

  function openAddScore(researcher) {
    setSelectedResearcher(researcher);
    setEditingScore(null);
    setForm({ session_id: '', score: '', description: '' });
    setModalOpen(true);
  }

  function openEditScore(score, researcher) {
    setSelectedResearcher(researcher);
    setEditingScore(score);
    setForm({
      session_id: score.session_id || '',
      score: score.score?.toString() || '',
      description: score.description || '',
    });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        researcher_id: selectedResearcher.id,
        session_id: form.session_id || null,
        score: parseFloat(form.score) || 0,
        description: form.description || null,
      };
      if (editingScore) {
        const { error } = await supabase.from('scores').update(payload).eq('id', editingScore.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('scores').insert([payload]);
        if (error) throw error;
      }
      setModalOpen(false);
      fetchAll();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteScore(id) {
    if (!confirm('Delete this score entry?')) return;
    try {
      const { error } = await supabase.from('scores').delete().eq('id', id);
      if (error) throw error;
      fetchAll();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  const getSessionLabel = (sessionId) => {
    const s = sessions.find((sess) => sess.id === sessionId);
    if (!s) return 'N/A';
    return new Date(s.session_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
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
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-a-text-m pointer-events-none" />
          <input type="text" placeholder="Search researchers..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-64 py-2 pl-9 pr-3 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" />
        </div>
        <span className="text-xs text-a-text-m">{researchers.length} researchers • {scores.length} score entries</span>
      </div>

      {/* Researchers with Scores */}
      {filtered.length === 0 ? (
        <div className="bg-a-surface border border-a-border rounded-xl text-center py-16">
          <div className="w-16 h-16 rounded-full bg-a-accent/10 text-a-accent flex items-center justify-center mx-auto mb-3"><Trophy size={28} /></div>
          <h4 className="font-semibold text-a-text">No researchers found</h4>
          <p className="text-sm text-a-text-s mt-1">Add researchers first from the Researchers page.</p>
        </div>
      ) : (
        <div className="bg-a-surface border border-a-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg whitespace-nowrap">#</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg whitespace-nowrap">Researcher</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg whitespace-nowrap">Dept</th>
                  <th className="text-center px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg whitespace-nowrap">Total Score</th>
                  <th className="text-center px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg whitespace-nowrap">Entries</th>
                  <th className="text-center px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, idx) => {
                  const rScores = getResearcherScores(r.id);
                  const total = getTotalScore(r.id);
                  return (
                    <tr key={r.id} className="hover:bg-a-sf-hover transition-colors group">
                      <td className="px-4 py-3 border-b border-a-border text-a-text-m font-medium">{idx + 1}</td>
                      <td className="px-4 py-3 border-b border-a-border text-a-text font-medium">{r.name}</td>
                      <td className="px-4 py-3 border-b border-a-border text-a-text-s">{r.department || '—'}</td>
                      <td className="px-4 py-3 border-b border-a-border text-center">
                        <span className={`font-bold text-base ${
                          total >= 50 ? 'text-a-success' :
                          total >= 25 ? 'text-a-warning' :
                          total >= 10 ? 'text-a-info' :
                          'text-a-text-s'
                        }`}>{total}</span>
                      </td>
                      <td className="px-4 py-3 border-b border-a-border text-center">
                        <span className="text-xs text-a-text-m">{rScores.length}</span>
                      </td>
                      <td className="px-4 py-3 border-b border-a-border text-center">
                        <button onClick={() => openAddScore(r)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-a-accent/10 text-a-accent rounded-md text-[11px] font-medium hover:bg-a-accent/20 transition-colors cursor-pointer">
                          <Plus size={12} /> Add Score
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Score Modal */}
      {modalOpen && selectedResearcher && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 anim-fade" onClick={() => setModalOpen(false)}>
          <div className="bg-a-surface border border-a-border rounded-xl w-full max-w-[480px] max-h-[90vh] flex flex-col anim-slide" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-a-border">
              <div>
                <h3 className="text-lg font-semibold text-a-text">{editingScore ? 'Edit Score' : 'Add Score'}</h3>
                <p className="text-xs text-a-text-s mt-0.5">for {selectedResearcher.name}</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-a-text-m hover:text-a-text transition-colors cursor-pointer"><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Score *</label>
                  <input required type="number" step="0.5" value={form.score} onChange={(e) => setForm((p) => ({ ...p, score: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors" placeholder="5" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Session (optional)</label>
                  <select value={form.session_id} onChange={(e) => setForm((p) => ({ ...p, session_id: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235c5f73%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] pr-10">
                    <option value="">No session</option>
                    {sessions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {new Date(s.session_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {s.title ? ` — ${s.title}` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Description (optional)</label>
                <input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="Quiz, presentation..." />
              </div>

              {/* Existing scores for this researcher */}
              {getResearcherScores(selectedResearcher.id).length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-a-text-m uppercase tracking-wider mb-2">Existing Scores</p>
                  <div className="max-h-32 overflow-y-auto space-y-1 a-scroll">
                    {getResearcherScores(selectedResearcher.id).map((s) => (
                      <div key={s.id} className="flex items-center justify-between p-2 bg-a-bg rounded-lg text-xs">
                        <span className="text-a-text-s">
                          {s.session_id ? getSessionLabel(s.session_id) : 'No session'} — {s.description || 'Score'}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-a-accent">{s.score}</span>
                          <button type="button" onClick={() => deleteScore(s.id)}
                            className="text-a-text-m hover:text-a-danger transition-colors cursor-pointer">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-a-border">
                <button type="button" onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-a-sf-hover text-a-text border border-a-border rounded-lg text-sm font-medium hover:bg-a-sf-active transition-colors cursor-pointer">Cancel</button>
                <button type="submit" disabled={saving}
                  className="px-5 py-2 bg-gradient-to-r from-a-accent to-a-accent-2 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-a-accent/30 transition-all disabled:opacity-70 cursor-pointer">
                  {saving ? 'Saving...' : editingScore ? 'Update' : 'Add Score'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
