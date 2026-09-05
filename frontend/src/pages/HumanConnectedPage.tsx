import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { TranscriptTurn } from '../components/TranscriptTurn';
import { TranscriptTurnItem } from '../types';
import { agoraService } from '../lib/agoraService';

export default function HumanConnectedPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(165);
  const [activeLanguage] = useState('Hindi + English');
  const [transcript, setTranscript] = useState<TranscriptTurnItem[]>([
    {
      id: 't-1',
      speaker: 'caller',
      name: 'Aarav Patel',
      timestamp: '00:08',
      originalText: 'Mera account login nahi ho raha and password reset tried.',
      translatedText: 'Mera account login nahi ho raha and password reset tried.'
    },
    {
      id: 't-2',
      speaker: 'poly',
      name: 'POLY Assistant',
      timestamp: '00:15',
      originalText: 'I can help. Can you confirm your customer ID?',
      translatedText: 'I can help. Can you confirm your customer ID?'
    },
    {
      id: 't-3',
      speaker: 'caller',
      name: 'Aarav Patel',
      timestamp: '00:24',
      originalText: 'Customer ID is 4281.',
      translatedText: 'Customer ID is 4281.'
    },
    {
      id: 't-4',
      speaker: 'poly',
      name: 'POLY Assistant',
      timestamp: '00:58',
      originalText: "I don't want to record incorrect info. Connecting you with a human support specialist now.",
      translatedText: "I don't want to record incorrect info. Connecting you with a human support specialist now."
    },
    {
      id: 't-5',
      speaker: 'agent',
      name: 'Priya Sharma (Human Specialist)',
      timestamp: '02:45',
      originalText: 'Namaste Aarav! I see your confirmed Customer ID 4281 and the reference number conflict. Let me resolve this right away.',
      translatedText: 'Namaste Aarav! I see your confirmed Customer ID 4281 and the reference number conflict. Let me resolve this right away.'
    }
  ]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Join Human Handoff Agora Channel
    agoraService.startSession('poly-session-8042');

    const timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendTurn = () => {
    if (!userInput.trim()) return;
    const newTurn: TranscriptTurnItem = {
      id: `t-${Date.now()}`,
      speaker: 'caller',
      name: 'Aarav Patel',
      timestamp: formatTimer(seconds),
      originalText: userInput,
      translatedText: userInput
    };
    setTranscript((prev) => [...prev, newTurn]);
    setUserInput('');
  };

  const handleEndCall = async () => {
    await agoraService.stopSession();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface font-body">
      <Header showBack backHref="/escalation" title="Human Specialist Connected" activeLanguage={activeLanguage} />

      <main className="flex-1 flex flex-col relative w-full pt-20 pb-28 px-4 md:px-12 max-w-2xl mx-auto">
        <div className="flex flex-col w-full space-y-4">
          
          {/* Active Human Connection Banner */}
          <div className="w-full bg-secondary-container/40 p-4 rounded-2xl border border-secondary/30 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm">
                PS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                  <h2 className="font-title-sm text-title-sm font-bold text-on-surface">Priya Sharma</h2>
                  <span className="text-xs bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded-full font-semibold">
                    Human Specialist
                  </span>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">APAC-Central • Live Agora WebRTC</span>
              </div>
            </div>

            <span className="font-label-lg text-label-lg font-bold text-secondary">
              {formatTimer(seconds)}
            </span>
          </div>

          {/* Context Transferred Summary Box */}
          <div className="p-3.5 bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">
                ✓ Context Transferred to Specialist
              </span>
              <span className="text-xs text-outline font-medium">No need to repeat details</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 bg-surface-container rounded-lg font-semibold text-on-surface">
                ✓ Customer ID: 4281
              </span>
              <span className="px-2.5 py-1 bg-tertiary-fixed/40 text-on-tertiary-fixed-variant rounded-lg font-semibold">
                ⚠ Reference Conflict: 4281 / 4289
              </span>
            </div>
          </div>

          {/* Real-time Human + Caller Transcript */}
          <div className="flex-1 flex flex-col gap-2 mt-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold px-1">
              Live Real-Time Transcript ({transcript.length} Turns)
            </span>

            <div className="flex flex-col gap-1 max-h-[360px] overflow-y-auto pr-1">
              {transcript.map((turn, idx) => (
                <TranscriptTurn key={turn.id || idx} item={turn} />
              ))}
            </div>
          </div>

          {/* Speak / Message Box */}
          <div className="my-2 flex gap-2">
            <input
              type="text"
              placeholder="Speak or type to Specialist Priya..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendTurn()}
              className="flex-1 px-4 py-2.5 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 font-medium"
            />
            <button
              type="button"
              onClick={handleSendTurn}
              className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary font-semibold text-sm hover:bg-secondary-container transition-colors shadow-xs"
            >
              Send
            </button>
          </div>

          {/* Call Actions Bar */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-md border-t border-surface-container-high flex items-center justify-center gap-4 z-40">
            <button
              type="button"
              onClick={handleEndCall}
              className="px-6 py-3 rounded-full bg-error text-on-error font-bold text-sm flex items-center gap-2 hover:bg-error-container hover:text-on-error-container transition-colors shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">call_end</span>
              <span>End Call with Specialist</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
