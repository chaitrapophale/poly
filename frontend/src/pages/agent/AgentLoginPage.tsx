import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AgentLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('priya.sharma@poly.support');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/agent/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-3xl border border-surface-container-high shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <img
              src="/poly-logo-3d.jpg"
              alt="POLY Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-sm"
            />
            <span className="font-bold text-2xl tracking-tight text-on-surface">POLY</span>
          </Link>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Support Agent Portal
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Sign in to access live escalations, real-time handoffs, and case management.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold block">
              Agent Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-surface-container-high bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-surface-container-high bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-primary text-on-primary font-title-md text-title-md font-semibold hover:bg-primary-container transition-colors shadow-md mt-2"
          >
            Sign In to Agent Portal
          </button>
        </form>

        <div className="pt-3 border-t border-surface-container-high text-center">
          <Link to="/" className="font-label-sm text-label-sm text-primary hover:underline font-semibold">
            ← Return to Caller Experience
          </Link>
        </div>
      </div>
    </div>
  );
}
