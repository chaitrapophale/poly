import React from 'react';
import { TranscriptTurnItem } from '../types';

interface TranscriptTurnProps {
  item: TranscriptTurnItem;
}

export const TranscriptTurn: React.FC<TranscriptTurnProps> = ({ item }) => {
  const isPoly = item.speaker === 'poly';
  const isCaller = item.speaker === 'caller';
  const isSystem = item.speaker === 'system';
  const isAgent = item.speaker === 'agent';

  if (isSystem) {
    return (
      <div className="w-full bg-tertiary-fixed/40 rounded-xl p-3.5 shadow-sm border border-tertiary-fixed-dim/60 flex gap-3 items-center my-1">
        <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[15px]">security</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-tertiary font-semibold">
              {item.name}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {item.timestamp}
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface mt-0.5 font-medium">
            {item.originalText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full rounded-xl p-3.5 shadow-sm flex gap-3 items-start my-1 ${
        isPoly
          ? 'bg-secondary-fixed/30 border border-secondary-fixed-dim/50'
          : isAgent
          ? 'bg-primary-fixed/30 border border-primary-fixed-dim/50'
          : 'bg-surface-container-lowest border border-surface-container-high'
      }`}
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-on-primary ${
          isPoly
            ? 'bg-secondary text-on-secondary'
            : isAgent
            ? 'bg-primary text-on-primary'
            : 'bg-primary-container text-on-primary-container'
        }`}
      >
        <span className="material-symbols-outlined text-[15px]">
          {isPoly ? 'smart_toy' : isAgent ? 'support_agent' : 'record_voice_over'}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              {item.name}
            </span>
            {item.language && (
              <span className="bg-surface-container px-2 py-0.5 rounded font-label-sm text-label-sm text-primary font-medium">
                {item.language}
              </span>
            )}
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {item.timestamp}
          </span>
        </div>

        <p className="font-body-md text-body-md text-on-surface mt-1 leading-relaxed">
          {item.originalText}
        </p>

        {item.translatedText && item.translatedText !== item.originalText && (
          <div className="mt-1 text-on-surface-variant font-label-sm text-label-sm italic flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">translate</span>
            <span>English: &quot;{item.translatedText}&quot;</span>
          </div>
        )}
      </div>
    </div>
  );
};
