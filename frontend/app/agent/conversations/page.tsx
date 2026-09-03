'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '../../../components/Sidebar';
import { mockCases } from '../../../lib/mockData';

export default function ConversationsPage() {
  return (
    <div className="flex min-h-screen bg-surface font-body antialiased">
      <Sidebar />
      <div className="pl-64 md:pl-72 flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface/80 backdrop-blur-xl border-b border-surface-container-high px-6 flex items-center justify-between sticky top-0 z-40">
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Conversations Log
          </h1>
        </header>
        <main className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-xs space-y-4">
            <h2 className="font-title-md text-title-md font-bold text-on-surface">
              Historical Voice Conversations
            </h2>
            <div className="space-y-3">
              {mockCases.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-center justify-between hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                      {c.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface">{c.customerName} ({c.caseNumber})</p>
                      <p className="text-xs text-on-surface-variant">{c.issueCategory} · {c.language}</p>
                    </div>
                  </div>
                  <Link
                    href={`/agent/cases/${c.id}`}
                    className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold border border-primary/30 hover:bg-surface-container transition-colors"
                  >
                    View Transcript
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
