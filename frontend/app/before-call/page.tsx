'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';

export default function BeforeCallPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<'hinglish' | 'hindi' | 'english'>('hinglish');
  const [micTesting, setMicTesting] = useState(false);
  const [micGranted, setMicGranted] = useState(true);

  const handleTestMic = () => {
    setMicTesting(true);
    setTimeout(() => {
      setMicTesting(false);
      setMicGranted(true);
    }, 1500);
  };

  const handleStartCall = () => {
    router.push('/call');
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Header showBack backHref="/" title="Pre-Call Setup" />

      <main className="flex-1 flex flex-col relative w-full pt-20 pb-24 px-4 md:px-12 max-w-xl mx-auto">
        <div className="flex flex-col w-full space-y-6">
          {/* Header Card */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold border border-primary-fixed/40">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Step 1 of 2 · Audio & Language Setup</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Before We Begin
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
              Choose your preferred language style and check your microphone for clear communication.
            </p>
          </div>

          {/* Language Selection Card */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">translate</span>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                  Preferred Speaking Mode
                </h3>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Auto-detect enabled</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedLanguage('hinglish')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedLanguage === 'hinglish'
                    ? 'bg-primary-fixed/40 border-primary text-on-surface ring-2 ring-primary/20 shadow-xs'
                    : 'bg-surface-container-low border-surface-container-high text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-lg text-label-lg font-bold text-primary">Hindi + English</span>
                  {selectedLanguage === 'hinglish' && (
                    <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                  )}
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Natural Hinglish code-switching
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLanguage('hindi')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedLanguage === 'hindi'
                    ? 'bg-primary-fixed/40 border-primary text-on-surface ring-2 ring-primary/20 shadow-xs'
                    : 'bg-surface-container-low border-surface-container-high text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-lg text-label-lg font-bold text-primary">Pure Hindi</span>
                  {selectedLanguage === 'hindi' && (
                    <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                  )}
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  हिंदी भाषा में बात करें
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLanguage('english')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedLanguage === 'english'
                    ? 'bg-primary-fixed/40 border-primary text-on-surface ring-2 ring-primary/20 shadow-xs'
                    : 'bg-surface-container-low border-surface-container-high text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-lg text-label-lg font-bold text-primary">English</span>
                  {selectedLanguage === 'english' && (
                    <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                  )}
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Standard English dialogue
                </p>
              </button>
            </div>
          </div>

          {/* Microphone Test Card */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-secondary">mic</span>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                  Microphone & Noise Check
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
                Agora WebRTC Ready
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">equalizer</span>
                </div>
                <div>
                  <p className="font-label-lg text-label-lg font-semibold text-on-surface">
                    Default Device Mic
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {micTesting ? 'Testing audio spectrum...' : micGranted ? 'Microphone Active · High Quality' : 'Permission Required'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTestMic}
                disabled={micTesting}
                className="px-3.5 py-2 rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg font-semibold border border-primary/30 hover:bg-surface-container transition-colors shadow-xs disabled:opacity-50"
              >
                {micTesting ? 'Testing...' : 'Test Mic'}
              </button>
            </div>

            {/* Visualizer animation bar */}
            <div className="flex items-center gap-1.5 h-6 px-2 bg-surface-container-high/40 rounded-xl justify-center">
              <span className={`w-1 rounded-full bg-primary transition-all duration-200 ${micTesting ? 'h-5 animate-pulse' : 'h-2'}`}></span>
              <span className={`w-1 rounded-full bg-secondary transition-all duration-200 ${micTesting ? 'h-6 animate-pulse' : 'h-3'}`}></span>
              <span className={`w-1 rounded-full bg-primary-container transition-all duration-200 ${micTesting ? 'h-4 animate-pulse' : 'h-2'}`}></span>
              <span className={`w-1 rounded-full bg-secondary transition-all duration-200 ${micTesting ? 'h-6 animate-pulse' : 'h-4'}`}></span>
              <span className={`w-1 rounded-full bg-primary transition-all duration-200 ${micTesting ? 'h-3 animate-pulse' : 'h-2'}`}></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-1/3 py-3 rounded-full bg-surface-container-lowest text-on-surface-variant font-title-md text-title-md text-center hover:bg-surface-container border border-surface-container-high transition-colors font-semibold"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleStartCall}
              className="w-full sm:w-2/3 py-3.5 rounded-full bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.98] transition-all font-semibold"
            >
              <span>Connect & Speak with Poly</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
