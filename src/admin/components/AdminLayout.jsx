import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, Users, FlaskConical, Calendar,
  ClipboardCheck, Trophy, LogOut, Menu, X, ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard',   path: '/admin/dashboard',   icon: LayoutDashboard },
  { label: 'Researchers', path: '/admin/researchers',  icon: Users },
  { label: 'Research',    path: '/admin/research',     icon: FlaskConical },
  { label: 'Activities',  path: '/admin/activities',   icon: Calendar },
  { label: 'Attendance',  path: '/admin/attendance',   icon: ClipboardCheck },
  { label: 'Scores',      path: '/admin/scores',       icon: Trophy },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="admin-root flex min-h-screen bg-a-bg text-a-text a-scroll">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`w-[260px] bg-a-surface border-r border-a-border flex flex-col fixed top-0 left-0 bottom-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-5 min-h-[64px] border-b border-a-border flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-a-text font-bold text-lg">
            <FlaskConical size={22} className="text-a-accent" />
            <span>SRL Admin</span>
          </div>
          <button className="lg:hidden text-a-text-s hover:text-a-text transition-colors cursor-pointer"
            onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative no-underline ${
                  active ? 'bg-a-accent/10 text-a-accent' : 'text-a-text-s hover:bg-a-sf-hover hover:text-a-text'
                }`}>
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-a-accent rounded-r" />}
                <Icon size={20} />
                <span>{item.label}</span>
                {active && <ChevronRight size={16} className="ml-auto opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-a-border">
          <div className="flex items-center gap-3 px-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-a-accent to-a-accent-2 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-a-text truncate">{user?.email}</span>
              <span className="text-[11px] text-a-text-m uppercase tracking-wide">Administrator</span>
            </div>
          </div>
          <button onClick={signOut}
            className="flex items-center gap-2 w-full px-3.5 py-2 border border-a-border rounded-lg text-a-text-s text-xs hover:border-a-danger hover:text-a-danger hover:bg-a-danger/10 transition-all cursor-pointer">
            <LogOut size={16} /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <header className="h-16 px-6 border-b border-a-border bg-a-surface/80 backdrop-blur-xl sticky top-0 z-30 flex items-center gap-4">
          <button className="lg:hidden text-a-text-s hover:text-a-text transition-colors cursor-pointer"
            onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <h2 className="text-lg font-semibold text-a-text m-0">
            {navItems.find((n) => isActive(n.path))?.label || 'Admin'}
          </h2>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/" target="_blank" rel="noopener noreferrer"
              className="text-xs text-a-accent px-3.5 py-1.5 border border-a-border rounded-md hover:border-a-accent hover:bg-a-accent/10 transition-all no-underline">
              View Site ↗
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
