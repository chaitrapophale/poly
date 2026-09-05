import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  pendingEscalationsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ pendingEscalationsCount = 3 }) => {
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Overview', icon: 'dashboard', path: '/agent/dashboard' },
    {
      label: 'Live Escalations',
      icon: 'warning',
      path: '/agent/dashboard#escalations',
      badge: pendingEscalationsCount
    },
    { label: 'Cases', icon: 'folder_open', path: '/agent/cases' },
    { label: 'Conversations', icon: 'chat', path: '/agent/conversations' },
    { label: 'Analytics', icon: 'insights', path: '/agent/analytics' },
    { label: 'Settings', icon: 'settings', path: '/agent/settings' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 md:w-72 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(84,75,69,0.04)]">
      <div className="flex flex-col">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-surface-container-high/40">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-lg shadow-sm">
            P
          </div>
          <span className="font-title-md text-title-md text-on-surface font-semibold tracking-tight">
            Poly Support Portal
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-4 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/agent/dashboard' && pathname.startsWith(item.path.split('#')[0]));

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="font-label-lg text-label-lg">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-semibold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 m-4 rounded-xl bg-surface-container-high shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold shrink-0">
              PS
            </div>
            <div className="min-w-0">
              <p className="font-label-lg text-label-lg text-on-surface truncate font-semibold">
                Priya Sharma
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                Support Specialist
              </p>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" title="Online"></span>
        </div>
        <div className="mt-2 pt-2 border-t border-surface-container-highest/60 flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Status</span>
          <span className="font-label-sm text-label-sm text-primary font-medium">Online & Available</span>
        </div>
      </div>
    </aside>
  );
};
