import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BeforeCallPage from './pages/BeforeCallPage';
import CallPage from './pages/CallPage';
import EscalationPage from './pages/EscalationPage';
import HumanConnectedPage from './pages/HumanConnectedPage';
import AgentDashboardPage from './pages/agent/AgentDashboardPage';
import AgentCasesPage from './pages/agent/AgentCasesPage';
import CaseDetailAuditPage from './pages/agent/CaseDetailAuditPage';
import AgentConversationsPage from './pages/agent/AgentConversationsPage';
import AgentEscalationDetailPage from './pages/agent/AgentEscalationDetailPage';
import AgentLoginPage from './pages/agent/AgentLoginPage';
import AgentSettingsPage from './pages/agent/AgentSettingsPage';
import AgentAnalyticsPage from './pages/agent/AgentAnalyticsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/before-call" element={<BeforeCallPage />} />
      <Route path="/call" element={<CallPage />} />
      <Route path="/escalation" element={<EscalationPage />} />
      <Route path="/human-connected" element={<HumanConnectedPage />} />
      <Route path="/agent/dashboard" element={<AgentDashboardPage />} />
      <Route path="/agent/cases" element={<AgentCasesPage />} />
      <Route path="/agent/cases/:id" element={<CaseDetailAuditPage />} />
      <Route path="/agent/conversations" element={<AgentConversationsPage />} />
      <Route path="/agent/escalation/:id" element={<AgentEscalationDetailPage />} />
      <Route path="/agent/login" element={<AgentLoginPage />} />
      <Route path="/agent/settings" element={<AgentSettingsPage />} />
      <Route path="/agent/analytics" element={<AgentAnalyticsPage />} />
    </Routes>
  );
}
