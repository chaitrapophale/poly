'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';

export default function EscalationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 1500);
    const timer2 = setTimeout(() => setStep(3), 3000);
    const timer3 = setTimeout(() => router.push('/human-connected'), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Header title="Connecting Specialist" />

      <main className="flex-1 flex flex-col items-center justify-center relative w-full pt-20 pb-24 px-4 max-w-lg mx-auto text-center">
        <div className="w-full bg-surface-container-lowest p-8 rounded-3xl border border-tertiary-fixed-dim/60 shadow-md space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-tertiary-fixed/30 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10"></div>

          {/* Animated Spinner Icon */}
          <div className="w-20 h-20 rounded-full bg-tertiary-fixed/40 text-tertiary flex items-center justify-center mx-auto relative shadow-inner">
            <span className="material-symbols-outlined text-[36px] animate-spin">sync</span>
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold uppercase tracking-wider">
              Priority Human Escalation
            </span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Connecting You to a Specialist
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">
              &quot;I don&apos;t want to record the wrong reference number. Connecting you with a support specialist and sharing your context.&quot;
            </p>
          </div>

          {/* Progress Timeline Steps */}
          <div className="space-y-3 pt-2 text-left">
            <div
              className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                step >= 1
                  ? 'bg-surface-container-low border-primary/40 text-on-surface'
                  : 'bg-surface-container-low/40 border-transparent opacity-40'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </div>
              <div>
                <p className="font-label-lg text-label-lg font-semibold text-on-surface">
                  Created Support Ticket #POLY-1024
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Escalation Reason: Reference number ambiguity (4281 vs 4289)
                </p>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                step >= 2
                  ? 'bg-surface-container-low border-secondary/40 text-on-surface'
                  : 'bg-surface-container-low/40 border-transparent opacity-40'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold shrink-0">
                {step >= 2 ? '✓' : '2'}
              </div>
              <div>
                <p className="font-label-lg text-label-lg font-semibold text-on-surface">
                  Transferring Context Summary
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Confirmed: Account Access · Hindi + English dialogue
                </p>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                step >= 3
                  ? 'bg-surface-container-low border-tertiary/40 text-on-surface'
                  : 'bg-surface-container-low/40 border-transparent opacity-40'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-xs font-bold shrink-0">
                {step >= 3 ? '✓' : '3'}
              </div>
              <div>
                <p className="font-label-lg text-label-lg font-semibold text-on-surface">
                  Routing to Available Agent (Priya Sharma)
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Agora WebRTC Voice Channel ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
