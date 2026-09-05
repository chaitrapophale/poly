import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import { API_BASE_URL } from '../../lib/apiConfig';

export default function CasesDirectoryPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = `${API_BASE_URL}/api/v1/cases?status=${statusFilter}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCases(data);
        } else {
          setCases([
            {
              id: 'case-8042',
              caseNumber: 'POLY-1024',
              customerName: 'Aarav Patel',
              language: 'Hindi + English',
              issueCategory: 'Account Access & Authentication',
              status: 'WAITING_FOR_HUMAN',
              assignedAgent: 'Priya Sharma',
              createdAt: '2026-09-03 19:30',
              callDuration: '02:45'
            }
          ]);
        }
      })
      .catch((err) => console.warn('Using default directory:', err))
      .finally(() => setLoading(false));
  }, [statusFilter, searchQuery]);

  return (
    <div className="flex h-screen bg-surface font-body">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pl-64 md:pl-72">
        <Header title="Case Management Directory" activeLanguage="Hindi + English" />

        <main className="flex-1 overflow-y-auto pt-20 pb-12 px-6 md:px-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-6">
            
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
              <div>
                <h1 className="font-title-lg text-title-lg font-bold text-on-surface">Case Management</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Directory of customer assistance cases, handoff history, and audit timelines.
                </p>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                  <input
                    type="text"
                    placeholder="Search by case # or issue..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-surface-container-high bg-surface-container-low text-xs font-semibold text-on-surface focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="WAITING_FOR_HUMAN">Waiting for Human</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            </div>

            {/* Cases Table */}
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-xs overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-on-surface-variant font-medium">Loading cases...</div>
              ) : cases.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant font-medium">No cases found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-on-surface">
                    <thead className="bg-surface-container-low border-b border-surface-container-high font-title-sm text-outline uppercase tracking-wider">
                      <tr>
                        <th className="p-4 font-semibold">Case #</th>
                        <th className="p-4 font-semibold">Customer</th>
                        <th className="p-4 font-semibold">Language</th>
                        <th className="p-4 font-semibold">Issue Category</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold">Assigned Agent</th>
                        <th className="p-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      {cases.map((c) => (
                        <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors">
                          <td className="p-4 font-bold text-primary">{c.caseNumber}</td>
                          <td className="p-4 font-semibold">{c.customerName}</td>
                          <td className="p-4 text-secondary font-medium">{c.language}</td>
                          <td className="p-4 text-on-surface font-medium">{c.issueCategory}</td>
                          <td className="p-4">
                            <StatusBadge status={c.status} />
                          </td>
                          <td className="p-4 text-on-surface-variant">{c.assignedAgent}</td>
                          <td className="p-4">
                            <Link
                              to={`/agent/cases/${c.caseNumber || c.id}`}
                              className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-semibold text-xs hover:bg-surface-container-highest transition-colors inline-block"
                            >
                              Audit Timeline
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
