'use client';

import React from 'react';
import Link from 'next/link';
import { EscalationEvent } from '../types';

interface EscalationCardProps {
  escalation: EscalationEvent;
}

export const EscalationCard: React.FC<EscalationCardProps> = ({ escalation }) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-tertiary-fixed-dim/60 hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary-fixed/30 rounded-full blur-xl pointer-events-none -mr-6 -mt-6"></div>

      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary"></span>
          </span>
          <span className="font-label-sm text-label-sm font-bold text-tertiary uppercase tracking-wider">
            {escalation.priority} ESCALATION #{escalation.caseNumber}
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant font-medium">
          Waiting: {escalation.waitingTime}
        </span>
      </div>

      <div className="space-y-1 mb-4">
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
          {escalation.customerName}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-primary">label</span>
          <span>{escalation.issue}</span>
        </p>
      </div>

      <div className="p-3 bg-tertiary-fixed/20 rounded-xl mb-4 border border-tertiary-fixed-dim/40">
        <span className="font-label-sm text-label-sm font-semibold text-tertiary block mb-0.5">
          Escalation Trigger
        </span>
        <p className="font-body-md text-body-md text-on-surface leading-tight">
          {escalation.escalationReason}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[16px] text-secondary">translate</span>
          <span>{escalation.language}</span>
        </div>

        <Link
          href={`/agent/escalation/${escalation.caseId}`}
          className="px-4 py-2.5 rounded-full bg-tertiary text-on-tertiary font-title-md text-title-md text-sm flex items-center gap-2 hover:bg-tertiary-container transition-colors shadow-sm font-semibold"
        >
          <span>Accept Handoff</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};
