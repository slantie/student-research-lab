import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Search, Pencil, Trash2, X, Users } from 'lucide-react';

const ROLE_OPTIONS = ['student', 'faculty', 'research_assistant'];
const emptyForm = {
  name: '', email: '', image_url: '', linkedin: '', department: '',
  semester: '', batch: '', institute: '', role_type: 'student',
  specialization: '', research_areas: '', role_title: '',
};

export default function ResearchersPage() {
  const [researchers, setResearchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { fetchResearchers(); }, []);

  async function fetchResearchers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('researchers')
      .select('*')
      .order('display_order', { ascending: true })
      .order('name', { ascending: true });
    if (!error) setResearchers(data || []);
    setLoading(false);
  }

  const filtered = researchers.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.email || '').toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || r.role_type === filterType;
    return matchSearch && matchType;
  });

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(researcher) {
    setEditing(researcher);
    setForm({
      name: researcher.name || '',
      email: researcher.email || '',
      image_url: researcher.image_url || '',
      linkedin: researcher.linkedin || '',
      department: researcher.department || '',
      semester: researcher.semester || '',
      batch: researcher.batch || '',
      institute: researcher.institute || '',
      role_type: researcher.role_type || 'student',
      specialization: researcher.specialization || '',
      research_areas: researcher.research_areas || '',
      role_title: researcher.role_title || '',
    });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase
          .from('researchers')
          .update(form)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('researchers')
          .insert([form]);
        if (error) throw error;
      }
      setModalOpen(false);
      fetchResearchers();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      const { error } = await supabase.from('researchers').delete().eq('id', id);
      if (error) throw error;
      setDeleteConfirm(null);
      fetchResearchers();
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
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-a-text-m pointer-events-none" />
            <input
              type="text"
              placeholder="Search researchers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 py-2 pl-9 pr-3 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex gap-0.5 p-0.5 bg-a-bg border border-a-border rounded-lg">
            {['all', ...ROLE_OPTIONS].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  filterType === t
                    ? 'bg-a-accent text-white'
                    : 'text-a-text-s hover:text-a-text'
                }`}
              >
                {t === 'all' ? 'All' : t.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-a-accent to-a-accent-2 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-a-accent/30 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <Plus size={18} /> Add Researcher
        </button>
      </div>

      {/* Table */}
      <div className="bg-a-surface border border-a-border rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-a-accent/10 text-a-accent flex items-center justify-center mx-auto mb-3">
              <Users size={28} />
            </div>
            <h4 className="font-semibold text-a-text">No researchers found</h4>
            <p className="text-sm text-a-text-s mt-1">
              {search ? 'Try different search terms.' : 'Add your first researcher to get started.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {['Name', 'Email', 'Department', 'Semester', 'Type', 'Institute', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-a-sf-hover transition-colors">
                    <td className="px-4 py-3 border-b border-a-border">
                      <div className="flex items-center gap-3">
                        {r.image_url ? (
                          <img src={r.image_url} alt="" className="w-8 h-8 rounded-full object-cover bg-a-bg" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-a-accent/10 text-a-accent flex items-center justify-center text-xs font-bold">
                            {r.name?.charAt(0)}
                          </div>
                        )}
                        <span className="text-a-text font-medium">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-b border-a-border text-a-text-s">{r.email || '—'}</td>
                    <td className="px-4 py-3 border-b border-a-border text-a-text-s">{r.department || '—'}</td>
                    <td className="px-4 py-3 border-b border-a-border text-a-text-s">{r.semester || '—'}</td>
                    <td className="px-4 py-3 border-b border-a-border">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        r.role_type === 'faculty' ? 'bg-a-accent/10 text-a-accent' :
                        r.role_type === 'research_assistant' ? 'bg-a-warning/10 text-a-warning' :
                        'bg-a-info/10 text-a-info'
                      }`}>
                        {r.role_type?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-a-border text-a-text-s">{r.institute || '—'}</td>
                    <td className="px-4 py-3 border-b border-a-border">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEdit(r)}
                          className="w-8 h-8 flex items-center justify-center rounded-md border border-a-border text-a-text-s hover:bg-a-sf-hover hover:text-a-text transition-all cursor-pointer"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(r)}
                          className="w-8 h-8 flex items-center justify-center rounded-md border border-a-border text-a-text-s hover:border-a-danger hover:text-a-danger hover:bg-a-danger/10 transition-all cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 anim-fade" onClick={() => setModalOpen(false)}>
          <div className="bg-a-surface border border-a-border rounded-xl w-full max-w-[600px] max-h-[90vh] flex flex-col anim-slide" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-a-border">
              <h3 className="text-lg font-semibold text-a-text">{editing ? 'Edit Researcher' : 'Add Researcher'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-a-text-m hover:text-a-text transition-colors cursor-pointer"><X size={20} /></button>
            </div>

            {/* Body */}
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 a-scroll">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Name *</label>
                  <input required value={form.name} onChange={(e) => updateForm('name', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Email</label>
                  <input value={form.email} onChange={(e) => updateForm('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="email@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Role Type *</label>
                  <select value={form.role_type} onChange={(e) => updateForm('role_type', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235c5f73%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] pr-10"
                  >
                    {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Department</label>
                  <input value={form.department} onChange={(e) => updateForm('department', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="CE, IT, etc." />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Semester</label>
                  <input value={form.semester} onChange={(e) => updateForm('semester', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="4th, 6th..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Batch</label>
                  <input value={form.batch} onChange={(e) => updateForm('batch', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="2023-2027" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-a-text-s mb-1.5">Institute</label>
                  <input value={form.institute} onChange={(e) => updateForm('institute', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="LDRP-ITR" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">LinkedIn</label>
                <input value={form.linkedin} onChange={(e) => updateForm('linkedin', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="https://linkedin.com/in/..." />
              </div>

              <div>
                <label className="block text-xs font-medium text-a-text-s mb-1.5">Image URL</label>
                <input value={form.image_url} onChange={(e) => updateForm('image_url', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="https://res.cloudinary.com/..." />
              </div>

              {form.role_type === 'faculty' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-a-text-s mb-1.5">Role Title</label>
                    <input value={form.role_title} onChange={(e) => updateForm('role_title', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="Head of MMPSRPC..." />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-a-text-s mb-1.5">Specialization</label>
                    <input value={form.specialization} onChange={(e) => updateForm('specialization', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-a-bg border border-a-border rounded-lg text-sm text-a-text outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" placeholder="PhD, M.Tech..." />
                  </div>
                </>
              )}

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-a-border">
                <button type="button" onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-a-sf-hover text-a-text border border-a-border rounded-lg text-sm font-medium hover:bg-a-sf-active transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="px-5 py-2 bg-gradient-to-r from-a-accent to-a-accent-2 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-a-accent/30 transition-all disabled:opacity-70 cursor-pointer">
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 anim-fade" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-a-surface border border-a-border rounded-xl w-full max-w-[400px] p-6 anim-slide text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-a-danger/10 text-a-danger flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h4 className="text-lg font-semibold text-a-text mb-2">Delete Researcher?</h4>
            <p className="text-sm text-a-text-s mb-6">
              Remove <strong className="text-a-text">{deleteConfirm.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-a-sf-hover text-a-text border border-a-border rounded-lg text-sm font-medium hover:bg-a-sf-active transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)}
                className="px-5 py-2 bg-a-danger/10 text-a-danger border border-a-danger/20 rounded-lg text-sm font-medium hover:bg-a-danger/20 transition-colors cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
