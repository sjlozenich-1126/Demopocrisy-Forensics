import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CaseStudy } from '../types';
import { formatTitleCase } from '../lib/formatters';
import { 
  FileText, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Check, 
  Send,
  Scale,
  Calendar,
  User,
  ExternalLink
} from 'lucide-react';

interface CasesViewProps {
  selectedCaseId?: string;
  onSelectCase: (caseId: string) => void;
  onSelectEvidence: (evidenceId: string) => void;
}

export const CasesView: React.FC<CasesViewProps> = ({
  selectedCaseId,
  onSelectCase,
  onSelectEvidence
}) => {
  const { cases, comments, addComment } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'collapse' | 'violations' | 'evidence' | 'reforms' | 'docs' | 'comments'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Comment Form State
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Active selected case
  const activeCase: CaseStudy = cases.find((c) => c.id === selectedCaseId) || cases[0];

  // Filtered cases for list
  const filteredCases = cases.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.judge.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const caseComments = comments.filter((com) => com.targetType === 'case' && com.targetId === activeCase?.id);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;
    addComment({
      targetType: 'case',
      targetId: activeCase.id,
      authorName: commentName.trim(),
      content: commentContent.trim()
    });
    setCommentName('');
    setCommentContent('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 bg-white">
      
      {/* Editorial Header - ProPublica Style with hairline divider */}
      <div className="border-b border-neutral-200 pb-6 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-sans font-bold text-[#c0262d] uppercase tracking-wider">
            Legal Archive · King County Procedural Audit
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-neutral-900 tracking-tight leading-[1.12]">
          The State of Washington vs. Shane Lozenich
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 font-serif max-w-3xl leading-relaxed">
          Eight interconnected municipal, superior court, and civil matters (2021–2026) documenting systemic due process failures, administrative substitution, and suppressed records.
        </p>
      </div>

      {/* Case Selector Filter Bar - Refined 1px borders */}
      <div className="bg-white border border-neutral-200 p-4 sm:p-5 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter by docket #, judge, cause..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50/70 border border-neutral-200 focus:outline-none focus:border-[#c0262d] font-sans font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-sans overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-neutral-500 font-semibold text-[11px] uppercase whitespace-nowrap">Status:</span>
            {['all', 'Dismissed', 'Dismissed w/o Prejudice', 'Case Pending', 'Judgement Satisfied'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium transition cursor-pointer border whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200'
                }`}
              >
                {st === 'all' ? 'All' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Case Dropdown Select */}
        <div className="block sm:hidden pt-2 border-t border-neutral-100">
          <label className="block text-[11px] font-sans font-semibold uppercase text-neutral-600 mb-1">
            Select Active Docket ({filteredCases.length})
          </label>
          <select
            value={activeCase?.id}
            onChange={(e) => onSelectCase(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 p-2 text-xs font-sans font-semibold text-neutral-900 focus:outline-none focus:border-[#c0262d]"
          >
            {filteredCases.map((c) => (
              <option key={c.id} value={c.id}>
                #{c.caseNumber} ({c.year}) - {formatTitleCase(c.title)}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Case Grid Selector - Thin 1px borders */}
        <div className="hidden sm:grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-3 border-t border-neutral-100">
          {filteredCases.map((c) => {
            const isSelected = activeCase?.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className={`p-3 text-left transition border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                    : 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#c0262d]' : 'text-neutral-900'}`}>
                    #{c.caseNumber}
                  </span>
                  <span className={`text-[10px] font-sans font-medium px-1.5 py-0.2 ${
                    isSelected ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {c.year}
                  </span>
                </div>
                <div className={`text-[11px] font-serif truncate mt-2 ${isSelected ? 'text-neutral-300 font-medium' : 'text-neutral-500'}`}>
                  {c.cause}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Case Dossier Container */}
      {activeCase && (
        <div className="bg-white border border-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
          
          {/* Case Header Hero - Clean, High-Contrast Editorial Styling */}
          <div className="bg-neutral-900 text-white p-6 sm:p-8 md:p-10 border-b border-neutral-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#c0262d] text-white font-sans text-xs font-bold uppercase tracking-wider">
                  Docket #{activeCase.caseNumber}
                </span>
                <span className="text-xs font-sans text-neutral-400">
                  {activeCase.court}
                </span>
              </div>

              <span className="px-2.5 py-0.5 text-xs font-sans font-semibold uppercase bg-neutral-800 text-neutral-200 border border-neutral-700">
                Disposition: {activeCase.disposition}
              </span>
            </div>

            {/* Title Cased Docket Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-white leading-tight">
              {formatTitleCase(activeCase.title)}
            </h2>

            {activeCase.headlineQuote && (
              <p className="text-base sm:text-lg font-serif italic text-neutral-300 border-l-2 border-[#c0262d] pl-4">
                "{activeCase.headlineQuote}"
              </p>
            )}

            {/* Spec Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-800 text-xs font-sans">
              <div>
                <span className="text-neutral-400 block text-[11px] uppercase font-semibold">Cause of Action</span>
                <span className="font-semibold text-white text-xs sm:text-sm truncate block mt-0.5">{activeCase.cause}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px] uppercase font-semibold">Presiding Judge</span>
                <span className="font-semibold text-white text-xs sm:text-sm truncate block mt-0.5">{activeCase.judge}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px] uppercase font-semibold">Custody Window</span>
                <span className="font-semibold text-[#c0262d] text-xs sm:text-sm truncate block mt-0.5">{activeCase.incarcerationDates || 'N/A'}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px] uppercase font-semibold">Representation</span>
                <span className="font-semibold text-white text-xs sm:text-sm truncate block mt-0.5">{activeCase.attorney || 'Pro Se / Unappointed'}</span>
              </div>
            </div>
          </div>

          {/* Dossier Navigation Tabs with 1px border and 2px active indicator */}
          <div className="bg-neutral-50/80 border-b border-neutral-200 px-4 sm:px-6 flex items-center gap-1 overflow-x-auto text-xs font-sans">
            {[
              { id: 'overview', label: '1. Executive Summary' },
              { id: 'collapse', label: '2. Procedural Collapse' },
              { id: 'violations', label: '3. Constitutional Breaches' },
              { id: 'evidence', label: '4. Evidentiary Gaps' },
              { id: 'reforms', label: '5. Remedial Reforms' },
              { id: 'docs', label: `6. Documents (${activeCase.associatedDocs.length})` },
              { id: 'comments', label: `7. Notes (${caseComments.length})` }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`py-3 px-3 sm:px-4 border-b-2 transition cursor-pointer whitespace-nowrap font-medium ${
                  activeTab === t.id
                    ? 'border-[#c0262d] text-neutral-900 bg-white font-bold'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content Body - Airy, Spacious & Breathable */}
          <div className="p-6 sm:p-8 md:p-10">
            
            {/* Tab 1: Executive Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#c0262d] mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Executive Summary
                  </span>
                  <p className="font-serif text-lg sm:text-xl leading-relaxed text-neutral-900 font-normal">
                    {activeCase.executiveSummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-200">
                  <div className="space-y-2">
                    <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Contextual Origins
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-serif">
                      {activeCase.contextualOrigins}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Background Summary
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-serif">
                      {activeCase.backgroundSummary}
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-neutral-50 border border-neutral-200 space-y-2">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Narrative Summary
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-serif">
                    {activeCase.narrativeSummary}
                  </p>
                </div>

                {/* Systemic Variables Matrix Preview */}
                <div className="pt-6 border-t border-neutral-200">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#c0262d] mb-3">
                    Systemic Variables Mapping
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-sans">
                    {Object.entries(activeCase.systemicVariables).map(([k, v]) => (
                      <div key={k} className="p-3.5 bg-white border border-neutral-200">
                        <span className="text-neutral-500 uppercase text-[10px] block font-semibold">
                          {k.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="font-medium text-neutral-900 mt-1 block">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Procedural Collapse & Breaches */}
            {activeTab === 'collapse' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#c0262d] mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Structural Procedural Collapse
                  </span>
                  <p className="font-serif text-lg sm:text-xl leading-relaxed text-neutral-900">
                    {activeCase.proceduralCollapse}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-neutral-200">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Specific Procedural Breaches Identified in Docket
                  </h3>
                  <div className="space-y-2.5">
                    {activeCase.proceduralBreach.map((breach, idx) => (
                      <div key={idx} className="p-4 bg-red-50/50 border-l-2 border-[#c0262d] border-t border-r border-b border-red-100 text-xs sm:text-sm text-neutral-900 font-serif flex items-start gap-3">
                        <span className="font-mono font-bold text-[#c0262d] shrink-0">{idx + 1}.</span>
                        <span>{breach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-neutral-900 text-white space-y-2 border border-neutral-800">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#c0262d]">
                    Interaction Model Analysis
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-serif">
                    {activeCase.interactionModel}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Constitutional Violations */}
            {activeTab === 'violations' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#c0262d] mb-1.5 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Constitutional Violations in Docket
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 font-serif">
                    Documented violations under federal and Washington state constitutional standards.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {activeCase.constitutionalViolations.map((v, i) => (
                    <div key={i} className="p-5 bg-white border border-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs font-bold px-2 py-0.5 bg-neutral-100 text-neutral-900 border border-neutral-200">
                          {v.amendment}
                        </span>
                        <span className="text-xs font-sans text-[#c0262d] font-semibold uppercase">Direct Breach</span>
                      </div>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-neutral-900 pt-1">
                        {v.violation}
                      </h4>
                      {v.details && (
                        <p className="text-xs sm:text-sm text-neutral-700 font-serif leading-relaxed pt-1">
                          {v.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Systemic Vulnerabilities vector table with light hairline borders */}
                <div className="pt-6 border-t border-neutral-200">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                    Systemic Vulnerability Vectors
                  </h3>
                  <div className="overflow-x-auto border border-neutral-200">
                    <table className="w-full text-xs font-sans text-left min-w-[480px]">
                      <thead className="bg-neutral-100 text-neutral-800 font-medium uppercase text-[11px] border-b border-neutral-200">
                        <tr>
                          <th className="p-3">Vulnerability Vector</th>
                          <th className="p-3">Operational Manifestation in Docket</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200 bg-white">
                        {activeCase.systemicVulnerabilities.map((sv, idx) => (
                          <tr key={idx} className="hover:bg-neutral-50/70">
                            <td className="p-3.5 font-semibold text-neutral-900 whitespace-nowrap">{sv.vector}</td>
                            <td className="p-3.5 text-neutral-700 font-serif leading-relaxed">{sv.manifestation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Evidence & Information Gaps */}
            {activeTab === 'evidence' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#c0262d] mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Evidentiary Landscape & Asymmetry
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 font-serif leading-relaxed">
                    The evidence record is defined by institutional non-documentation, unproduced audio records, and total disparity between claims and proof.
                  </p>
                </div>

                <div className="space-y-3">
                  {activeCase.evidenceAndInfo.map((item, idx) => (
                    <div key={idx} className="p-4 bg-neutral-50/70 border border-neutral-200 flex items-start gap-3">
                      <div className="w-5 h-5 bg-neutral-900 text-white font-sans text-[11px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-800 font-serif leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Proposed Reforms */}
            {activeTab === 'reforms' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-emerald-700 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Prescribed Systemic Reforms
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 font-serif leading-relaxed">
                    Concrete legislative and procedural remedies required to close the structural due process gaps exposed in this case.
                  </p>
                </div>

                <div className="space-y-3">
                  {activeCase.proposedReforms.map((reform, idx) => (
                    <div key={idx} className="p-4 bg-emerald-50/50 border border-emerald-200 flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-sans text-[11px] uppercase font-bold text-emerald-800 block mb-0.5">
                          Remedial Action #{idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-950 font-serif leading-relaxed">
                          {reform}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 6: Case Documents */}
            {activeTab === 'docs' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#c0262d]" /> Associated Primary Court Filings
                  </span>
                  <span className="text-xs font-sans text-neutral-500 font-medium">
                    {activeCase.associatedDocs.length} Records Cataloged
                  </span>
                </div>

                <div className="space-y-3">
                  {activeCase.associatedDocs.map((doc, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectEvidence(doc.title)}
                      className="p-4 bg-white hover:bg-neutral-50/80 border border-neutral-200 cursor-pointer transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 group shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                    >
                      <div>
                        <span className="text-[10px] font-sans font-bold text-[#c0262d] uppercase block">
                          {doc.type}
                        </span>
                        <h4 className="font-serif font-bold text-base text-neutral-900 group-hover:text-[#c0262d] transition-colors">
                          {formatTitleCase(doc.title)}
                        </h4>
                        <p className="text-xs text-neutral-600 font-serif mt-0.5">{doc.summary}</p>
                      </div>
                      <span className="text-xs font-sans font-semibold text-neutral-700 group-hover:text-[#c0262d] flex items-center gap-1 uppercase tracking-wider shrink-0">
                        View in Vault <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 7: Docket Comments & Notes */}
            {activeTab === 'comments' && (
              <div className="space-y-8 max-w-3xl">
                <div>
                  <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">
                    Editorial Notes & Researcher Annotations ({caseComments.length})
                  </h3>
                  <p className="text-xs text-neutral-600 font-serif">
                    Public record annotations, timeline correlations, and cross-references submitted by investigators.
                  </p>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="p-5 bg-neutral-50/70 border border-neutral-200 space-y-4">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#c0262d]">
                    Submit Case Note / Annotation
                  </h4>
                  {commentSubmitted && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 text-xs font-sans text-emerald-900 font-semibold">
                      Annotation recorded successfully.
                    </div>
                  )}
                  <div className="space-y-3 text-xs font-sans">
                    <input
                      type="text"
                      placeholder="Researcher Name / Organization"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-neutral-200 focus:outline-none focus:border-[#c0262d]"
                      required
                    />
                    <textarea
                      placeholder="Enter legal citation, docket anomaly note, or discrepancy observation..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 bg-white border border-neutral-200 focus:outline-none focus:border-[#c0262d]"
                      required
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-neutral-900 hover:bg-[#c0262d] text-white font-sans font-bold uppercase text-xs tracking-wider transition cursor-pointer flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Case Annotation
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3">
                  {caseComments.map((com) => (
                    <div key={com.id} className="p-4 bg-white border border-neutral-200 space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-sans">
                        <span className="font-bold text-neutral-900">{com.authorName}</span>
                        <span className="text-neutral-500">{com.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-800 font-serif leading-relaxed">
                        {com.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
