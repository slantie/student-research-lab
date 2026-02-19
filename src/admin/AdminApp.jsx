import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthProvider } from '../contexts/AuthContext';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import './admin.css';

/**
 * Wraps admin routes with auth check.
 * Shows login if not authenticated, otherwise renders children (AdminLayout).
 */
function AdminGuard({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="admin-root min-h-screen flex items-center justify-center bg-a-bg">
        <div className="w-8 h-8 border-[3px] border-a-border border-t-a-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return children;
}

/**
 * Admin wrapper component — provides AuthContext and guard.
 */
export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    </AuthProvider>
  );
}
