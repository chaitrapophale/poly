'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  showBack?: boolean;
  backHref?: string;
  title?: string;
  activeLanguage?: string;
  isConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showBack = false,
  backHref = '/',
  title,
  activeLanguage = 'Hindi + English',
  isConnected = true
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
      <div className="h-16 px-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <Link
              href={backHref}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
          )}

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-lg shadow-sm">
              P
            </div>
            <span className="font-bold text-xl tracking-tight text-on-surface">POLY</span>
          </Link>

          {title && (
            <span className="font-title-md text-title-md text-on-surface truncate ml-2 hidden sm:inline-block">
              {title}
            </span>
          )}

          {!title && isConnected && (
            <div className="flex items-center gap-1.5 ml-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Connected
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="min-h-[38px] px-3.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant flex items-center gap-1.5 hover:bg-surface-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">translate</span>
            <span className="font-label-sm text-label-sm font-medium">{activeLanguage}</span>
          </button>

          <Link
            href="/agent/login"
            className="h-9 px-3 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1.5 hover:bg-primary-container transition-colors shadow-sm"
            title="Agent Support Portal"
          >
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            <span className="hidden sm:inline font-semibold">Agent Portal</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
