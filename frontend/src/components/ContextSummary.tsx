import React from 'react';
import { ExtractedField } from '../types';
import { ConfidencePill } from './ConfidencePill';

interface ContextSummaryProps {
  summary: string;
  confirmedInfo: ExtractedField[];
  uncertainInfo: ExtractedField[];
  missingInfo?: string[];
}

export const ContextSummary: React.FC<ContextSummaryProps> = ({
  summary,
  confirmedInfo,
  uncertainInfo,
  missingInfo = []
}) => {
  return (
    <div className="space-y-4">
      {/* Narrative Summary Card */}
      <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container-high shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">smart_toy</span>
          <h4 className="font-label-lg text-label-lg text-on-surface font-semibold uppercase tracking-wider">
            AI Conversation Summary
          </h4>
        </div>
        <p className="font-body-md text-body-md text-on-surface leading-relaxed">{summary}</p>
      </div>

      {/* Confirmed Data Grid */}
      <div>
        <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold mb-2">
          Confirmed Information ({confirmedInfo.length})
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {confirmedInfo.map((field) => (
            <ConfidencePill
              key={field.key}
              status={field.status}
              label={field.label}
              value={field.value}
              notes={field.notes}
            />
          ))}
        </div>
      </div>

      {/* Uncertain Data Grid */}
      {uncertainInfo.length > 0 && (
        <div>
          <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold mb-2">
            Uncertain / Conflicting Information ({uncertainInfo.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {uncertainInfo.map((field) => (
              <ConfidencePill
                key={field.key}
                status={field.status}
                label={field.label}
                value={field.value}
                notes={field.notes}
              />
            ))}
          </div>
        </div>
      )}

      {/* Missing Details List */}
      {missingInfo.length > 0 && (
        <div className="p-3 bg-surface-container rounded-xl border border-surface-container-high">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold block mb-1">
            Prioritized Missing Information
          </span>
          <div className="flex flex-wrap gap-2">
            {missingInfo.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm border border-outline-variant/40"
              >
                ? {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
