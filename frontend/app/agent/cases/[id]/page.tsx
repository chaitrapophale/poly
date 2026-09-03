'use client';

import React, { useState, useEffect, use } from 'react';
import { Header } from '../../../../components/Header';
import { Sidebar } from '../../../../components/Sidebar';
import { ContextSummary } from '../../../../components/ContextSummary';
import { StatusBadge } from '../../../../components/StatusBadge';

export default function CaseAuditTimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const caseId = resolvedParams.id;
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/cases/${caseId}`)
      .then((res) => res.json())
      .then((data) => setCaseData(data))
      .catch((err) => console.warn('Using default case detail:', err))
      .finally(() => setLoading(false));
  }, [caseId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface font-body text-on-surface">
        Loading Audit Timeline...
      </div>
    );
  }

  const events = caseData?.auditEvents || [
    { time: '00:00', title: 'Caller Session Started', desc: 'Connected via Agora RTC APAC-Central node' },
    { time: '00:12', title: 'Multilingual Intent Detected', desc: 'Language set to Hindi + English' },
    { time: '00:32', title: 'Information Confirmed', desc: 'Customer ID confirmed as 4281' },
    { time: '00:45', title: 'Information Conflict Detected', desc: 'Reference number stated as 4281 then 4289' },
    { time: '00:58', title: 'Escalation Triggered', desc: 'Unresolved critical information threshold reached' },
    { time: '01:00', title: 'Case Created', desc: 'Ticket POLY-1024 created in database' },
    { time: '02:45', title: 'Human Specialist Joined', desc: 'Specialist Priya Sharma accepted handoff in Agora' }
  ];

  return (
    <div className="flex h-screen bg-surface font-body">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pl-64 md:pl-72">
        <Header showBack backHref="/agent/cases" title={`Audit Timeline — ${caseData?.caseNumber || caseId}`} />

        <main className="flex-1 overflow-y-auto pt-20 pb-12 px-6 md:px-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Case Summary & Metadata (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-title-lg text-title-lg font-bold text-primary">
                    {caseData?.caseNumber || 'POLY-1024'}
                  </span>
                  <StatusBadge status={caseData?.status || 'WAITING_FOR_HUMAN'} />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2.5 bg-surface-container-low rounded-xl">
                    <span className="text-outline font-semibold">Customer</span>
                    <span className="font-bold text-on-surface">Aarav Patel</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-surface-container-low rounded-xl">
                    <span className="text-outline font-semibold">Language</span>
                    <span className="font-bold text-secondary">{caseData?.language || 'Hindi + English'}</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-surface-container-low rounded-xl">
                    <span className="text-outline font-semibold">Issue Category</span>
                    <span className="font-semibold text-on-surface">{caseData?.issueCategory || 'Account Access'}</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-surface-container-low rounded-xl">
                    <span className="text-outline font-semibold">Assigned Agent</span>
                    <span className="font-bold text-on-surface">{caseData?.assignedAgent || 'Priya Sharma'}</span>
                  </div>
                </div>
              </div>

              <ContextSummary
                summary={caseData?.summary || 'Caller reported login failure post password reset. Customer ID 4281 confirmed. Reference number 4281 vs 4289 conflicted.'}
                confirmedInfo={caseData?.confirmedInfo || [{ key: 'customer_id', label: 'Customer ID', value: '4281', status: 'confirmed' }]}
                uncertainInfo={caseData?.uncertainInfo || [{ key: 'reference_number', label: 'Reference Number', value: '4281 / 4289', status: 'uncertain', notes: 'Conflict' }]}
                missingInfo={['Security PIN verification']}
              />
            </div>

            {/* Right: Audit Timeline (7 cols) */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
              <h2 className="font-title-md text-title-md font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span>
                <span>Complete System Audit Timeline</span>
              </h2>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
                {events.map((evt: any, idx: number) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface border border-primary"></span>
                    <div className="flex-1 bg-surface-container-low p-3.5 rounded-xl border border-surface-container">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-title-sm text-title-sm font-bold text-on-surface">{evt.title}</h3>
                        <span className="text-[11px] font-bold text-outline bg-surface-container-highest px-2 py-0.5 rounded-full">{evt.time}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-medium">{evt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
