import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, FlaskConical, Calendar, ClipboardCheck, TrendingUp, Trophy } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    researchers: 0,
    researchWorks: 0,
    activities: 0,
    sessions: 0,
  });
  const [recentResearchers, setRecentResearchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const [resR, rwR, actR, sessR, recentR] = await Promise.all([
        supabase.from('researchers').select('id', { count: 'exact', head: true }),
        supabase.from('research_works').select('id', { count: 'exact', head: true }),
        supabase.from('activities').select('id', { count: 'exact', head: true }),
        supabase.from('attendance_sessions').select('id', { count: 'exact', head: true }),
        supabase.from('researchers').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        researchers: resR.count || 0,
        researchWorks: rwR.count || 0,
        activities: actR.count || 0,
        sessions: sessR.count || 0,
      });
      setRecentResearchers(recentR.data || []);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    { label: 'Researchers',    value: stats.researchers,    icon: Users,          color: 'text-a-accent bg-a-accent/10' },
    { label: 'Research Works', value: stats.researchWorks,  icon: FlaskConical,   color: 'text-a-success bg-a-success/10' },
    { label: 'Activities',     value: stats.activities,     icon: Calendar,       color: 'text-a-info bg-a-info/10' },
    { label: 'Sessions',       value: stats.sessions,       icon: ClipboardCheck, color: 'text-a-warning bg-a-warning/10' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-[3px] border-a-border border-t-a-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-a-text">Welcome back 👋</h1>
        <p className="text-sm text-a-text-s mt-1">Here's what's happening with SRL today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-a-surface border border-a-border rounded-xl p-5 flex items-start gap-4 hover:border-a-brd-lt hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${card.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-a-text leading-tight">{card.value}</h3>
                <p className="text-xs text-a-text-s mt-0.5">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Researchers */}
      <div className="bg-a-surface border border-a-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-a-border flex items-center justify-between">
          <h3 className="text-base font-semibold text-a-text">Recent Researchers</h3>
          <span className="text-xs text-a-text-m">Last 5 added</span>
        </div>
        {recentResearchers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-a-accent/10 text-a-accent flex items-center justify-center mx-auto mb-3">
              <Users size={28} />
            </div>
            <h4 className="font-semibold text-a-text">No researchers yet</h4>
            <p className="text-sm text-a-text-s mt-1">Add researchers from the Researchers page.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg">Department</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-a-text-m border-b border-a-border bg-a-bg">Institute</th>
                </tr>
              </thead>
              <tbody>
                {recentResearchers.map((r) => (
                  <tr key={r.id} className="hover:bg-a-sf-hover transition-colors">
                    <td className="px-5 py-3 border-b border-a-border text-a-text font-medium">{r.name}</td>
                    <td className="px-5 py-3 border-b border-a-border text-a-text-s">{r.department || '—'}</td>
                    <td className="px-5 py-3 border-b border-a-border">
                      <span className={`
                        inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide
                        ${r.role_type === 'faculty' ? 'bg-a-accent/10 text-a-accent' :
                          r.role_type === 'research_assistant' ? 'bg-a-warning/10 text-a-warning' :
                          'bg-a-info/10 text-a-info'}
                      `}>
                        {r.role_type?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3 border-b border-a-border text-a-text-s">{r.institute || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
