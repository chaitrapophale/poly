'use client';

import React from 'react';

interface LanguageBadgeProps {
  languages?: string;
  subtext?: string;
}

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  languages = 'Hindi + English',
  subtext = 'Hinglish continuous auto-sync engaged'
}) => {
  return (
    <div className="space-y-1.5">
      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
        Language Pipeline
      </span>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          Hindi (Primary)
        </span>
        <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary-container"></span>
          English (Indian)
        </span>
      </div>
      {subtext && (
        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm pt-0.5">
          <span className="material-symbols-outlined text-[14px] text-secondary">sync_alt</span>
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
};
