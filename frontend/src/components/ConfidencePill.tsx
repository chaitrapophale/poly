import React from 'react';
import { ExtractedFieldStatus } from '../types';

interface ConfidencePillProps {
  status: ExtractedFieldStatus;
  label: string;
  value: string;
  notes?: string;
}

export const ConfidencePill: React.FC<ConfidencePillProps> = ({
  status,
  label,
  value,
  notes
}) => {
  const isConfirmed = status === 'confirmed';

  return (
    <div
      className={`p-3 rounded-xl border flex flex-col justify-between ${
        isConfirmed
          ? 'bg-surface-container-lowest border-surface-container-high'
          : 'bg-tertiary-fixed/30 border-tertiary-fixed-dim/80'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
          {label}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 ${
            isConfirmed
              ? 'bg-primary-fixed text-on-primary-fixed-variant'
              : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[13px]">
            {isConfirmed ? 'check_circle' : 'warning'}
          </span>
          {isConfirmed ? 'Confirmed' : 'Needs confirmation'}
        </span>
      </div>

      <p className="font-title-md text-title-md text-on-surface font-semibold mt-1 truncate">
        {value}
      </p>

      {notes && (
        <p className="font-label-sm text-label-sm text-tertiary mt-1 italic leading-tight">
          {notes}
        </p>
      )}
    </div>
  );
};
