'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { PolyHero3D } from '../components/landing/PolyHero3D';

export default function LandingPage() {
  const [activeDecision, setActiveDecision] = useState<'CONTINUE' | 'CLARIFY' | 'CONFIRM' | 'ESCALATE'>('CONFIRM');
  const [activeLangTab, setActiveLangTab] = useState<'Hinglish' | 'Hindi' | 'English'>('Hinglish');

  const decisionStateData = {
    CONTINUE: {
      confidence: 'High (0.92)',
      color: 'bg-[#38607A]',
      textColor: 'text-[#38607A]',
      borderColor: 'border-[#38607A]',
      action: 'Normal conversation progression.',
      detail: 'All extracted critical fields match caller intent without conflict.',
      exampleResponse: 'Sure, I can help you update your account details right away.'
    },
    CLARIFY: {
      confidence: 'Medium (0.65)',
      color: 'bg-[#69577E]',
      textColor: 'text-[#69577E]',
      borderColor: 'border-[#69577E]',
      action: 'Ask ONE focused question.',
      detail: 'Information is missing or partially vague (e.g., ticket category unassigned).',
      exampleResponse: 'Could you tell me if this is regarding your billing or access login?'
    },
    CONFIRM: {
      confidence: 'High / Critical Field',
      color: 'bg-[#38607A]',
      textColor: 'text-[#38607A]',
      borderColor: 'border-[#38607A]',
      action: 'Verify critical detail back to caller.',
      detail: 'Critical reference number extracted; must be confirmed before proceeding.',
      exampleResponse: 'I heard your reference number as 4281. Is that correct?'
    },
    ESCALATE: {
      confidence: 'Low / Conflict (0.35)',
      color: 'bg-[#7E4F50]',
      textColor: 'text-[#7E4F50]',
      borderColor: 'border-[#7E4F50]',
      action: 'Initiate low-latency human handoff.',
      detail: 'Conflicting inputs detected (4281 vs 4289) or policy boundary reached.',
      exampleResponse: 'Connecting you to a support specialist with the context collected so far.'
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F5] text-[#263845] font-jakarta selection:bg-[#38607A]/20">
      
      {/* Navigation Header */}
      <Header isLandingPage={true} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24">
        
        {/* ================================================== */}
        {/* HERO SECTION WITH 3D ANIMATION                      */}
        {/* ================================================== */}
        <section className="pt-4 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38607A]/10 border border-[#38607A]/20 text-[#38607A] text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#38607A] animate-pulse"></span>
              <span>REAL-TIME MULTILINGUAL ASSISTANCE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#263845] leading-[1.12] tracking-tight mb-6">
              Get help. <br />
              <span className="text-[#38607A]">In your language.</span>
            </h1>

            {/* Supporting Headline */}
            <h2 className="text-lg md:text-xl font-semibold text-[#69577E] leading-relaxed mb-4 max-w-xl">
              Real-time voice assistance that understands you, even when the conversation gets complicated.
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-base text-[#263845]/80 leading-relaxed mb-8 max-w-xl">
              POLY listens, understands multilingual conversations, confirms critical details, and brings a human specialist into the call when AI shouldn’t continue alone.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/before-call"
                className="px-8 py-4 rounded-full bg-[#38607A] text-[#FFF8F5] font-bold text-base hover:bg-[#263845] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <span>Start a Call</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  call
                </span>
              </Link>

              <a
                href="#how-it-works"
                className="px-8 py-4 rounded-full border border-[#BFC9D0] text-[#263845] font-semibold text-base hover:bg-[#BFC9D0]/20 transition-all flex items-center justify-center gap-2"
              >
                <span>See How It Works</span>
                <span className="material-symbols-outlined text-[18px]">
                  south
                </span>
              </a>
            </div>

            {/* Micro Credibility Text */}
            <p className="text-xs text-[#263845]/60 mt-4 font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#38607A]">verified</span>
              <span>No app install required. Operates directly in your web browser.</span>
            </p>
          </div>

          {/* Right Visual Column (3D Interactive WebGL Hero Visual) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full gap-4">
            
            {/* 3D WebGL Conversation Intelligence Component */}
            <div className="w-full bg-[#FFF8F5] rounded-3xl border border-[#BFC9D0]/50 shadow-sm relative overflow-hidden">
              <PolyHero3D />
            </div>

            {/* Compact Real-Time Conversation Preview */}
            <div className="w-full max-w-md mt-4 bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-4 shadow-sm flex flex-col gap-3 font-inter">
              <div className="flex items-center justify-between border-b border-[#BFC9D0]/30 pb-2">
                <span className="text-[11px] font-bold text-[#69577E] uppercase tracking-wider">
                  Live Turn Preview
                </span>
                <span className="text-xs font-semibold text-[#38607A] bg-[#38607A]/10 px-2 py-0.5 rounded-md">
                  Active Call
                </span>
              </div>

              {/* Turn 1: Caller */}
              <div className="flex flex-col text-xs text-[#263845]">
                <span className="font-bold text-[#69577E] mb-0.5">Caller</span>
                <p className="bg-[#BFC9D0]/20 p-2.5 rounded-xl rounded-tl-xs">
                  “Bhai, mera reference number shayad 4281 hai...”
                </p>
              </div>

              {/* Turn 2: POLY Agent */}
              <div className="flex flex-col text-xs text-[#263845] items-end">
                <span className="font-bold text-[#38607A] mb-0.5">POLY</span>
                <p className="bg-[#38607A]/15 text-[#263845] p-2.5 rounded-xl rounded-tr-xs text-right max-w-[85%]">
                  “Got it. I heard 4281. Is that correct?”
                </p>
              </div>

              {/* Status Confirmation Banner */}
              <div className="flex items-center justify-between pt-1 border-t border-[#BFC9D0]/30 text-[11px]">
                <div className="flex items-center gap-1.5 text-[#38607A] font-semibold">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>Reference number confirmed</span>
                </div>
                <div className="flex items-center gap-1 text-[#7E4F50] font-semibold">
                  <span>Human ready</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* TRUST / CAPABILITY STRIP                          */}
        {/* ================================================== */}
        <section className="w-full py-6 border-y border-[#BFC9D0]/40 my-8">
          <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8 text-xs md:text-sm font-semibold text-[#263845]/90">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38607A]"></span>
              <span>Real-time voice</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#69577E]"></span>
              <span>Multilingual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38607A]"></span>
              <span>Code-switching</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#69577E]"></span>
              <span>Interruption handling</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38607A]"></span>
              <span>Critical-detail confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7E4F50]"></span>
              <span>Confidence-aware escalation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7E4F50]"></span>
              <span>Human handoff</span>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION: THE PROBLEM                               */}
        {/* ================================================== */}
        <section id="for-callers" className="py-20 border-b border-[#BFC9D0]/30">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#263845] tracking-tight mb-4">
              Real conversations aren’t predictable.
            </h2>
            <p className="text-lg text-[#263845]/80 leading-relaxed">
              Callers get interrupted by noise, switch languages, forget details, correct themselves, and sometimes need a person—not another automated response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-6 shadow-xs hover:border-[#38607A]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#38607A]/10 text-[#38607A] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">translate</span>
                </div>
                <h3 className="text-xl font-bold text-[#263845] mb-2">Language changes</h3>
                <p className="text-sm text-[#263845]/80 leading-relaxed mb-4">
                  Callers naturally switch back and forth between Hindi, English, and Hinglish mid-sentence when explaining complex issues.
                </p>
              </div>
              <div className="bg-[#BFC9D0]/20 rounded-xl p-3 text-xs font-mono text-[#38607A] font-semibold">
                Hindi → English → Hinglish
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-6 shadow-xs hover:border-[#38607A]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#69577E]/10 text-[#69577E] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">edit_note</span>
                </div>
                <h3 className="text-xl font-bold text-[#263845] mb-2">Details get messy</h3>
                <p className="text-sm text-[#263845]/80 leading-relaxed mb-4">
                  Reference numbers, names, locations, and other critical information can be incomplete, spoken hastily, or contradictory.
                </p>
              </div>
              <div className="bg-[#BFC9D0]/20 rounded-xl p-3 text-xs font-mono text-[#69577E] font-semibold">
                Reference numbers: "4281... no wait, 4289"
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-6 shadow-xs hover:border-[#38607A]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#7E4F50]/10 text-[#7E4F50] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">psychology_alt</span>
                </div>
                <h3 className="text-xl font-bold text-[#263845] mb-2">AI can be uncertain</h3>
                <p className="text-sm text-[#263845]/80 leading-relaxed mb-4">
                  POLY recognizes when confidence is not high enough to continue safely instead of guessing or giving incorrect answers.
                </p>
              </div>
              <div className="bg-[#7E4F50]/10 rounded-xl p-3 text-xs font-mono text-[#7E4F50] font-semibold">
                Confidence Evaluator: Escalation Triggered
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-6 shadow-xs hover:border-[#38607A]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#38607A]/10 text-[#38607A] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <h3 className="text-xl font-bold text-[#263845] mb-2">Sometimes you need a person</h3>
                <p className="text-sm text-[#263845]/80 leading-relaxed mb-4">
                  POLY preserves complete conversation context and seamlessly transfers the call to a human support specialist.
                </p>
              </div>
              <div className="bg-[#38607A]/10 rounded-xl p-3 text-xs font-mono text-[#38607A] font-semibold">
                Context Preserved → Human Specialist Joined
              </div>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION: HOW POLY WORKS                            */}
        {/* ================================================== */}
        <section id="how-it-works" className="py-20 border-b border-[#BFC9D0]/30">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#263845] tracking-tight mb-4">
              From first word to human handoff.
            </h2>
            <p className="text-lg text-[#263845]/80 leading-relaxed">
              A 4-step voice assistance flow engineered for clarity, accuracy, and operational trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 01 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-6 flex flex-col relative shadow-xs">
              <span className="text-xs font-extrabold text-[#38607A] tracking-wider uppercase mb-3">
                STEP 01
              </span>
              <h3 className="text-xl font-bold text-[#263845] mb-2">Listen</h3>
              <p className="text-sm text-[#263845]/80 leading-relaxed">
                POLY captures the caller’s voice in real time with WebRTC audio streaming and noise cancellation.
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-6 flex flex-col relative shadow-xs">
              <span className="text-xs font-extrabold text-[#69577E] tracking-wider uppercase mb-3">
                STEP 02
              </span>
              <h3 className="text-xl font-bold text-[#263845] mb-2">Understand</h3>
              <p className="text-sm text-[#263845]/80 leading-relaxed">
                The system detects language, extracts relevant entities, and maintains structured conversation state.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-6 flex flex-col relative shadow-xs">
              <span className="text-xs font-extrabold text-[#38607A] tracking-wider uppercase mb-3">
                STEP 03
              </span>
              <h3 className="text-xl font-bold text-[#263845] mb-2">Confirm</h3>
              <p className="text-sm text-[#263845]/80 leading-relaxed">
                Critical details are repeated back and verified before being treated as reliable ground truth.
              </p>
            </div>

            {/* Step 04 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-6 flex flex-col relative shadow-xs">
              <span className="text-xs font-extrabold text-[#7E4F50] tracking-wider uppercase mb-3">
                STEP 04
              </span>
              <h3 className="text-xl font-bold text-[#263845] mb-2">Escalate</h3>
              <p className="text-sm text-[#263845]/80 leading-relaxed">
                When confidence is low or conflicts occur, POLY transfers the call to a human specialist with full context.
              </p>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION: MULTILINGUAL VOICE                        */}
        {/* ================================================== */}
        <section className="py-20 border-b border-[#BFC9D0]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#263845] tracking-tight mb-4">
                Speak naturally. <br />Switch languages naturally.
              </h2>
              <p className="text-base text-[#263845]/80 leading-relaxed mb-6">
                POLY is designed for real conversations that move between Hindi, English, and Hinglish without forcing callers to press buttons or select a rigid language mode.
              </p>

              {/* Language Selector Demo Pills */}
              <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#BFC9D0]/30 w-fit">
                {(['Hinglish', 'Hindi', 'English'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLangTab(lang)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeLangTab === lang
                        ? 'bg-[#38607A] text-[#FFF8F5] shadow-xs'
                        : 'text-[#263845] hover:text-[#38607A]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation UI Mockup */}
            <div className="lg:col-span-7 bg-[#FFF8F5] rounded-3xl border border-[#BFC9D0]/60 p-6 md:p-8 shadow-sm flex flex-col gap-6">
              
              <div className="flex items-center justify-between border-b border-[#BFC9D0]/40 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#38607A]"></span>
                  <span className="text-sm font-bold text-[#263845]">Voice Session #8042</span>
                </div>
                <div className="flex items-center gap-2 bg-[#69577E]/10 px-3 py-1 rounded-full border border-[#69577E]/20 text-[#69577E] text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]">translate</span>
                  <span>Active Mode: {activeLangTab}</span>
                </div>
              </div>

              {/* Conversation Turns */}
              <div className="flex flex-col gap-4 font-inter">
                
                {/* Turn 1 */}
                <div className="flex flex-col max-w-lg">
                  <span className="text-xs font-bold text-[#69577E] mb-1">Caller</span>
                  <div className="bg-[#BFC9D0]/20 text-[#263845] text-sm p-4 rounded-2xl rounded-tl-xs leading-relaxed">
                    {activeLangTab === 'Hinglish' && "“Actually mera issue ye hai... I already tried the reset portal but it didn't work.”"}
                    {activeLangTab === 'Hindi' && "“Mera account login nahi ho raha hai, maine portal par try kiya tha.”"}
                    {activeLangTab === 'English' && "“I cannot log into my account. I already tried using the self-service portal.”"}
                  </div>
                </div>

                {/* Turn 2 */}
                <div className="flex flex-col max-w-lg ml-auto items-end">
                  <span className="text-xs font-bold text-[#38607A] mb-1">POLY Agent</span>
                  <div className="bg-[#38607A] text-[#FFF8F5] text-sm p-4 rounded-2xl rounded-tr-xs leading-relaxed text-right">
                    {activeLangTab === 'Hinglish' && "“Samajh gaya. Let me help you with your account reset right away. Could you share your reference number?”"}
                    {activeLangTab === 'Hindi' && "“Samajh gaya. Main aapki madad karta hoon. Kya aap apna reference number batayenge?”"}
                    {activeLangTab === 'English' && "“I understand. Let me help you reset your account. Do you have your reference number?”"}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION: INTELLIGENCE / CONFIDENCE                 */}
        {/* ================================================== */}
        <section className="py-20 border-b border-[#BFC9D0]/30">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#263845] tracking-tight mb-4">
              POLY knows when it knows—and when it doesn’t.
            </h2>
            <p className="text-lg text-[#263845]/80 leading-relaxed">
              Every turn is evaluated by a deterministic Confidence Engine that communicates decision states clearly without guessing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: State Picker Tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="text-xs font-bold text-[#69577E] uppercase tracking-wider mb-1">
                Select Decision State
              </span>
              {(['CONTINUE', 'CLARIFY', 'CONFIRM', 'ESCALATE'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setActiveDecision(st)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    activeDecision === st
                      ? 'bg-[#FFF8F5] border-[#38607A] shadow-md ring-2 ring-[#38607A]/20'
                      : 'bg-[#FFF8F5] border-[#BFC9D0]/60 hover:border-[#38607A]/40'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-[#263845]">{st}</span>
                    <span className="text-xs text-[#263845]/70">
                      {st === 'CONTINUE' && 'Normal flow'}
                      {st === 'CLARIFY' && 'Missing details'}
                      {st === 'CONFIRM' && 'Critical detail extracted'}
                      {st === 'ESCALATE' && 'Human handoff'}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#38607A]">
                    {activeDecision === st ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </button>
              ))}
            </div>

            {/* Right: Visual Intelligence Panel */}
            <div className="lg:col-span-8 bg-[#FFF8F5] rounded-3xl border border-[#BFC9D0]/60 p-6 md:p-8 shadow-sm flex flex-col gap-6">
              
              <div className="flex items-center justify-between border-b border-[#BFC9D0]/40 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#69577E] uppercase tracking-wider">
                    Confidence Evaluator
                  </span>
                  <h3 className="text-xl font-bold text-[#263845]">Active Decision: {activeDecision}</h3>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-extrabold text-[#FFF8F5] ${decisionStateData[activeDecision].color}`}>
                  {decisionStateData[activeDecision].confidence}
                </div>
              </div>

              {/* Extracted Fields Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-2xl bg-[#BFC9D0]/15 border border-[#BFC9D0]/40">
                  <span className="text-xs text-[#263845]/70 font-semibold block mb-1">Reference Number</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#263845]">4281</span>
                    <span className="text-xs font-bold text-[#38607A] bg-[#38607A]/15 px-2 py-0.5 rounded-md">
                      ✓ Confirmed
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#BFC9D0]/15 border border-[#BFC9D0]/40">
                  <span className="text-xs text-[#263845]/70 font-semibold block mb-1">Issue Category</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#263845]">Account Access</span>
                    <span className="text-xs font-bold text-[#38607A] bg-[#38607A]/15 px-2 py-0.5 rounded-md">
                      ✓ Confirmed
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#BFC9D0]/15 border border-[#BFC9D0]/40">
                  <span className="text-xs text-[#263845]/70 font-semibold block mb-1">Location</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#263845]">Mumbai</span>
                    <span className="text-xs font-bold text-[#69577E] bg-[#69577E]/15 px-2 py-0.5 rounded-md">
                      ? Needs confirm
                    </span>
                  </div>
                </div>

              </div>

              {/* Decision Action Box */}
              <div className="p-5 rounded-2xl bg-[#38607A]/10 border border-[#38607A]/30 flex flex-col gap-2">
                <span className="text-xs font-extrabold text-[#38607A] uppercase tracking-wider">
                  Engine Action Rule
                </span>
                <p className="text-sm font-semibold text-[#263845]">
                  “{decisionStateData[activeDecision].action} {decisionStateData[activeDecision].detail}”
                </p>
                <div className="mt-2 pt-2 border-t border-[#38607A]/20 text-xs font-mono text-[#69577E]">
                  Synthesized Output: {decisionStateData[activeDecision].exampleResponse}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION: HUMAN HANDOFF                             */}
        {/* ================================================== */}
        <section id="for-support-teams" className="py-20 border-b border-[#BFC9D0]/30">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#263845] tracking-tight mb-4">
              When AI shouldn’t continue, a person takes over.
            </h2>
            <p className="text-lg text-[#263845]/80 leading-relaxed">
              POLY does not force callers through an automated loop. When human judgement is needed, the system preserves the conversation context and connects the caller with a support specialist.
            </p>
          </div>

          {/* Handoff Flow Visualization */}
          <div className="bg-[#FFF8F5] rounded-3xl border border-[#BFC9D0]/60 p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Caller */}
            <div className="md:col-span-3 bg-[#BFC9D0]/20 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#38607A] text-[#FFF8F5] flex items-center justify-center text-2xl font-bold mb-3">
                <span className="material-symbols-outlined text-[28px]">person</span>
              </div>
              <h3 className="font-bold text-base text-[#263845]">Caller</h3>
              <span className="text-xs text-[#69577E] font-semibold mt-1">Aarav Patel</span>
              <span className="text-[11px] bg-[#38607A]/15 text-[#38607A] px-2.5 py-0.5 rounded-full font-bold mt-2">
                Hinglish Speaker
              </span>
            </div>

            {/* Middle: POLY Context Bridge */}
            <div className="md:col-span-6 flex flex-col gap-3 p-4 bg-[#FFF8F5] rounded-2xl border border-[#7E4F50]/40 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#7E4F50] uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#7E4F50] animate-ping"></span>
                  Escalation Triggered
                </span>
                <span className="text-xs font-bold text-[#7E4F50] bg-[#7E4F50]/15 px-2.5 py-0.5 rounded-full">
                  Context Flow
                </span>
              </div>

              <div className="text-xs text-[#263845] space-y-1.5 bg-[#7E4F50]/5 p-3 rounded-xl">
                <div><strong className="text-[#7E4F50]">Escalation Reason:</strong> Conflicting reference number (4281 vs 4289)</div>
                <div><strong className="text-[#38607A]">Confirmed:</strong> Customer name, Issue category</div>
                <div><strong className="text-[#69577E]">Needs Review:</strong> Reference number verification</div>
              </div>

              <div className="text-[11px] text-[#263845]/70 text-center font-mono pt-1">
                Sub-50ms WebRTC Channel Transition ("session-8042")
              </div>
            </div>

            {/* Right: Human Specialist */}
            <div className="md:col-span-3 bg-[#38607A]/10 rounded-2xl p-6 flex flex-col items-center text-center border border-[#38607A]/30">
              <div className="w-14 h-14 rounded-full bg-[#7E4F50] text-[#FFF8F5] flex items-center justify-center text-2xl font-bold mb-3">
                <span className="material-symbols-outlined text-[28px]">support_agent</span>
              </div>
              <h3 className="font-bold text-base text-[#263845]">Support Specialist</h3>
              <span className="text-xs text-[#38607A] font-semibold mt-1">Tier-2 APAC Specialist</span>
              <span className="text-[11px] bg-[#7E4F50] text-[#FFF8F5] px-2.5 py-0.5 rounded-full font-bold mt-2">
                Human Connected
              </span>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION: SUPPORT SPECIALIST (OPERATIONS TOOL)      */}
        {/* ================================================== */}
        <section className="py-20 border-b border-[#BFC9D0]/30">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#263845] tracking-tight mb-4">
              Give your support team context—not another transcript to read.
            </h2>
            <p className="text-lg text-[#263845]/80 leading-relaxed">
              POLY provides support agents with structured, actionable context summaries before they even say hello.
            </p>
          </div>

          {/* Operations Dashboard Preview Card */}
          <div className="bg-[#FFF8F5] rounded-3xl border border-[#BFC9D0]/60 overflow-hidden shadow-md">
            
            {/* Dashboard Header Bar */}
            <div className="bg-[#263845] text-[#FFF8F5] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#7E4F50] animate-pulse"></span>
                <span className="font-bold text-base">LIVE ESCALATIONS DIRECTORY</span>
              </div>
              <div className="text-xs font-mono text-[#BFC9D0]">
                Case #POLY-1024 • Priority: HIGH
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Summary & Fields */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                <div>
                  <h4 className="text-xs font-extrabold text-[#69577E] uppercase tracking-wider mb-2">
                    Automated Case Summary
                  </h4>
                  <p className="text-sm text-[#263845] leading-relaxed bg-[#BFC9D0]/15 p-4 rounded-2xl border border-[#BFC9D0]/30">
                    Caller Aarav Patel experienced account access failure. Initially provided reference number 4281, then corrected to 4289. Poly flagged conflict and transferred call to human queue.
                  </p>
                </div>

                {/* Structured Extraction Chips */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-[#38607A]/10 border border-[#38607A]/20">
                    <span className="text-xs text-[#38607A] font-bold block">Confirmed Name</span>
                    <span className="text-sm font-bold text-[#263845]">Aarav Patel</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#7E4F50]/10 border border-[#7E4F50]/20">
                    <span className="text-xs text-[#7E4F50] font-bold block">Uncertain Reference</span>
                    <span className="text-sm font-bold text-[#7E4F50]">4281 / 4289</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Live Transcript & Handoff CTA */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#BFC9D0]/15 p-6 rounded-2xl border border-[#BFC9D0]/40">
                <div>
                  <h4 className="text-xs font-extrabold text-[#38607A] uppercase tracking-wider mb-3">
                    Live Transcript Turn Snippet
                  </h4>
                  <div className="text-xs space-y-2 text-[#263845] font-inter">
                    <div><strong className="text-[#69577E]">Caller:</strong> "Mera reference number 4281 tha... wait, actually 4289 hai."</div>
                    <div><strong className="text-[#38607A]">POLY:</strong> "I don't want to record the wrong number. Connecting you with a specialist."</div>
                  </div>
                </div>

                <Link
                  href="/agent/cases"
                  className="mt-6 w-full py-3.5 rounded-full bg-[#7E4F50] hover:bg-[#263845] text-[#FFF8F5] font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                  <span>Accept Handoff</span>
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION: SAFETY                                    */}
        {/* ================================================== */}
        <section id="safety" className="py-20 border-b border-[#BFC9D0]/30">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#263845] tracking-tight mb-4">
              Helpful by design. Careful by default.
            </h2>
            <p className="text-lg text-[#263845]/80 leading-relaxed">
              POLY is designed with clear boundaries around what an AI assistance agent can and cannot do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            {/* Safety Card 1 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-5 flex flex-col shadow-xs">
              <span className="material-symbols-outlined text-[24px] text-[#7E4F50] mb-3">medical_services</span>
              <h3 className="font-bold text-base text-[#263845] mb-1">Medical</h3>
              <p className="text-xs text-[#263845]/80 leading-relaxed">
                No diagnosis or treatment decisions.
              </p>
            </div>

            {/* Safety Card 2 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-5 flex flex-col shadow-xs">
              <span className="material-symbols-outlined text-[24px] text-[#69577E] mb-3">gavel</span>
              <h3 className="font-bold text-base text-[#263845] mb-1">Legal</h3>
              <p className="text-xs text-[#263845]/80 leading-relaxed">
                No authoritative legal advice.
              </p>
            </div>

            {/* Safety Card 3 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-5 flex flex-col shadow-xs">
              <span className="material-symbols-outlined text-[24px] text-[#38607A] mb-3">payments</span>
              <h3 className="font-bold text-base text-[#263845] mb-1">Financial</h3>
              <p className="text-xs text-[#263845]/80 leading-relaxed">
                No authoritative financial advice.
              </p>
            </div>

            {/* Safety Card 4 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#BFC9D0]/60 p-5 flex flex-col shadow-xs">
              <span className="material-symbols-outlined text-[24px] text-[#7E4F50] mb-3">e911_emergency</span>
              <h3 className="font-bold text-base text-[#263845] mb-1">Emergency</h3>
              <p className="text-xs text-[#263845]/80 leading-relaxed">
                No replacement for emergency responders.
              </p>
            </div>

            {/* Safety Card 5 */}
            <div className="bg-[#FFF8F5] rounded-2xl border border-[#38607A]/50 p-5 flex flex-col shadow-xs bg-[#38607A]/5">
              <span className="material-symbols-outlined text-[24px] text-[#38607A] mb-3">person_check</span>
              <h3 className="font-bold text-base text-[#263845] mb-1">Human judgement</h3>
              <p className="text-xs text-[#263845]/80 leading-relaxed">
                Escalate when situation requires a person.
              </p>
            </div>

          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION: AUDITABILITY                              */}
        {/* ================================================== */}
        <section className="py-20 border-b border-[#BFC9D0]/30">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#263845] tracking-tight mb-4">
              Every important decision leaves a trail.
            </h2>
            <p className="text-lg text-[#263845]/80 leading-relaxed">
              Complete timeline logging guarantees transparency and accountability for operational support audits.
            </p>
          </div>

          {/* Audit Timeline Component */}
          <div className="bg-[#FFF8F5] rounded-3xl border border-[#BFC9D0]/60 p-6 md:p-8 shadow-sm">
            <div className="relative pl-6 space-y-6 border-l-2 border-[#38607A]/30">
              
              <div className="relative flex items-start gap-4">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#38607A]"></span>
                <span className="font-mono text-xs font-bold text-[#38607A]">00:00</span>
                <div>
                  <span className="font-mono font-bold text-xs text-[#263845] bg-[#BFC9D0]/20 px-2 py-0.5 rounded">CALL_STARTED</span>
                  <p className="text-xs text-[#263845]/80 mt-1">Agora WebRTC voice stream initialized on channel session-8042.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#69577E]"></span>
                <span className="font-mono text-xs font-bold text-[#69577E]">00:12</span>
                <div>
                  <span className="font-mono font-bold text-xs text-[#263845] bg-[#BFC9D0]/20 px-2 py-0.5 rounded">LANGUAGE_CHANGED</span>
                  <p className="text-xs text-[#263845]/80 mt-1">Caller switched from Hindi to English seamlessly.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#38607A]"></span>
                <span className="font-mono text-xs font-bold text-[#38607A]">00:32</span>
                <div>
                  <span className="font-mono font-bold text-xs text-[#263845] bg-[#BFC9D0]/20 px-2 py-0.5 rounded">INFORMATION_CONFIRMED</span>
                  <p className="text-xs text-[#263845]/80 mt-1">Critical detail verified: Customer Name Aarav Patel.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#7E4F50]"></span>
                <span className="font-mono text-xs font-bold text-[#7E4F50]">00:58</span>
                <div>
                  <span className="font-mono font-bold text-xs text-[#FFF8F5] bg-[#7E4F50] px-2 py-0.5 rounded">ESCALATION_TRIGGERED</span>
                  <p className="text-xs text-[#263845]/80 mt-1">Conflicting reference number detected (4281 vs 4289).</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#7E4F50]"></span>
                <span className="font-mono text-xs font-bold text-[#7E4F50]">01:00</span>
                <div>
                  <span className="font-mono font-bold text-xs text-[#263845] bg-[#BFC9D0]/20 px-2 py-0.5 rounded">CASE_CREATED</span>
                  <p className="text-xs text-[#263845]/80 mt-1">Case #POLY-1024 logged in SQLite/PostgreSQL queue.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#38607A]"></span>
                <span className="font-mono text-xs font-bold text-[#38607A]">02:45</span>
                <div>
                  <span className="font-mono font-bold text-xs text-[#263845] bg-[#BFC9D0]/20 px-2 py-0.5 rounded">HUMAN_CONNECTED</span>
                  <p className="text-xs text-[#263845]/80 mt-1">Support Specialist accepted handoff and joined WebRTC channel.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* SECTION: TECHNOLOGY                                */}
        {/* ================================================== */}
        <section className="py-16 border-b border-[#BFC9D0]/30">
          <h3 className="text-xs font-extrabold text-[#69577E] uppercase tracking-wider mb-8 text-center">
            Built for real-time conversations
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#BFC9D0]/60 text-center">
              <span className="font-bold text-sm text-[#263845] block">Agora</span>
              <span className="text-[11px] text-[#263845]/70">Real-time voice RTC</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#BFC9D0]/60 text-center">
              <span className="font-bold text-sm text-[#263845] block">Google Gemini</span>
              <span className="text-[11px] text-[#263845]/70">Multimodal AI Engine</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#BFC9D0]/60 text-center">
              <span className="font-bold text-sm text-[#263845] block">FastAPI</span>
              <span className="text-[11px] text-[#263845]/70">Python Backend</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#BFC9D0]/60 text-center">
              <span className="font-bold text-sm text-[#263845] block">Next.js 16</span>
              <span className="text-[11px] text-[#263845]/70">Web Framework</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#BFC9D0]/60 text-center">
              <span className="font-bold text-sm text-[#263845] block">PostgreSQL</span>
              <span className="text-[11px] text-[#263845]/70">Persistent Cases</span>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* FINAL CTA SECTION                                  */}
        {/* ================================================== */}
        <section className="py-20 my-8 bg-gradient-to-br from-[#38607A]/10 via-[#69577E]/10 to-[#FFF8F5] rounded-3xl border border-[#BFC9D0]/60 p-8 md:p-14 text-center relative overflow-hidden shadow-sm">
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#263845] tracking-tight mb-4">
              Let people talk. <br />Let POLY handle the complexity.
            </h2>
            <p className="text-base md:text-lg text-[#263845]/80 mb-8 leading-relaxed">
              Start a conversation in your language and experience how POLY listens, confirms, and knows when to bring in a human.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <Link
                href="/before-call"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#38607A] text-[#FFF8F5] font-bold text-base hover:bg-[#263845] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Start a Call</span>
                <span className="material-symbols-outlined text-[18px]">call</span>
              </Link>
              <Link
                href="/agent/cases"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#BFC9D0] text-[#263845] font-semibold text-base hover:bg-[#BFC9D0]/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Agent Login</span>
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
              </Link>
            </div>
          </div>

        </section>

      </main>

      {/* ================================================== */}
      {/* FOOTER                                             */}
      {/* ================================================== */}
      <footer className="w-full bg-[#263845] text-[#FFF8F5] border-t border-[#BFC9D0]/20 pt-16 pb-12 px-6 md:px-12 font-jakarta">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#BFC9D0]/20">
          
          <div className="md:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#38607A] flex items-center justify-center text-[#FFF8F5] font-bold">
                P
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[#FFF8F5]">POLY</span>
            </div>
            <p className="text-sm text-[#BFC9D0] max-w-sm leading-relaxed mb-4">
              Multilingual voice assistance with low-latency human escalation.
            </p>
            <span className="text-xs text-[#BFC9D0]/60">
              Built with Agora RTC & Google Gemini
            </span>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-[#BFC9D0] uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs text-[#FFF8F5]/80">
              <li><a href="#how-it-works" className="hover:text-[#FFF8F5] transition-colors">How it works</a></li>
              <li><a href="#for-callers" className="hover:text-[#FFF8F5] transition-colors">Voice assistance</a></li>
              <li><a href="#for-support-teams" className="hover:text-[#FFF8F5] transition-colors">Human handoff</a></li>
              <li><Link href="/agent/cases" className="hover:text-[#FFF8F5] transition-colors">Support dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-[#BFC9D0] uppercase tracking-wider mb-4">Trust</h4>
            <ul className="space-y-2.5 text-xs text-[#FFF8F5]/80">
              <li><a href="#safety" className="hover:text-[#FFF8F5] transition-colors">Safety boundaries</a></li>
              <li><span className="opacity-70">Privacy policy</span></li>
              <li><span className="opacity-70">Security architecture</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-[#BFC9D0] uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-[#FFF8F5]/80">
              <li><span>Agora RTC Engine</span></li>
              <li><span>Google Gemini LLM</span></li>
              <li><span>FastAPI Service</span></li>
              <li><span>Next.js 16 Framework</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#BFC9D0]/70">
          <span>© 2026 POLY. All rights reserved.</span>
          <span className="mt-2 sm:mt-0 font-mono">Status: Production Operational 🟢</span>
        </div>
      </footer>

    </div>
  );
}
