import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { ContextSummary } from '../../components/ContextSummary';
import { TranscriptTurn } from '../../components/TranscriptTurn';
import { TranscriptTurnItem } from '../../types';
import { agoraService } from '../../lib/agoraService';
import { API_BASE_URL } from '../../lib/apiConfig';

export default function AgentEscalationDetailPage() {
  const { id: caseId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [agoraConnected, setAgoraConnected] = useState(false);
  const [agentMicMuted, setAgentMicMuted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptTurnItem[]>([
    {
      id: 't-1',
      speaker: 'poly',
      speaker_name: 'POLY Assistant',
      timestamp_offset: '00:05',
      originalText: 'Namaste! Welcome to Poly Support. How can I help you today?',
      translatedText: 'Namaste! Welcome to Poly Support. How can I help you today?'
    },
    {
      id: 't-2',
      speaker: 'caller',
      speaker_name: 'Aarav Patel (Caller)',
      timestamp_offset: '00:15',
      originalText: 'Mera account reset code work nahi kar raha. Ticket reference 4281 hai.',
      translatedText: 'My account reset code is not working. Ticket reference is 4281.'
    },
    {
      id: 't-3',
      speaker: 'poly',
      speaker_name: 'POLY Assistant',
      timestamp_offset: '00:20',
      originalText: 'I heard your reference number as 4281. Is that correct?',
      translatedText: 'I heard your reference number as 4281. Is that correct?'
    },
    {
      id: 't-4',
      speaker: 'caller',
      speaker_name: 'Aarav Patel (Caller)',
      timestamp_offset: '00:35',
      originalText: 'Wait, code 4289 par aaya tha text message mein, last month ka code 4281 tha.',
      translatedText: 'Wait, code 4289 came in text message, last month code was 4281.'
    },
    {
      id: 't-5',
      speaker: 'poly',
      speaker_name: 'POLY Assistant',
      timestamp_offset: '00:58',
      originalText: "I don't want to record incorrect info. Connecting you with a human support specialist now.",
      translatedText: "I don't want to record incorrect info. Connecting you with a human support specialist now."
    }
  ]);
  const [newTurnText, setNewTurnText] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/cases/${caseId}`)
      .then((res) => res.json())
      .then((data) => setCaseData(data))
      .catch((err) => console.warn('Using default case context:', err))
      .finally(() => setLoading(false));

    agoraService.startSession('poly-session-8042', {
      onStateChange: (st) => {
        if (st === 'connected' || st === 'listening') setAgoraConnected(true);
      }
    });

    return () => {
      agoraService.stopSession();
    };
  }, [caseId]);

  const handleAgentSendTurn = () => {
    if (!newTurnText.trim()) return;
    const newTurn: TranscriptTurnItem = {
      id: `t-${Date.now()}`,
      speaker: 'agent',
      speaker_name: 'Priya Sharma (Specialist)',
      timestamp: '02:46',
      originalText: newTurnText,
      translatedText: newTurnText
    };
    setTranscript((prev) => [...prev, newTurn]);
    setNewTurnText('');
  };

  const handleResolveCase = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/v1/cases/${caseId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: 'Resolved reference number ambiguity directly via human call.' })
      });
    } catch (e) {}
    await agoraService.stopSession();
    navigate('/agent/cases');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface font-body text-on-surface">
        Loading Handoff Workspace...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-surface font-body">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pl-64 md:pl-72">
        <Header showBack backHref="/agent/dashboard" title={`Live Handoff Workspace — ${caseData?.caseNumber || caseId}`} />

        <main className="flex-1 overflow-hidden pt-16 pb-4 px-4 md:px-6">
          <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Column 1: Caller & Live Call Status (3 cols) */}
            <div className="lg:col-span-3 bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg">
                    AP
                  </div>
                  <div>
                    <h2 className="font-title-md text-title-md font-bold text-on-surface">Aarav Patel</h2>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">+91 98*** **420</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-surface-container-low rounded-xl">
                    <span className="text-outline font-semibold">Language</span>
                    <span className="font-bold text-secondary">{caseData?.language || 'Hindi + English'}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-surface-container-low rounded-xl">
                    <span className="text-outline font-semibold">Location</span>
                    <span className="font-semibold text-on-surface">Mumbai, India</span>
                  </div>
                  <div className="flex justify-between p-2 bg-surface-container-low rounded-xl">
                    <span className="text-outline font-semibold">Call Duration</span>
                    <span className="font-bold text-primary">02:45s</span>
                  </div>
                  <div className="flex justify-between p-2 bg-surface-container-low rounded-xl">
                    <span className="text-outline font-semibold">Agora Status</span>
                    <span className="font-bold text-tertiary">
                      {agoraConnected ? '✓ RTC Live' : 'Connecting...'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-tertiary-fixed/30 rounded-xl border border-tertiary-fixed-dim">
                  <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider block mb-1">
                    Escalation Trigger
                  </span>
                  <p className="text-xs text-on-surface font-medium">
                    {caseData?.escalationReason || 'Conflicting reference details (4281 vs 4289)'}
                  </p>
                </div>
              </div>

              {/* Call Controls */}
              <div className="pt-4 border-t border-surface-container space-y-2">
                <button
                  type="button"
                  onClick={() => setAgentMicMuted(!agentMicMuted)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors ${
                    agentMicMuted
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {agentMicMuted ? 'mic_off' : 'mic'}
                  </span>
                  <span>{agentMicMuted ? 'Unmute Mic' : 'Mute Mic'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResolveCase}
                  className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Complete & Resolve Case</span>
                </button>
              </div>
            </div>

            {/* Column 2: Live Transcript & Specialist Speaking Box (5 cols) */}
            <div className="lg:col-span-5 bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <h3 className="font-title-sm text-title-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">forum</span>
                  <span>Live Call Transcript</span>
                </h3>
                <span className="text-xs font-semibold text-secondary bg-secondary-container/40 px-2.5 py-1 rounded-full">
                  Real-time Stream
                </span>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
                {transcript.map((turn, idx) => (
                  <TranscriptTurn key={turn.id || idx} item={turn} />
                ))}
              </div>

              {/* Specialist Speak / Text Box */}
              <div className="pt-3 border-t border-surface-container-high flex gap-2">
                <input
                  type="text"
                  placeholder="Type message or speak directly into Agora..."
                  value={newTurnText}
                  onChange={(e) => setNewTurnText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAgentSendTurn()}
                  className="flex-1 px-3 py-2 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                />
                <button
                  type="button"
                  onClick={handleAgentSendTurn}
                  className="px-4 py-2 bg-secondary text-on-secondary rounded-xl text-xs font-bold hover:bg-secondary-container transition-colors"
                >
                  Speak
                </button>
              </div>
            </div>

            {/* Column 3: AI Handoff Context Package (4 cols) */}
            <div className="lg:col-span-4 bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high overflow-y-auto">
              <ContextSummary
                summary={caseData?.summary || 'Caller reported login failure after attempting password reset. Customer ID 4281 was confirmed. Reference number was stated inconsistently (4281 vs 4289).'}
                confirmedInfo={caseData?.confirmedInfo || [{ key: 'customer_id', label: 'Customer ID', value: '4281', status: 'confirmed' }]}
                uncertainInfo={caseData?.uncertainInfo || [{ key: 'reference_number', label: 'Reference Number', value: '4281 / 4289', status: 'uncertain', notes: 'Conflict detected' }]}
                missingInfo={caseData?.missingInfo || ['Final reference confirmation']}
              />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
