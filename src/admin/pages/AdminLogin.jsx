import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Lock, Mail, FlaskConical } from 'lucide-react';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-root min-h-screen flex items-center justify-center bg-a-bg relative overflow-hidden px-4">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-a-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-a-info/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[420px] bg-a-surface border border-a-border rounded-xl p-8 relative z-10 shadow-xl shadow-black/8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-a-accent to-a-accent-2 flex items-center justify-center mx-auto mb-4 text-white">
            <FlaskConical size={28} />
          </div>
          <h1 className="text-2xl font-bold text-a-text">SRL Admin</h1>
          <p className="text-sm text-a-text-s mt-1">Student Research Lab Control Panel</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="px-4 py-3 bg-a-danger/10 border border-a-danger/20 rounded-lg text-a-danger text-sm flex items-center gap-2">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-email" className="text-xs font-medium text-a-text-s">Email</label>
            <div className="relative flex items-center">
              <Mail size={18} className="absolute left-3.5 text-a-text-m pointer-events-none" />
              <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@srl.edu" required autoFocus
                className="w-full py-3 pl-11 pr-4 bg-a-bg border border-a-border rounded-lg text-a-text text-sm outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-password" className="text-xs font-medium text-a-text-s">Password</label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-3.5 text-a-text-m pointer-events-none" />
              <input id="admin-password" type={showPassword ? 'text' : 'password'} value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                className="w-full py-3 pl-11 pr-11 bg-a-bg border border-a-border rounded-lg text-a-text text-sm outline-none focus:border-a-accent focus:ring-2 focus:ring-a-accent/15 transition-colors placeholder:text-a-text-m" />
              <button type="button" className="absolute right-3 text-a-text-m hover:text-a-text-s transition-colors flex"
                onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-a-accent to-a-accent-2 rounded-lg text-white font-semibold text-sm cursor-pointer transition-all hover:shadow-lg hover:shadow-a-accent/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]">
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-a-text-m text-xs">Authorized personnel only</p>
        </div>
      </div>
    </div>
  );
}
