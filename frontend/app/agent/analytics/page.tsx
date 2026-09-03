'use client';

import React from 'react';
import { Sidebar } from '../../../components/Sidebar';

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-surface font-body antialiased">
      <Sidebar />
      <div className="pl-64 md:pl-72 flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface/80 backdrop-blur-xl border-b border-surface-container-high px-6 flex items-center justify-between sticky top-0 z-40">
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Performance Analytics
          </h1>
        </header>
        <main className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Total Conversations</span>
              <p className="text-3xl font-bold text-on-surface mt-2">1,248</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">AI Resolution Rate</span>
              <p className="text-3xl font-bold text-primary mt-2">82.4%</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Human Escalation Rate</span>
              <p className="text-3xl font-bold text-tertiary mt-2">17.6%</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-4">
            <h2 className="font-title-md text-title-md font-bold text-on-surface">
              Language Distribution & Escalation Reasons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-low rounded-2xl space-y-2">
                <span className="font-label-lg text-label-lg font-semibold text-on-surface">Language Breakdown</span>
                <div className="space-y-1 text-sm text-on-surface-variant">
                  <div className="flex justify-between"><span>Hindi + English (Hinglish):</span><span className="font-bold">64%</span></div>
                  <div className="flex justify-between"><span>Pure English:</span><span className="font-bold">22%</span></div>
                  <div className="flex justify-between"><span>Pure Hindi:</span><span className="font-bold">14%</span></div>
                </div>
              </div>

              <div className="p-4 bg-surface-container-low rounded-2xl space-y-2">
                <span className="font-label-lg text-label-lg font-semibold text-on-surface">Top Escalation Drivers</span>
                <div className="space-y-1 text-sm text-on-surface-variant">
                  <div className="flex justify-between"><span>Conflicting Reference Number:</span><span className="font-bold">42%</span></div>
                  <div className="flex justify-between"><span>Explicit Human Request:</span><span className="font-bold">35%</span></div>
                  <div className="flex justify-between"><span>Unclear Background Audio:</span><span className="font-bold">23%</span></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
