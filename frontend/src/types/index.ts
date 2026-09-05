export type CallerState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'confirming'
  | 'clarifying'
  | 'escalating'
  | 'connecting-to-human'
  | 'human-connected'
  | 'ended'
  | 'error';

export type AgentState =
  | 'offline'
  | 'online'
  | 'waiting'
  | 'incoming-escalation'
  | 'accepting'
  | 'connected'
  | 'resolved';

export type ExtractedFieldStatus = 'confirmed' | 'needs_confirmation' | 'uncertain' | 'missing';

export interface ExtractedField {
  key: string;
  label: string;
  value: string;
  status: ExtractedFieldStatus;
  notes?: string;
}

export interface TranscriptTurnItem {
  id: string;
  speaker: 'poly' | 'caller' | 'agent' | 'system';
  name?: string;
  speaker_name?: string;
  timestamp?: string;
  timestamp_offset?: string;
  originalText?: string;
  original_text?: string;
  translatedText?: string;
  translated_text?: string;
  language?: string;
  confidence?: number;
  isConfirmed?: boolean;
}

export interface CaseItem {
  id: string;
  caseNumber: string;
  customerName: string;
  customerPhone: string;
  customerLocation: string;
  language: string;
  issueCategory: string;
  status: 'WAITING_FOR_HUMAN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  escalationReason: string;
  confirmedInfo: ExtractedField[];
  uncertainInfo: ExtractedField[];
  missingInfo: string[];
  summary: string;
  createdAt: string;
  assignedAgent?: string;
  callDuration: string;
  transcript: TranscriptTurnItem[];
  otpVerified: boolean;
}

export interface EscalationEvent {
  id: string;
  caseId: string;
  caseNumber: string;
  customerName: string;
  priority: 'PRIORITY' | 'URGENT' | 'HIGH' | 'NORMAL';
  waitingTime: string;
  routingNode: string;
  assignedAgent: string;
  status: 'PENDING' | 'ACCEPTED' | 'COMPLETED';
  issue: string;
  language: string;
  escalationReason: string;
}
