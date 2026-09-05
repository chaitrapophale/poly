import React, { useEffect, useState } from 'react';

interface AppSplashScreenProps {
  onComplete: () => void;
}

export const AppSplashScreen: React.FC<AppSplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing POLY Voice AI...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const steps = [
      { at: 20, text: 'Loading Multilingual Speech Models (Hindi, Hinglish, English)...' },
      { at: 55, text: 'Connecting Agora WebRTC APAC Nodes...' },
      { at: 85, text: 'Configuring Real-Time Confidence Engine...' },
      { at: 100, text: 'POLY Multilingual Platform Ready' }
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 3;
        const currentStep = steps.find((s) => next >= s.at && prev < s.at);
        if (currentStep) {
          setStatusText(currentStep.text);
        }
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#263845] via-[#1E2D38] to-[#152028] text-[#FFF8F5] transition-opacity duration-600 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambient Glowing Rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#38607A]/20 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#69577E]/25 blur-2xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Main Splash Card */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        
        {/* Animated 3D Logo Container */}
        <div className="relative mb-8">
          {/* Concentric Halo Effect */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#38607A] via-[#69577E] to-[#7E4F50] opacity-50 blur-lg animate-pulse" />
          
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden border-2 border-[#FFF8F5]/30 shadow-2xl animate-logo-glow flex items-center justify-center bg-[#263845]">
            <img
              src="/poly-logo-3d.jpg"
              alt="POLY Brand Logo"
              className="w-full h-full object-cover scale-105"
            />
          </div>
        </div>

        {/* Brand Title */}
        <div className="flex flex-col items-center gap-1 mb-8">
          <span className="font-extrabold text-4xl md:text-5xl tracking-tight font-jakarta bg-gradient-to-r from-[#FFF8F5] via-[#E2EAF0] to-[#BFC9D0] bg-clip-text text-transparent">
            POLY
          </span>
          <span className="text-xs font-bold tracking-[0.25em] text-[#BFC9D0] uppercase">
            Multilingual Voice AI Platform
          </span>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-full space-y-3">
          <div className="relative w-full h-2 rounded-full bg-[#FFF8F5]/10 overflow-hidden border border-[#FFF8F5]/15">
            <div
              className="h-full bg-gradient-to-r from-[#38607A] via-[#69577E] to-[#7E4F50] transition-all duration-150 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-medium text-[#BFC9D0]">
            <span className="truncate max-w-[220px] text-left">{statusText}</span>
            <span className="font-bold text-[#FFF8F5]">{progress}%</span>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 300);
          }}
          className="mt-10 px-4 py-1.5 rounded-full bg-[#FFF8F5]/10 hover:bg-[#FFF8F5]/20 text-[11px] font-semibold text-[#BFC9D0] hover:text-[#FFF8F5] transition-colors border border-[#FFF8F5]/15"
        >
          Skip Intro →
        </button>

      </div>
    </div>
  );
};
