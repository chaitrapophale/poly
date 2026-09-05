import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { VoiceSphere } from '../components/VoiceSphere';
import { TranscriptTurn } from '../components/TranscriptTurn';
import { Modal } from '../components/Modal';
import { CallerState, TranscriptTurnItem } from '../types';
import { agoraService } from '../lib/agoraService';

export default function ActiveCallPage() {
  const navigate = useNavigate();
  const [callState, setCallState] = useState<CallerState>('connecting');
  const [seconds, setSeconds] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [referenceInput, setReferenceInput] = useState('4281');
  const [agoraMessage, setAgoraMessage] = useState<string | null>(null);
  const [sessionId] = useState<string>('session-8042');
  const [activeLanguage, setActiveLanguage] = useState<string>('Hindi + English');
  const [transcript, setTranscript] = useState<TranscriptTurnItem[]>([
    {
      id: 'turn-1',
      speaker: 'poly',
      name: 'POLY Assistant',
      timestamp: '00:05',
      originalText: 'Namaste! Welcome to Poly Support. How can I help you with your account today?',
      translatedText: 'Namaste! Welcome to Poly Support. How can I help you with your account today?'
    }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Initialize Agora & Backend Agent Session
  useEffect(() => {
    let isMounted = true;

    // Initialize backend agent session
    fetch('http://localhost:8000/api/v1/agent/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId })
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.transcript) {
          setTranscript(data.transcript);
        }
      })
      .catch((err) => console.warn('Could not initialize backend session:', err));

    // Initialize Agora RTC
    agoraService.startSession('poly-session-8042', {
      onStateChange: (state) => {
        if (isMounted) {
          if (state === 'connecting') setCallState('connecting');
          else if (state === 'connected') setCallState('connected');
          else if (state === 'listening') setCallState('listening');
          else if (state === 'ended') setCallState('ended');
        }
      },
      onError: (msg) => {
        if (isMounted) setAgoraMessage(msg);
      }
    });

    const timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);

    return () => {
      isMounted = false;
      clearInterval(timer);
      agoraService.stopSession();
    };
  }, [sessionId]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Send turn to FastAPI Poly Agent
  const handleSendTurn = async (text: string) => {
    if (!text.trim() || isProcessing) return;
    setIsProcessing(true);
    setCallState('thinking');

    try {
      const res = await fetch('http://localhost:8000/api/v1/agent/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, input_text: text })
      });

      if (!res.ok) throw new Error('Agent API failed');
      const data = await res.json();

      if (data.transcript) {
        setTranscript(data.transcript);
      }
      if (data.state?.active_language) {
        setActiveLanguage(data.state.active_language);
      }

      if (data.action === 'ESCALATE' || data.state?.escalation_required) {
        setCallState('escalating');
        setTimeout(() => navigate('/escalation'), 1200);
      } else if (data.action === 'CONFIRM') {
        setCallState('speaking');
        setTimeout(() => setShowConfirmModal(true), 800);
      } else {
        setCallState('speaking');
        setTimeout(() => setCallState('listening'), 2000);
      }
    } catch (err) {
      console.warn('Backend interact error, simulating locally:', err);
      // Fallback turn handling
      setCallState('listening');
    } finally {
      setIsProcessing(false);
      setUserInput('');
    }
  };

  const handleEscalate = async () => {
    setCallState('escalating');
    await agoraService.stopSession();
    setTimeout(() => navigate('/escalation'), 800);
  };

  const handleEndCall = async () => {
    await agoraService.stopSession();
    navigate('/');
  };

  const handleConfirmDetail = (isCorrect: boolean) => {
    setShowConfirmModal(false);
    if (!isCorrect) {
      handleSendTurn("Actually the reference number is conflicting, 4289.");
    } else {
      handleSendTurn("Yes, 4281 is correct.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Header showBack backHref="/before-call" title="Live Voice Session" activeLanguage={activeLanguage} />

      <main className="flex-1 flex flex-col relative w-full pt-20 pb-28 px-4 md:px-12 max-w-2xl mx-auto">
        <div className="flex flex-col w-full">
          {/* Status Bar */}
          <div className="w-full bg-surface-container-low rounded-2xl p-3 md:p-4 shadow-sm flex items-center justify-between border border-surface-container-high mb-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0"></span>
              <span className="font-label-lg text-label-lg text-primary uppercase font-bold tracking-wide">
                Agora RTC + Poly Agent Live
              </span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">•</span>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                {formatTimer(seconds)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-surface-container-highest px-3 py-1 rounded-full shrink-0 shadow-xs border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-[16px]">translate</span>
              <span className="font-label-md text-label-md text-on-surface font-medium">
                {activeLanguage}
              </span>
            </div>
          </div>

          {agoraMessage && (
            <div className="mb-4 p-3 bg-surface-container-low border border-primary/30 rounded-2xl flex items-center gap-2 text-xs text-primary font-medium">
              <span className="material-symbols-outlined text-[18px]">info</span>
              <span>{agoraMessage} (Agora WebRTC active in local testing mode)</span>
            </div>
          )}

          {/* Quick Scenario Preset Buttons */}
          <div className="mb-4 p-3 bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-xs space-y-2">
            <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider block">
              Speak or Trigger Poly Agent Scenarios:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleSendTurn("Mera account login nahi ho raha.")}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
              >
                1. "Mera account login nahi ho raha" (Hindi)
              </button>
              <button
                type="button"
                onClick={() => handleSendTurn("I already tried resetting the password.")}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
              >
                2. "I already tried resetting password" (Hinglish)
              </button>
              <button
                type="button"
                onClick={() => handleSendTurn("My reference number is 4281... or wait, 4289?")}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container text-tertiary hover:bg-surface-container-high transition-colors"
              >
                3. Trigger Conflict / Clarification
              </button>
              <button
                type="button"
                onClick={() => handleSendTurn("Can you prescribe me medicine for my headache?")}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed-variant hover:bg-tertiary-fixed-dim transition-colors"
              >
                4. Safety Boundary Test (Medical)
              </button>
            </div>
          </div>

          {/* Core VoiceSphere Ambient Visualizer */}
          <VoiceSphere
            state={callState}
            promptText={
              callState === 'speaking'
                ? 'Poly is responding in your language...'
                : callState === 'thinking'
                ? 'Poly Agent is reasoning...'
                : 'Speak naturally in Hindi, English, or Hinglish.'
            }
          />

          {/* Live Speech/Text Input Box */}
          <div className="my-3 flex gap-2">
            <input
              type="text"
              placeholder="Speak or type your response to Poly..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendTurn(userInput)}
              className="flex-1 px-4 py-2.5 rounded-full border border-surface-container-high bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
            />
            <button
              type="button"
              onClick={() => handleSendTurn(userInput)}
              disabled={isProcessing || !userInput.trim()}
              className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container disabled:opacity-50 transition-colors shadow-xs"
            >
              Send
            </button>
          </div>

          {/* Live Transcript Stream */}
          <div className="w-full flex flex-col gap-2 mt-2 mb-6">
            <div className="flex items-center justify-between px-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Live Real-Time Transcript ({transcript.length} Turns)
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {activeLanguage}
              </span>
            </div>

            <div className="flex flex-col gap-1 max-h-[350px] overflow-y-auto pr-1">
              {transcript.map((turn, idx) => (
                <TranscriptTurn key={turn.id || idx} item={turn} />
              ))}
            </div>
          </div>

          {/* Primary Action Controls */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-md border-t border-surface-container-high flex items-center justify-center gap-4 z-40">
            <button
              type="button"
              onClick={() => setCallState(callState === 'listening' ? 'speaking' : 'listening')}
              className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest transition-colors shadow-sm"
              title="Mute / Unmute"
            >
              <span className="material-symbols-outlined text-[22px]">mic</span>
            </button>

            <button
              type="button"
              onClick={handleEscalate}
              className="px-5 py-3 rounded-full bg-tertiary text-on-tertiary font-title-md text-title-md text-sm flex items-center gap-2 hover:bg-tertiary-container transition-colors shadow-md font-semibold"
            >
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
              <span>Request Human Agent</span>
            </button>

            <button
              type="button"
              onClick={handleEndCall}
              className="w-12 h-12 rounded-full bg-error text-on-error flex items-center justify-center hover:bg-error-container hover:text-on-error-container transition-colors shadow-sm"
              title="End Call"
            >
              <span className="material-symbols-outlined text-[22px]">call_end</span>
            </button>
          </div>
        </div>
      </main>

      {/* Critical Detail Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Reference Details"
      >
        <div className="space-y-4">
          <div className="p-3 bg-secondary-fixed/30 rounded-xl border border-secondary-fixed-dim/60">
            <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider block mb-1">
              POLY Assistant Verification
            </span>
            <p className="font-body-md text-body-md text-on-surface">
              &quot;I heard your reference number as <strong className="text-primary font-bold">4281</strong>. Is that correct?&quot;
            </p>
          </div>

          <div className="space-y-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold block">
              Reference Number
            </label>
            <input
              type="text"
              value={referenceInput}
              onChange={(e) => setReferenceInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleConfirmDetail(false)}
              className="w-1/2 py-2.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-semibold text-sm hover:bg-tertiary-fixed-dim transition-colors"
            >
              No, Conflicting / Uncertain
            </button>
            <button
              type="button"
              onClick={() => handleConfirmDetail(true)}
              className="w-1/2 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-colors shadow-sm"
            >
              ✓ Yes, Confirm 4281
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
