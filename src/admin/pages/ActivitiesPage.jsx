import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, Trash2, X, Calendar, ExternalLink, Search } from 'lucide-react';

const emptyForm = {
  title: '', description: '', image_url: '', year: new Date().getFullYear(),
  link: '', brief: '', date_label: '', display_order: 0,
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { fetchActivities(); }, []);

  async function fetchActivities() {
    setLoading(true);
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('year', { ascending: false })
      .order('display_order', { ascending: true });
    if (!error) setActivities(data || []);
    setLoading(false);
  }

  const filtered = activities.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(activity) {
    setEditing(activity);
    setForm({
      title: activity.title || '',
      description: activity.description || '',
      image_url: activity.image_url || '',
      year: activity.year || new Date().getFullYear(),
      link: activity.link || '',
      brief: activity.brief || '',
      date_label: activity.date_label || '',
      display_order: activity.display_order || 0,
    });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, year: parseInt(form.year, 10), display_order: parseInt(form.display_order, 10) || 0 };
      if (editing) {
        const { error } = await supabase.from('activities').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('activities').insert([payload]);
        if (error) throw error;
      }
      setModalOpen(false);
      fetchActivities();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      const { error } = await supabase.from('activities').delete().eq('id', id);
      if (error) throw error;
      setDeleteConfirm(null);
      fetchActivities();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  function updateForm(key, val) {
    setForm((p) => ({ ...p, [key]: val }));
  }

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
          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 py-2 pl-9 pr-3 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m"
          />
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-a-accent to-a-accent-2 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-a-accent/30 hover:-translate-y-0.5 transition-all cursor-pointer">
          <Plus size={18} /> Add Activity
        </button>
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-a-surface border border-a-border rounded-xl text-center py-16">
          <div className="w-16 h-16 rounded-full bg-a-accent/10 text-a-accent flex items-center justify-center mx-auto mb-3">
            <Calendar size={28} />
          </div>
          <h4 className="font-semibold text-a-text">No activities found</h4>
          <p className="text-sm text-a-text-s mt-1">Add your first activity to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((a) => (
            <div key={a.id} className="bg-a-surface border border-a-border rounded-xl overflow-hidden hover:border-a-brd-lt transition-all group">
              {a.image_url && (
                <div className="h-40 overflow-hidden">
                  <img src={a.image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-a-info/10 text-a-info text-[10px] font-semibold rounded-full uppercase">{a.year}</span>
                  {a.date_label && <span className="text-xs text-a-text-m">{a.date_label}</span>}
                </div>
                <h4 className="text-sm font-semibold text-a-text mb-1 line-clamp-1">{a.title}</h4>
                <p className="text-xs text-a-text-s line-clamp-2 mb-3">{a.description || a.brief}</p>
                <div className="flex items-center gap-2">
                  {a.link && (
                    <a href={a.link} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-a-border text-a-text-s hover:text-a-info hover:border-a-info transition-all">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button onClick={() => openEdit(a)}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-a-border text-a-text-s hover:bg-a-sf-hover hover:text-a-text transition-all cursor-pointer">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => setDeleteConfirm(a)}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-a-border text-a-text-s hover:border-a-danger hover:text-a-danger hover:bg-a-danger/10 transition-all cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 anim-fade" onClick={() => setModalOpen(false)}>
          <div className="bg-a-surface border border-a-border rounded-xl w-full max-w-[600px] max-h-[90vh] flex flex-col anim-slide" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-a-border">
              <h3 className="text-lg font-semibold text-a-text">{editing ? 'Edit Activity' : 'Add Activity'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-a-text-m hover:text-a-text transition-colors cursor-pointer"><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 a-scroll">
              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Title *</label>
                <input required value={form.title} onChange={(e) => updateForm('title', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="Activity title" />
              </div>

              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => updateForm('description', e.target.value)} rows={2}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m resize-y min-h-[60px]" placeholder="Short description..." />
              </div>

              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Brief</label>
                <textarea value={form.brief} onChange={(e) => updateForm('brief', e.target.value)} rows={3}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m resize-y min-h-[80px]" placeholder="Detailed brief about the activity..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Year *</label>
                  <input required type="number" value={form.year} onChange={(e) => updateForm('year', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Date Label</label>
                  <input value={form.date_label} onChange={(e) => updateForm('date_label', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="4 Feb 2026" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Order</label>
                  <input type="number" value={form.display_order} onChange={(e) => updateForm('display_order', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Image URL</label>
                <input value={form.image_url} onChange={(e) => updateForm('image_url', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="https://res.cloudinary.com/..." />
              </div>

              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Link (LinkedIn post etc.)</label>
                <input value={form.link} onChange={(e) => updateForm('link', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="https://linkedin.com/..." />
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
            <h4 className="text-lg font-semibold text-a-text mb-2">Delete Activity?</h4>
            <p className="text-sm text-a-text-s mb-6">Remove <strong className="text-a-text">{deleteConfirm.title}</strong>? This cannot be undone.</p>
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
