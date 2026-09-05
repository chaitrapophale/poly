import { CaseItem, EscalationEvent } from '../types';

export const mockCases: CaseItem[] = [
  {
    id: 'case-8042',
    caseNumber: 'POLY-1024',
    customerName: 'Aarav Patel',
    customerPhone: '+91 98*** **420',
    customerLocation: 'Mumbai, India',
    language: 'Hindi + English',
    issueCategory: 'Account Access & Authentication',
    status: 'WAITING_FOR_HUMAN',
    escalationReason: 'Conflicting reference number provided during password reset verification',
    otpVerified: true,
    callDuration: '02:45',
    createdAt: '2 mins ago',
    assignedAgent: 'Priya Sharma',
    summary:
      'Caller is unable to access their account after attempting a password reset. Provided reference number 4281 initially, then corrected to 4289. Poly detected information conflict and triggered a priority human escalation to prevent wrong account mutation.',
    confirmedInfo: [
      { key: 'customer_name', label: 'Customer Name', value: 'Aarav Patel', status: 'confirmed' },
      { key: 'customer_phone', label: 'Registered Phone', value: '+91 98*** **420', status: 'confirmed' },
      { key: 'issue_category', label: 'Issue Category', value: 'Account Access', status: 'confirmed' },
      { key: 'identity_status', label: 'Authentication', value: 'OTP Verified', status: 'confirmed' }
    ],
    uncertainInfo: [
      {
        key: 'reference_number',
        label: 'Reference Number',
        value: '4281 / 4289',
        status: 'uncertain',
        notes: 'Caller stated 4281 first, then mentioned 4289 after clarification attempt'
      }
    ],
    missingInfo: ['Security pin confirmation', 'Alternative recovery email'],
    transcript: [
      {
        id: 't-1',
        speaker: 'poly',
        name: 'POLY Assistant',
        timestamp: '00:05',
        originalText: 'Namaste! Welcome to Poly Support. How can I help you today?',
        translatedText: 'Welcome to Poly Support. How can I help you today?'
      },
      {
        id: 't-2',
        speaker: 'caller',
        name: 'Aarav Patel',
        timestamp: '00:12',
        originalText: 'Mujhe account mein problem aa rahi hai. I can’t access it.',
        translatedText: 'I am having a problem with my account. I can’t access it.',
        language: 'Hindi + English'
      },
      {
        id: 't-3',
        speaker: 'poly',
        name: 'POLY Assistant',
        timestamp: '00:20',
        originalText: 'I can help with your account. Do you have your reference or request number?',
        translatedText: 'I can help with your account. Do you have your reference or request number?'
      },
      {
        id: 't-4',
        speaker: 'caller',
        name: 'Aarav Patel',
        timestamp: '00:28',
        originalText: 'Haan, my reference number is 4281... wait, actually reset link 4289 par aaya tha.',
        translatedText: 'Yes, my reference number is 4281... wait, actually the reset link came to 4289.',
        language: 'Hindi + English',
        confidence: 0.65
      },
      {
        id: 't-5',
        speaker: 'poly',
        name: 'POLY Assistant',
        timestamp: '00:36',
        originalText: 'I heard reference numbers 4281 and 4289. Which one is correct for this ticket?',
        translatedText: 'I heard reference numbers 4281 and 4289. Which one is correct for this ticket?'
      },
      {
        id: 't-6',
        speaker: 'caller',
        name: 'Aarav Patel',
        timestamp: '00:45',
        originalText: 'I’m not 100% sure, screen par reset error dikha raha hai.',
        translatedText: 'I’m not 100% sure, it shows a reset error on screen.',
        language: 'Hindi + English'
      },
      {
        id: 't-7',
        speaker: 'system',
        name: 'POLY Safety & Confidence Engine',
        timestamp: '00:50',
        originalText: 'Confidence Threshold Violation: Reference number ambiguity. Action: Initiate Human Handoff.',
        translatedText: 'Confidence Threshold Violation: Reference number ambiguity. Action: Initiate Human Handoff.'
      },
      {
        id: 't-8',
        speaker: 'poly',
        name: 'POLY Assistant',
        timestamp: '00:58',
        originalText: 'I don’t want to record the wrong reference number. Connecting you to a support specialist with your context.',
        translatedText: 'I don’t want to record the wrong reference number. Connecting you to a support specialist with your context.'
      }
    ]
  },
  {
    id: 'case-8043',
    caseNumber: 'POLY-1025',
    customerName: 'Meera Sharma',
    customerPhone: '+91 97*** **109',
    customerLocation: 'Delhi, India',
    language: 'Hindi',
    issueCategory: 'Billing & Transaction Inquiry',
    status: 'IN_PROGRESS',
    escalationReason: 'Explicit human agent request',
    otpVerified: true,
    callDuration: '04:12',
    createdAt: '15 mins ago',
    assignedAgent: 'Rahul Verma',
    summary:
      'Customer requested billing clarification regarding a duplicate charge on transaction #TXN-993. Customer explicitly asked to speak with a human support agent.',
    confirmedInfo: [
      { key: 'customer_name', label: 'Customer Name', value: 'Meera Sharma', status: 'confirmed' },
      { key: 'transaction_id', label: 'Transaction ID', value: 'TXN-993', status: 'confirmed' },
      { key: 'amount', label: 'Disputed Amount', value: '₹1,499', status: 'confirmed' }
    ],
    uncertainInfo: [],
    missingInfo: [],
    transcript: []
  },
  {
    id: 'case-8044',
    caseNumber: 'POLY-1026',
    customerName: 'Vikram Malhotra',
    customerPhone: '+91 99*** **881',
    customerLocation: 'Bengaluru, India',
    language: 'English',
    issueCategory: 'Service Interruption',
    status: 'RESOLVED',
    escalationReason: 'Complex multi-device setup required',
    otpVerified: true,
    callDuration: '06:30',
    createdAt: '1 hour ago',
    assignedAgent: 'Priya Sharma',
    summary:
      'Service re-activation completed successfully following router configuration troubleshooting with Specialist.',
    confirmedInfo: [
      { key: 'customer_name', label: 'Customer Name', value: 'Vikram Malhotra', status: 'confirmed' },
      { key: 'device_id', label: 'Router Serial', value: 'RTX-884-BLR', status: 'confirmed' }
    ],
    uncertainInfo: [],
    missingInfo: [],
    transcript: []
  }
];

export const mockEscalations: EscalationEvent[] = [
  {
    id: 'esc-8042',
    caseId: 'case-8042',
    caseNumber: 'POLY-1024',
    customerName: 'Aarav Patel',
    priority: 'PRIORITY',
    waitingTime: '00:45',
    routingNode: 'APAC-Central (Mumbai Edge)',
    assignedAgent: 'Priya Sharma',
    status: 'PENDING',
    issue: 'Account Access & Authentication',
    language: 'Hindi + English',
    escalationReason: 'Conflicting reference number (4281 vs 4289)'
  },
  {
    id: 'esc-8043',
    caseId: 'case-8043',
    caseNumber: 'POLY-1025',
    customerName: 'Meera Sharma',
    priority: 'HIGH',
    waitingTime: '01:20',
    routingNode: 'APAC-North (Delhi Edge)',
    assignedAgent: 'Rahul Verma',
    status: 'PENDING',
    issue: 'Billing & Transaction Inquiry',
    language: 'Hindi',
    escalationReason: 'Caller explicitly requested human representative'
  }
];
