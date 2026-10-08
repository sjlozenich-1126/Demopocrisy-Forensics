import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CaseStudy } from '../types';
import { 
  FileText, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Check, 
  Send
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12 bg-white overflow-x-hidden">
      
      {/* Header - Intercept Style */}
      <div className="border-b-4 border-black pb-6 space-y-2">
        <div className="w-12 h-1.5 bg-[#FF3B00] mb-2"></div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-black text-[#FF3B00] uppercase tracking-widest">
            // LEGAL ARCHIVE • KING COUNTY PROCEDURAL AUDIT
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-black leading-[1.08] tracking-tight">
          The State of WA vs. Shane Lozenich
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 font-serif italic max-w-3xl leading-relaxed">
          Eight interconnected municipal, superior court, and civil matters (2021–2026) documenting systemic due process failures, administrative substitution, and suppressed records.
        </p>
      </div>

      {/* Case Selector Filter Bar */}
      <div className="bg-white border-2 border-black p-4 sm:p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#FF3B00] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter by docket #, judge, cause..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border-2 border-black focus:outline-none focus:border-[#FF3B00] font-mono font-bold"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-black font-black text-[11px] uppercase whitespace-nowrap">// STATUS:</span>
            {['all', 'Dismissed', 'Dismissed w/o Prejudice', 'Case Pending', 'Judgement Satisfied'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 uppercase text-[11px] font-black transition cursor-pointer border whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black hover:bg-neutral-100 border-neutral-300'
                }`}
              >
                {st === 'all' ? 'All' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Case Dropdown Select */}
        <div className="block sm:hidden pt-2 border-t border-neutral-200">
          <label className="block text-[10px] font-mono font-black uppercase text-[#FF3B00] mb-1">
            Select Active Docket ({filteredCases.length})
          </label>
          <select
            value={activeCase?.id}
            onChange={(e) => onSelectCase(e.target.value)}
            className="w-full bg-neutral-50 border-2 border-black p-2.5 text-xs font-mono font-black text-black focus:outline-none focus:border-[#FF3B00]"
          >
            {filteredCases.map((c) => (
              <option key={c.id} value={c.id}>
                #{c.caseNumber} ({c.year}) - {c.cause}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Case Grid Tabs */}
        <div className="hidden sm:grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-3 border-t-2 border-black">
          {filteredCases.map((c) => {
            const isSelected = activeCase?.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className={`p-3 text-left transition border-2 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-black text-white border-black ring-2 ring-[#FF3B00]'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-black border-neutral-300 hover:border-black'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-mono font-black ${isSelected ? 'text-[#FF3B00]' : 'text-black'}`}>
                    #{c.caseNumber}
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-1 ${
                    isSelected ? 'bg-[#FF3B00] text-white' : 'bg-neutral-200 text-black'
                  }`}>
                    {c.year}
                  </span>
                </div>
                <div className="text-[11px] font-serif font-bold truncate mt-2 text-neutral-400">
                  {c.cause}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Case Dossier */}
      {activeCase && (
        <div className="bg-white border-4 border-black shadow-lg overflow-hidden">
          
          {/* Case Header Hero */}
          <div className="bg-black text-white p-5 sm:p-8 md:p-10 border-b-4 border-[#FF3B00]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#FF3B00] text-white font-mono text-xs font-black uppercase tracking-wider">
                  CASE DOSSIER #{activeCase.caseNumber}
                </span>
                <span className="text-xs font-mono text-neutral-300">
                  {activeCase.court}
                </span>
              </div>

              <span className="px-2.5 py-1 text-xs font-mono font-black uppercase bg-neutral-900 text-[#FF3B00] border-2 border-[#FF3B00]">
                DISPOSITION: {activeCase.disposition}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif text-white leading-tight">
              {activeCase.title}
            </h2>

            {activeCase.headlineQuote && (
              <p className="text-base sm:text-xl font-serif italic text-neutral-300 mt-3 border-l-4 border-[#FF3B00] pl-4">
                "{activeCase.headlineQuote}"
              </p>
            )}

            {/* Quick Spec Ribbon - 100% Mobile Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t-2 border-neutral-800 text-xs font-mono">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Cause of Action</span>
                <span className="font-black text-white text-xs sm:text-sm truncate block">{activeCase.cause}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Presiding Judge</span>
                <span className="font-black text-white text-xs sm:text-sm truncate block">{activeCase.judge}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Custody Window</span>
                <span className="font-black text-[#FF3B00] text-xs sm:text-sm truncate block">{activeCase.incarcerationDates || 'N/A'}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Representation</span>
                <span className="font-black text-white text-xs sm:text-sm truncate block">{activeCase.attorney || 'Pro Se / Unappointed'}</span>
              </div>
            </div>
          </div>

          {/* Dossier Navigation Tabs */}
          <div className="bg-neutral-100 border-b-2 border-black px-3 sm:px-6 flex items-center gap-1 overflow-x-auto text-xs font-mono font-bold">
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
                className={`py-3 px-3 sm:px-4 border-b-4 transition cursor-pointer whitespace-nowrap uppercase tracking-wider ${
                  activeTab === t.id
                    ? 'border-[#FF3B00] text-black bg-white font-black'
                    : 'border-transparent text-neutral-600 hover:text-black hover:bg-neutral-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div className="p-4 sm:p-8 md:p-10">
            {/* Tab 1: Executive Overview & Context */}
            {activeTab === 'overview' && (
              <div className="space-y-6 sm:space-y-8 max-w-4xl">
                <div>
                  <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#FF3B00] mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> EXECUTIVE SUMMARY
                  </h3>
                  <p className="font-serif text-lg sm:text-xl leading-relaxed text-black font-normal">
                    {activeCase.executiveSummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-6 border-t-2 border-neutral-200">
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-black uppercase text-black">
                      Contextual Origins
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                      {activeCase.contextualOrigins}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs font-black uppercase text-black">
                      Background Summary
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                      {activeCase.backgroundSummary}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-neutral-50 border-2 border-black space-y-2">
                  <h4 className="font-mono text-xs font-black uppercase text-black">
                    Narrative Summary
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans">
                    {activeCase.narrativeSummary}
                  </p>
                </div>

                {/* Systemic Variables Matrix Preview */}
                <div className="pt-6 border-t-2 border-neutral-200">
                  <h4 className="font-mono text-xs font-black uppercase text-[#FF3B00] mb-3">
                    Systemic Variables Mapping
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
                    {Object.entries(activeCase.systemicVariables).map(([k, v]) => (
                      <div key={k} className="p-3 bg-neutral-50 border-2 border-black">
                        <span className="text-neutral-500 uppercase text-[10px] block font-bold">
                          {k.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="font-black text-black mt-1 block">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Procedural Collapse & Breaches */}
            {activeTab === 'collapse' && (
              <div className="space-y-6 sm:space-y-8 max-w-4xl">
                <div>
                  <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#FF3B00] mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#FF3B00]" /> STRUCTURAL PROCEDURAL COLLAPSE
                  </h3>
                  <p className="font-serif text-lg sm:text-xl leading-relaxed text-black">
                    {activeCase.proceduralCollapse}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t-2 border-neutral-200">
                  <h4 className="font-mono text-xs font-black uppercase text-black">
                    Specific Procedural Breaches Identified in Docket
                  </h4>
                  <div className="space-y-2.5">
                    {activeCase.proceduralBreach.map((breach, idx) => (
                      <div key={idx} className="p-3.5 sm:p-4 bg-red-50 border-l-4 border-[#FF3B00] border border-red-200 text-xs sm:text-sm text-neutral-900 font-sans flex items-start gap-3">
                        <span className="font-mono font-black text-[#FF3B00] shrink-0">{idx + 1}.</span>
                        <span>{breach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 sm:p-6 bg-black text-white space-y-2 border-2 border-black">
                  <h4 className="font-mono text-xs font-black uppercase text-[#FF3B00]">
                    Interaction Model Analysis
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {activeCase.interactionModel}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Constitutional Violations */}
            {activeTab === 'violations' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#FF3B00] mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#FF3B00]" /> CONSTITUTIONAL VIOLATIONS IN DOCKET
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-sans">
                    Documented violations under federal and Washington state constitutional standards.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {activeCase.constitutionalViolations.map((v, i) => (
                    <div key={i} className="p-4 sm:p-5 bg-white border-2 border-black space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-black px-2 py-0.5 bg-black text-white uppercase">
                          {v.amendment}
                        </span>
                        <span className="text-xs font-mono text-[#FF3B00] font-black uppercase">Direct Breach</span>
                      </div>
                      <p className="font-serif font-black text-base sm:text-lg text-black pt-1">
                        {v.violation}
                      </p>
                      {v.details && (
                        <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed pt-1">
                          {v.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Systemic Vulnerabilities vector table */}
                <div className="pt-6 border-t-2 border-neutral-200">
                  <h4 className="font-mono text-xs font-black uppercase text-black mb-3">
                    Systemic Vulnerability Vectors
                  </h4>
                  <div className="overflow-x-auto border-2 border-black">
                    <table className="w-full text-xs font-sans text-left min-w-[480px]">
                      <thead className="bg-black text-white font-mono uppercase text-[10px]">
                        <tr>
                          <th className="p-3">Vulnerability Vector</th>
                          <th className="p-3">Operational Manifestation in Docket</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-300 bg-white">
                        {activeCase.systemicVulnerabilities.map((sv, idx) => (
                          <tr key={idx} className="hover:bg-neutral-50">
                            <td className="p-3.5 font-mono font-bold text-black whitespace-nowrap">{sv.vector}</td>
                            <td className="p-3.5 text-neutral-800 leading-relaxed">{sv.manifestation}</td>
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
                  <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#FF3B00] mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> EVIDENTIARY LANDSCAPE & ASYMMETRY
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                    The evidence record is defined by institutional non-documentation, unproduced audio records, and total disparity between claims and proof.
                  </p>
                </div>

                <div className="space-y-3">
                  {activeCase.evidenceAndInfo.map((item, idx) => (
                    <div key={idx} className="p-4 bg-neutral-50 border-2 border-black flex items-start gap-3">
                      <div className="w-6 h-6 bg-black text-white font-mono text-xs flex items-center justify-center font-black shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-800 font-sans leading-relaxed">
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
                  <h3 className="font-mono text-xs font-black uppercase tracking-widest text-[#FF3B00] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> PRESCRIBED SYSTEMIC REFORMS
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                    Concrete legislative and procedural remedies required to close the structural due process gaps exposed in this case.
                  </p>
                </div>

                <div className="space-y-3">
                  {activeCase.proposedReforms.map((reform, idx) => (
                    <div key={idx} className="p-4 bg-emerald-50 border-2 border-emerald-600 flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[10px] uppercase font-black text-emerald-900 block mb-0.5">
                          Remedial Action #{idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-950 font-sans leading-relaxed">
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
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <h3 className="font-mono text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#FF3B00]" /> ASSOCIATED PRIMARY COURT FILINGS
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 font-bold">
                    {activeCase.associatedDocs.length} Records Cataloged
                  </span>
                </div>

                <div className="space-y-3">
                  {activeCase.associatedDocs.map((doc, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectEvidence(doc.title)}
                      className="p-4 bg-neutral-50 hover:bg-neutral-100 border-2 border-black cursor-pointer transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 group"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#FF3B00] uppercase block">
                          {doc.type}
                        </span>
                        <h4 className="font-serif font-black text-base text-black group-hover:text-[#FF3B00] transition-colors">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-neutral-600 font-sans mt-0.5">{doc.summary}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-black group-hover:text-[#FF3B00] flex items-center gap-1 uppercase tracking-wider shrink-0">
                        View in Vault →
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
                  <h3 className="font-mono text-xs font-black uppercase tracking-widest text-black mb-1">
                    Editorial Notes & Researcher Annotations ({caseComments.length})
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans">
                    Public record annotations, timeline correlations, and cross-references submitted by investigators.
                  </p>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="p-5 bg-neutral-50 border-2 border-black space-y-4">
                  <h4 className="font-mono text-xs font-black uppercase text-[#FF3B00]">
                    Submit Case Note / Annotation
                  </h4>
                  {commentSubmitted && (
                    <div className="p-3 bg-emerald-50 border-2 border-emerald-600 text-xs font-mono text-emerald-900 font-bold">
                      Annotation recorded successfully.
                    </div>
                  )}
                  <div className="space-y-3 text-xs font-mono">
                    <input
                      type="text"
                      placeholder="Researcher Name / Organization"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full p-2.5 bg-white border-2 border-black focus:outline-none focus:border-[#FF3B00]"
                      required
                    />
                    <textarea
                      placeholder="Enter legal citation, docket anomaly note, or discrepancy observation..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 bg-white border-2 border-black focus:outline-none focus:border-[#FF3B00]"
                      required
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-black hover:bg-[#FF3B00] text-white font-mono font-black uppercase text-xs transition cursor-pointer flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Case Annotation
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3">
                  {caseComments.map((com) => (
                    <div key={com.id} className="p-4 bg-white border-2 border-black space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-black text-black">{com.authorName}</span>
                        <span className="text-neutral-500">{com.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-800 font-sans leading-relaxed">
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
