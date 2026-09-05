import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { EscalationCard } from '../../components/EscalationCard';
import { API_BASE_URL } from '../../lib/apiConfig';

export default function AgentDashboardPage() {
  const [escalations, setEscalations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEscalations = () => {
    fetch(`${API_BASE_URL}/api/v1/cases/live-escalations`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEscalations(data);
        } else {
          setEscalations([
            {
              id: 'esc-1024',
              caseId: 'POLY-1024',
              caseNumber: 'POLY-1024',
              customerName: 'Aarav Patel',
              priority: 'PRIORITY',
              waitingTime: '00:32',
              routingNode: 'APAC-Central (Mumbai Edge)',
              assignedAgent: 'Priya Sharma',
              status: 'PENDING',
              issue: 'Account Access & Authentication',
              language: 'Hindi + English',
              escalationReason: 'Conflicting critical reference details (4281 vs 4289)'
            }
          ]);
        }
      })
      .catch((err) => console.warn('Using fallback escalation queue:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEscalations();
    const interval = setInterval(fetchEscalations, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-surface font-body">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pl-64 md:pl-72">
        <Header title="Agent Live Escalations Queue" activeLanguage="Hindi + English" />

        <main className="flex-1 overflow-y-auto pt-20 pb-12 px-6 md:px-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-6">
            
            {/* Top Queue Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full bg-tertiary animate-ping"></span>
                  <h1 className="font-title-lg text-title-lg font-bold text-on-surface">
                    Live Escalations Queue
                  </h1>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Real-time Poly AI human handoff queue. Review AI context packages before taking over call.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-surface-container px-4 py-2 rounded-xl text-center border border-surface-container-high">
                  <span className="font-label-sm text-label-sm text-outline uppercase block font-semibold">Active Queue</span>
                  <span className="font-title-lg text-title-lg font-bold text-tertiary">{escalations.length}</span>
                </div>
                <div className="bg-surface-container px-4 py-2 rounded-xl text-center border border-surface-container-high">
                  <span className="font-label-sm text-label-sm text-outline uppercase block font-semibold">Avg Wait</span>
                  <span className="font-title-lg text-title-lg font-bold text-primary">00:35s</span>
                </div>
              </div>
            </div>

            {/* Escalation Cards Grid */}
            <div className="space-y-4">
              <h2 className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">priority_high</span>
                <span>Pending Handoff Requests ({escalations.length})</span>
              </h2>

              {loading ? (
                <div className="p-8 text-center text-on-surface-variant font-medium bg-surface-container-low rounded-2xl">
                  Loading live escalations...
                </div>
              ) : escalations.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant font-medium bg-surface-container-low rounded-2xl border border-surface-container">
                  ✓ Queue is clear. No pending human escalations at this time.
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {escalations.map((esc) => (
                    <EscalationCard
                      key={esc.id}
                      escalation={esc}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
