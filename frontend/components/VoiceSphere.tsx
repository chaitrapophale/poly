'use client';

import React from 'react';
import { CallerState } from '../types';

interface VoiceSphereProps {
  state: CallerState;
  promptText?: string;
}

export const VoiceSphere: React.FC<VoiceSphereProps> = ({ state, promptText }) => {
  const getStateColor = () => {
    switch (state) {
      case 'speaking':
        return 'from-secondary-fixed to-primary-fixed';
      case 'thinking':
        return 'from-secondary-fixed-dim to-secondary-fixed';
      case 'confirming':
      case 'clarifying':
        return 'from-primary-fixed to-secondary-fixed';
      case 'escalating':
      case 'connecting-to-human':
        return 'from-tertiary-fixed to-tertiary-fixed-dim';
      case 'human-connected':
        return 'from-primary-fixed to-primary-fixed-dim';
      default:
        return 'from-primary-fixed to-secondary-fixed';
    }
  };

  const getStatusLabel = () => {
    switch (state) {
      case 'listening':
        return 'Listening...';
      case 'thinking':
        return 'Poly is thinking...';
      case 'speaking':
        return 'Poly is speaking...';
      case 'confirming':
        return 'Confirming details...';
      case 'clarifying':
        return 'Asking clarification...';
      case 'escalating':
        return 'Preparing escalation...';
      case 'connecting-to-human':
        return 'Connecting to human agent...';
      case 'human-connected':
        return 'Human Agent Connected';
      default:
        return 'Ready to listen';
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 relative">
      <div className="relative w-52 h-52 md:w-60 md:h-60 flex items-center justify-center">
        {/* Concentric Halo Rings */}
        <div
          className="absolute inset-0 rounded-full bg-primary-fixed/35 animate-ping opacity-30"
          style={{ animationDuration: state === 'speaking' ? '2s' : '3.5s' }}
        ></div>
        <div
          className="absolute inset-4 rounded-full bg-secondary-fixed/40 animate-pulse"
          style={{ animationDuration: state === 'thinking' ? '1.5s' : '2.8s' }}
        ></div>
        <div className="absolute inset-8 rounded-full bg-surface-container-high shadow-inner flex items-center justify-center">
          {/* Inner Voice Core */}
          <div
            className={`w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-tr ${getStateColor()} flex flex-col items-center justify-center shadow-md transition-all duration-500`}
          >
            {/* Dynamic Waveform Bars */}
            <div className="flex items-center gap-1.5 h-10">
              <span
                className={`w-1.5 rounded-full bg-primary transition-all duration-300 animate-pulse ${
                  state === 'speaking' ? 'h-7' : 'h-4'
                }`}
                style={{ animationDelay: '0.1s' }}
              ></span>
              <span
                className={`w-1.5 rounded-full bg-secondary transition-all duration-300 animate-pulse ${
                  state === 'speaking' ? 'h-10' : 'h-8'
                }`}
                style={{ animationDelay: '0.25s' }}
              ></span>
              <span
                className={`w-1.5 rounded-full bg-primary-container transition-all duration-300 animate-pulse ${
                  state === 'speaking' ? 'h-12' : 'h-10'
                }`}
                style={{ animationDelay: '0.4s' }}
              ></span>
              <span
                className={`w-1.5 rounded-full bg-secondary transition-all duration-300 animate-pulse ${
                  state === 'speaking' ? 'h-8' : 'h-6'
                }`}
                style={{ animationDelay: '0.15s' }}
              ></span>
              <span
                className={`w-1.5 rounded-full bg-primary transition-all duration-300 animate-pulse ${
                  state === 'speaking' ? 'h-5' : 'h-3'
                }`}
                style={{ animationDelay: '0.3s' }}
              ></span>
            </div>
          </div>
        </div>
      </div>

      {/* Active State Text Prompt */}
      <div className="text-center mt-4 px-4">
        <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
          <span className="material-symbols-outlined text-[20px]">equalizer</span>
          <span className="font-headline-sm text-headline-sm font-semibold">{getStatusLabel()}</span>
        </div>
        {promptText && (
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">
            &quot;{promptText}&quot;
          </p>
        )}
      </div>
    </div>
  );
};
