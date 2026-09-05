import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'status' | 'verification';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'status' }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'WAITING_FOR_HUMAN':
        return 'bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary-fixed-dim/50';
      case 'IN_PROGRESS':
        return 'bg-primary-fixed text-on-primary-fixed-variant border-primary-fixed-dim/50';
      case 'RESOLVED':
      case 'CLOSED':
        return 'bg-surface-container-high text-on-surface border-surface-variant';
      case 'OTP Verified':
        return 'bg-primary-fixed text-on-primary-fixed-variant border-primary-fixed-dim';
      default:
        return 'bg-surface-container text-on-surface-variant border-outline-variant';
    }
  };

  const formatText = () => {
    switch (status) {
      case 'WAITING_FOR_HUMAN':
        return 'Waiting for Human';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'RESOLVED':
        return 'Resolved';
      case 'CLOSED':
        return 'Closed';
      default:
        return status;
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold border inline-flex items-center gap-1.5 shadow-xs ${getBadgeStyle()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {formatText()}
    </span>
  );
};
