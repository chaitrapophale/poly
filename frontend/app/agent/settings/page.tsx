'use client';

import React from 'react';
import { Sidebar } from '../../../components/Sidebar';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-surface font-body antialiased">
      <Sidebar />
      <div className="pl-64 md:pl-72 flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface/80 backdrop-blur-xl border-b border-surface-container-high px-6 flex items-center justify-between sticky top-0 z-40">
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Settings & Agent Configuration
          </h1>
        </header>
        <main className="p-6 md:p-8 max-w-4xl mx-auto w-full space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-xs space-y-6">
            <div>
              <h2 className="font-title-md text-title-md font-bold text-on-surface">
                Agora RTC & Node Routing Configuration
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Configure your real-time voice channel edge nodes and fallback settings.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-container-high flex items-center justify-between">
                <div>
                  <p className="font-semibold text-on-surface">Agora Edge Region</p>
                  <p className="text-xs text-on-surface-variant">APAC-Central (Mumbai Edge Node)</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
                  Active
                </span>
              </div>

              <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-container-high flex items-center justify-between">
                <div>
                  <p className="font-semibold text-on-surface">Auto-Handoff Notification Sound</p>
                  <p className="text-xs text-on-surface-variant">Play priority audio alert on incoming escalation</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
