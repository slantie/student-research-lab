import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, Trash2, X, FlaskConical, Search, ChevronDown, ChevronUp, FileText } from 'lucide-react';

const STATUS_OPTIONS = ['Completed', 'Ongoing', 'Upcoming'];
const emptyForm = {
  title: '', status: 'Ongoing', short_description: '', description: '',
  guided_by: '', guide_role: '', image_url: '', display_order: 0,
};

export default function ResearchPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { fetchWorks(); }, []);

  async function fetchWorks() {
    setLoading(true);
    const { data, error } = await supabase
      .from('research_works')
      .select(`
        *,
        research_papers ( id, title, description, display_order )
      `)
      .order('display_order', { ascending: true });
    if (!error) setWorks(data || []);
    setLoading(false);
  }

  const filtered = works.filter((w) =>
    w.title.toLowerCase().includes(search.toLowerCase())
  );

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(work) {
    setEditing(work);
    setForm({
      title: work.title || '', status: work.status || 'Ongoing',
      short_description: work.short_description || '', description: work.description || '',
      guided_by: work.guided_by || '', guide_role: work.guide_role || '',
      image_url: work.image_url || '', display_order: work.display_order || 0,
    });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, display_order: parseInt(form.display_order, 10) || 0 };
      if (editing) {
        const { error } = await supabase.from('research_works').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('research_works').insert([payload]);
        if (error) throw error;
      }
      setModalOpen(false);
      fetchWorks();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      const { error } = await supabase.from('research_works').delete().eq('id', id);
      if (error) throw error;
      setDeleteConfirm(null);
      fetchWorks();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  function updateForm(key, val) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  const statusColor = (s) => {
    switch (s) {
      case 'Completed': return 'bg-a-success/10 text-a-success';
      case 'Ongoing': return 'bg-a-info/10 text-a-info';
      case 'Upcoming': return 'bg-a-warning/10 text-a-warning';
      default: return 'bg-a-accent/10 text-a-accent';
    }
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
          <input type="text" placeholder="Search research..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-64 py-2 pl-9 pr-3 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" />
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-a-accent to-a-accent-2 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-a-accent/30 hover:-translate-y-0.5 transition-all cursor-pointer">
          <Plus size={18} /> Add Research Work
        </button>
      </div>

      {/* Works List */}
      {filtered.length === 0 ? (
        <div className="bg-a-surface border border-a-border rounded-xl text-center py-16">
          <div className="w-16 h-16 rounded-full bg-a-accent/10 text-a-accent flex items-center justify-center mx-auto mb-3"><FlaskConical size={28} /></div>
          <h4 className="font-semibold text-a-text">No research works found</h4>
          <p className="text-sm text-a-text-s mt-1">Add your first research work to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((w) => (
            <div key={w.id} className="bg-a-surface border border-a-border rounded-xl overflow-hidden hover:border-a-brd-lt transition-all">
              {/* Header */}
              <div className="p-4 flex items-start gap-4">
                {w.image_url && (
                  <img src={w.image_url} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0 bg-a-bg" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${statusColor(w.status)}`}>{w.status}</span>
                    {w.guided_by && <span className="text-xs text-a-text-m">by {w.guided_by}</span>}
                  </div>
                  <h4 className="text-sm font-semibold text-a-text line-clamp-2">{w.title}</h4>
                  {w.short_description && <p className="text-xs text-a-text-s mt-1 line-clamp-1">{w.short_description}</p>}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {w.research_papers?.length > 0 && (
                    <button onClick={() => setExpanded(expanded === w.id ? null : w.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-a-border text-a-text-s hover:bg-a-sf-hover transition-all cursor-pointer">
                      {expanded === w.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  )}
                  <button onClick={() => openEdit(w)}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-a-border text-a-text-s hover:bg-a-sf-hover hover:text-a-text transition-all cursor-pointer">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => setDeleteConfirm(w)}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-a-border text-a-text-s hover:border-a-danger hover:text-a-danger hover:bg-a-danger/10 transition-all cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Expandable papers section */}
              {expanded === w.id && w.research_papers?.length > 0 && (
                <div className="border-t border-a-border bg-a-bg/50 p-4 space-y-2">
                  <p className="text-[11px] font-semibold text-a-text-m uppercase tracking-wider mb-2">Papers ({w.research_papers.length})</p>
                  {w.research_papers
                    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                    .map((p) => (
                      <div key={p.id} className="flex items-start gap-2 p-2.5 bg-a-surface rounded-lg border border-a-border">
                        <FileText size={16} className="text-a-accent mt-0.5 shrink-0" />
                        <div>
                          <h5 className="text-xs font-semibold text-a-text">{p.title}</h5>
                          {p.description && <p className="text-[11px] text-a-text-s mt-0.5 line-clamp-2">{p.description}</p>}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 anim-fade" onClick={() => setModalOpen(false)}>
          <div className="bg-a-surface border border-a-border rounded-xl w-full max-w-[640px] max-h-[90vh] flex flex-col anim-slide" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-a-border">
              <h3 className="text-lg font-semibold text-a-text">{editing ? 'Edit Research Work' : 'Add Research Work'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-a-text-m hover:text-a-text transition-colors cursor-pointer"><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 a-scroll">
              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Title *</label>
                <input required value={form.title} onChange={(e) => updateForm('title', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="Research work title" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Status *</label>
                  <select value={form.status} onChange={(e) => updateForm('status', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235c5f73%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] pr-10">
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Display Order</label>
                  <input type="number" value={form.display_order} onChange={(e) => updateForm('display_order', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Short Description</label>
                <textarea value={form.short_description} onChange={(e) => updateForm('short_description', e.target.value)} rows={2}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m resize-y min-h-[60px]" placeholder="Brief summary..." />
              </div>

              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Full Description</label>
                <textarea value={form.description} onChange={(e) => updateForm('description', e.target.value)} rows={4}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m resize-y min-h-[100px]" placeholder="Detailed description..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Guided By</label>
                  <input value={form.guided_by} onChange={(e) => updateForm('guided_by', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="Dr. ..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Guide Role</label>
                  <input value={form.guide_role} onChange={(e) => updateForm('guide_role', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="Head, MMPSRPC..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Image URL</label>
                <input value={form.image_url} onChange={(e) => updateForm('image_url', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="https://res.cloudinary.com/..." />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-a-border">
                <button type="button" onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-a-sf-hover text-a-text border border-a-border rounded-lg text-sm font-medium hover:bg-a-sf-active transition-colors cursor-pointer">Cancel</button>
                <button type="submit" disabled={saving}
                  className="px-5 py-2 bg-gradient-to-r from-a-accent to-a-accent-2 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-a-accent/30 transition-all disabled:opacity-70 cursor-pointer">
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 anim-fade" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-a-surface border border-a-border rounded-xl w-full max-w-[400px] p-6 anim-slide text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-a-danger/10 text-a-danger flex items-center justify-center mx-auto mb-4"><Trash2 size={24} /></div>
            <h4 className="text-lg font-semibold text-a-text mb-2">Delete Research Work?</h4>
            <p className="text-sm text-a-text-s mb-6">This will also delete all associated papers and member links.</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-a-sf-hover text-a-text border border-a-border rounded-lg text-sm font-medium hover:bg-a-sf-active transition-colors cursor-pointer">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm.id)}
                className="px-5 py-2 bg-a-danger/10 text-a-danger border border-a-danger/20 rounded-lg text-sm font-medium hover:bg-a-danger/20 transition-colors cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
