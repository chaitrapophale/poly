'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Header />

      <main className="flex-1 flex flex-col relative w-full pt-20 pb-24 px-4 md:px-12 max-w-4xl mx-auto">
        <div className="flex flex-col w-full">
          
          {/* Hero Card */}
          <section className="relative w-full overflow-hidden rounded-3xl bg-surface-container-low px-6 py-10 md:py-14 text-center shadow-sm border border-surface-container-high/60">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary-fixed/40 blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-secondary-fixed/40 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-primary shadow-sm mb-4 border border-primary-fixed/40">
                <span className="material-symbols-outlined text-[16px]">mic</span>
                <span className="font-label-sm text-label-sm font-semibold tracking-wide">
                  Agora Real-Time Voice Engine
                </span>
              </div>

              <h1 className="font-headline-lg text-headline-lg md:text-4xl text-on-surface font-bold mb-3 tracking-tight">
                Get help. In your language.
              </h1>

              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-6 leading-relaxed">
                Speak naturally with Poly. Switch between Hindi and English seamlessly anytime, and connect with a human when you need one.
              </p>

              {/* Polished Animated Voice Wave Visualizer */}
              <div className="relative w-full max-w-xs h-36 mb-6 rounded-2xl overflow-hidden shadow-sm border border-surface-container-high bg-surface-container-lowest flex flex-col items-center justify-center p-4">
                <div className="flex items-center gap-1.5 h-12 mb-3">
                  <span className="w-1.5 bg-primary rounded-full animate-bounce h-6"></span>
                  <span className="w-1.5 bg-secondary rounded-full animate-bounce [animation-delay:0.15s] h-10"></span>
                  <span className="w-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.3s] h-8"></span>
                  <span className="w-1.5 bg-tertiary rounded-full animate-bounce [animation-delay:0.45s] h-12"></span>
                  <span className="w-1.5 bg-secondary rounded-full animate-bounce [animation-delay:0.2s] h-7"></span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-surface-container-low backdrop-blur-sm border border-surface-container-high shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    Ready for your voice
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="w-full flex flex-col gap-3 max-w-xs">
                <Link
                  href="/before-call"
                  className="w-full min-h-[50px] px-6 py-3.5 rounded-full bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.98] transition-all font-semibold"
                >
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                  <span>Start Assistance</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-lg text-label-lg flex items-center justify-center gap-1.5 shadow-xs hover:bg-surface-container transition-colors border border-surface-container-high font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">info</span>
                  <span>How Poly Works</span>
                </button>
              </div>
            </div>
          </section>

          {/* Feature Highlights Grid */}
          <section className="mt-8 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-high flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 text-on-primary-fixed shadow-xs">
                <span className="material-symbols-outlined text-[24px]">translate</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-label-sm text-label-sm font-semibold tracking-wider text-primary uppercase">
                    Multilingual Code-Switching
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                    Hindi • English • Hinglish
                  </span>
                </div>
                <p className="font-title-md text-title-md text-on-surface mb-1 font-semibold">
                  Speak naturally in your preferred language.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Switch seamlessly mid-sentence (&quot;Mera account reset nahi ho raha and I tried password link&quot;) without starting over.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-high flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0 text-on-secondary-fixed shadow-xs">
                <span className="material-symbols-outlined text-[24px]">equalizer</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-label-sm text-label-sm font-semibold tracking-wider text-secondary uppercase">
                    Real-Time Voice AI
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                    Agora RTC Connected
                  </span>
                </div>
                <p className="font-title-md text-title-md text-on-surface mb-1 font-semibold">
                  Talk to Poly instead of filling out long forms.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Instant conversational response with natural voice interaction and low latency.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-high flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center shrink-0 text-on-tertiary-fixed shadow-xs">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-label-sm text-label-sm font-semibold tracking-wider text-tertiary uppercase">
                    Human-Backed Escalation
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary font-medium">
                    Context Preserved
                  </span>
                </div>
                <p className="font-title-md text-title-md text-on-surface mb-1 font-semibold">
                  A human can step in whenever needed.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  One-tap transfer passes confirmed details and transcripts to support agents so you never repeat yourself.
                </p>
              </div>
            </div>
          </section>

          {/* Quick link to Agent Portal */}
          <div className="mt-8 text-center">
            <Link
              href="/agent/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors font-label-lg text-label-lg font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              <span>Are you a support specialist? Open Agent Workspace</span>
            </Link>
          </div>
        </div>
      </main>

      {/* How Poly Works Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="How Poly Works"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-semibold text-on-surface">Voice-First Interaction</h4>
              <p className="text-sm text-on-surface-variant">
                Tap &quot;Start Assistance&quot; and speak naturally in Hindi, English, or Hinglish.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-semibold text-on-surface">Smart Detail Extraction & Confirmation</h4>
              <p className="text-sm text-on-surface-variant">
                Poly extracts ticket details and verifies critical information like reference numbers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-semibold text-on-surface">Seamless Human Escalation</h4>
              <p className="text-sm text-on-surface-variant">
                If details are uncertain or you ask for a human, Poly connects you with a specialist while sharing your conversation summary.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-surface-container-high">
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2.5 rounded-full bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-colors"
            >
              Got it, let&apos;s start
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
