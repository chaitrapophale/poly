import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  showBack?: boolean;
  backHref?: string;
  title?: string;
  activeLanguage?: string;
  isConnected?: boolean;
  isLandingPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showBack = false,
  backHref = '/',
  title,
  activeLanguage = 'Hindi + English',
  isConnected = true,
  isLandingPage = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFF8F5]/90 backdrop-blur-md border-b border-[#BFC9D0]/30 transition-all">
      <div className="max-w-7xl mx-auto h-20 px-6 md:px-12 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          {showBack && (
            <Link
              to={backHref}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#263845] hover:bg-[#BFC9D0]/20 transition-colors"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
          )}

          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/poly-icon.svg"
              alt="POLY Logo"
              className="w-9 h-9 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-[#263845] font-jakarta leading-none">
                POLY
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#69577E] uppercase mt-0.5">
                Voice AI
              </span>
            </div>
          </Link>

          {title && (
            <span className="font-semibold text-sm text-[#263845] truncate ml-3 hidden sm:inline-block border-l border-[#BFC9D0]/40 pl-3">
              {title}
            </span>
          )}
        </div>

        {/* Center: Navigation Links (Landing Page) */}
        {isLandingPage ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#263845]">
            <a href="#how-it-works" className="hover:text-[#38607A] transition-colors">
              How it works
            </a>
            <a href="#for-callers" className="hover:text-[#38607A] transition-colors">
              For callers
            </a>
            <a href="#for-support-teams" className="hover:text-[#38607A] transition-colors">
              For support teams
            </a>
            <a href="#safety" className="hover:text-[#38607A] transition-colors">
              Safety
            </a>
          </nav>
        ) : (
          !title && isConnected && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#38607A]/10 border border-[#38607A]/20">
              <span className="w-2 h-2 rounded-full bg-[#38607A] animate-ping"></span>
              <span className="text-xs font-semibold text-[#38607A]">
                Agora Real-Time Ready
              </span>
            </div>
          )
        )}

        {/* Right: CTAs */}
        <div className="flex items-center gap-3">
          {isLandingPage ? (
            <>
              <Link
                to="/agent/cases"
                className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-[#263845] bg-transparent hover:bg-[#BFC9D0]/20 rounded-full transition-colors border border-[#BFC9D0]/50"
              >
                Agent Login
              </Link>
              <Link
                to="/before-call"
                className="px-5 py-2.5 text-xs font-bold text-[#FFF8F5] bg-[#38607A] hover:bg-[#263845] rounded-full transition-all shadow-sm hover:shadow flex items-center gap-2"
              >
                <span>Start a Call</span>
                <span className="material-symbols-outlined text-[16px]">call</span>
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-full bg-[#38607A]/10 text-[#38607A] text-xs font-semibold flex items-center gap-1.5 border border-[#38607A]/20"
              >
                <span className="material-symbols-outlined text-[16px]">translate</span>
                <span>{activeLanguage}</span>
              </button>
              <Link
                to="/agent/cases"
                className="px-4 py-2 rounded-full bg-[#38607A] text-[#FFF8F5] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#263845] transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                <span className="hidden sm:inline">Agent Portal</span>
              </Link>
            </>
          )}

          {/* Mobile menu toggle button */}
          {isLandingPage && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#263845] hover:bg-[#BFC9D0]/20 rounded-lg"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {isLandingPage && mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF8F5] border-b border-[#BFC9D0]/40 px-6 py-6 flex flex-col gap-4 text-sm font-semibold text-[#263845] shadow-lg animate-fadeIn">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#BFC9D0]/20"
          >
            How it works
          </a>
          <a
            href="#for-callers"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#BFC9D0]/20"
          >
            For callers
          </a>
          <a
            href="#for-support-teams"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#BFC9D0]/20"
          >
            For support teams
          </a>
          <a
            href="#safety"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-[#BFC9D0]/20"
          >
            Safety
          </a>
          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/agent/cases"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full border border-[#BFC9D0] text-[#263845]"
            >
              Agent Login
            </Link>
            <Link
              to="/before-call"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-[#38607A] text-[#FFF8F5] font-bold"
            >
              Start a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
