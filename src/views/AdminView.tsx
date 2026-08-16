import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CaseStudy, TimelineEvent, Article, EvidenceDocument, UserSubmission } from '../types';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Download, 
  Upload, 
  RefreshCw, 
  Check, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Newspaper, 
  Database, 
  Send, 
  Settings,
  X
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    cases, 
    timelineEvents, 
    articles, 
    evidence, 
    submissions, 
    settings,
    isAdmin,
    logoutAdmin,
    addCase,
    updateCase,
    deleteCase,
    addTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent,
    addArticle,
    updateArticle,
    deleteArticle,
    addEvidence,
    updateEvidence,
    deleteEvidence,
    updateSubmissionStatus,
    deleteSubmission,
    updateSettings,
    exportAllData,
    importAllData,
    resetToDefaults
  } = useData();

  const [activeTab, setActiveTab] = useState<'cases' | 'timeline' | 'articles' | 'evidence' | 'submissions' | 'settings' | 'backup'>('cases');
  const [editingCase, setEditingCase] = useState<Partial<CaseStudy> | null>(null);
  const [editingTimeline, setEditingTimeline] = useState<Partial<TimelineEvent> | null>(null);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [editingEvidence, setEditingEvidence] = useState<Partial<EvidenceDocument> | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const triggerSuccess = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => setSaveSuccessMessage(null), 3500);
  };

  // Case Save Handler
  const handleSaveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase || !editingCase.caseNumber || !editingCase.title) return;

    if (editingCase.id && cases.some((c) => c.id === editingCase.id)) {
      updateCase(editingCase.id, editingCase);
      triggerSuccess(`Case #${editingCase.caseNumber} updated successfully.`);
    } else {
      const newId = editingCase.id || editingCase.caseNumber;
      const completeCase: CaseStudy = {
        id: newId,
        caseNumber: editingCase.caseNumber,
        title: editingCase.title,
        court: editingCase.court || 'Seattle Municipal Court',
        cause: editingCase.cause || 'Procedural Audit',
        judge: editingCase.judge || 'Presiding Judge',
        disposition: editingCase.disposition || 'Under Investigation',
        status: editingCase.status || 'Case Pending',
        year: Number(editingCase.year) || 2026,
        headlineQuote: editingCase.headlineQuote || '',
        executiveSummary: editingCase.executiveSummary || '',
        contextualOrigins: editingCase.contextualOrigins || '',
        backgroundSummary: editingCase.backgroundSummary || '',
        narrativeSummary: editingCase.narrativeSummary || '',
        proceduralCollapse: editingCase.proceduralCollapse || '',
        proceduralBreach: editingCase.proceduralBreach || [],
        evidenceAndInfo: editingCase.evidenceAndInfo || [],
        constitutionalViolations: editingCase.constitutionalViolations || [],
        systemicVulnerabilities: editingCase.systemicVulnerabilities || [],
        interactionModel: editingCase.interactionModel || '',
        proposedReforms: editingCase.proposedReforms || [],
        systemicVariables: editingCase.systemicVariables || {},
        associatedDocs: editingCase.associatedDocs || [],
        tags: editingCase.tags || []
      };
      addCase(completeCase);
      triggerSuccess(`New Case #${completeCase.caseNumber} created.`);
    }
    setEditingCase(null);
  };

  // Timeline Save Handler
  const handleSaveTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTimeline || !editingTimeline.title || !editingTimeline.date) return;

    if (editingTimeline.id && timelineEvents.some((t) => t.id === editingTimeline.id)) {
      updateTimelineEvent(editingTimeline.id, editingTimeline);
      triggerSuccess('Timeline event updated.');
    } else {
      const newEvent: TimelineEvent = {
        id: `tl-${Date.now()}`,
        date: editingTimeline.date,
        title: editingTimeline.title,
        category: (editingTimeline.category as any) || 'context',
        summary: editingTimeline.summary || '',
        details: editingTimeline.details || '',
        caseRef: editingTimeline.caseRef,
        anomaly: editingTimeline.anomaly
      };
      addTimelineEvent(newEvent);
      triggerSuccess('New timeline milestone added.');
    }
    setEditingTimeline(null);
  };

  // Article Save Handler
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title) return;

    if (editingArticle.id && articles.some((a) => a.id === editingArticle.id)) {
      updateArticle(editingArticle.id, editingArticle);
      triggerSuccess('Article updated.');
    } else {
      const newArticle: Article = {
        id: `art-${Date.now()}`,
        title: editingArticle.title,
        subtitle: editingArticle.subtitle || '',
        author: editingArticle.author || settings.authorName,
        date: editingArticle.date || new Date().toISOString().split('T')[0],
        readTime: editingArticle.readTime || '5 min read',
        category: (editingArticle.category as any) || 'Investigative Report',
        featuredImage: editingArticle.featuredImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        imageCaption: editingArticle.imageCaption || 'Forensic investigation documentation.',
        summary: editingArticle.summary || '',
        content: editingArticle.content || '',
        relatedCases: editingArticle.relatedCases || [],
        tags: editingArticle.tags || [],
        isFeatured: editingArticle.isFeatured || false
      };
      addArticle(newArticle);
      triggerSuccess('New investigative article published.');
    }
    setEditingArticle(null);
  };

  // Evidence Save Handler
  const handleSaveEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvidence || !editingEvidence.title) return;

    if (editingEvidence.id && evidence.some((ev) => ev.id === editingEvidence.id)) {
      updateEvidence(editingEvidence.id, editingEvidence);
      triggerSuccess('Evidence record updated.');
    } else {
      const newDoc: EvidenceDocument = {
        id: `doc-${Date.now()}`,
        title: editingEvidence.title,
        docNumber: editingEvidence.docNumber,
        category: (editingEvidence.category as any) || 'Court Dockets',
        date: editingEvidence.date || new Date().toISOString().split('T')[0],
        entity: editingEvidence.entity || 'King County',
        classification: (editingEvidence.classification as any) || 'Public Record',
        summary: editingEvidence.summary || '',
        content: editingEvidence.content || '',
        sourceRef: editingEvidence.sourceRef || 'Public Records Archive',
        verified: true,
        fileSize: editingEvidence.fileSize || 'PDF',
        tags: editingEvidence.tags || []
      };
      addEvidence(newDoc);
      triggerSuccess('New evidence record cataloged.');
    }
    setEditingEvidence(null);
  };

  const handleExport = () => {
    const dataStr = exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demopocrisy_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    if (importAllData(importJsonText)) {
      triggerSuccess('Database restored from JSON backup.');
      setImportJsonText('');
    } else {
      alert('Failed to parse JSON backup. Please verify format.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Admin Top Header */}
      <div className="border-b-2 border-neutral-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="bg-emerald-800 text-emerald-100 text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Admin CMS Mode Active
            </span>
            <span className="text-[10px] font-mono text-black/60 uppercase tracking-[0.15em]">
              Demopocrisy Content Control Panel
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 font-serif leading-tight">
            Editorial Management System
          </h2>
        </div>

        <button
          onClick={logoutAdmin}
          className="bg-neutral-800 hover:bg-black text-white px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer"
        >
          Exit Admin Mode
        </button>
      </div>

      {saveSuccessMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs font-mono text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-1.5 border-b border-black/10 overflow-x-auto text-xs font-mono">
        {[
          { id: 'cases', label: `Cases (${cases.length})`, icon: FileText },
          { id: 'timeline', label: `Timeline (${timelineEvents.length})`, icon: Clock },
          { id: 'articles', label: `News & Articles (${articles.length})`, icon: Newspaper },
          { id: 'evidence', label: `Evidence (${evidence.length})`, icon: Database },
          { id: 'submissions', label: `Submissions (${submissions.length})`, icon: Send },
          { id: 'settings', label: 'Site Settings', icon: Settings },
          { id: 'backup', label: 'Export / Import', icon: Download }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-3.5 uppercase tracking-wider text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-[#faf9f6] text-neutral-700 hover:bg-neutral-200 border border-neutral-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CASES MANAGEMENT */}
      {activeTab === 'cases' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-black pb-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900">
              Manage Master Case Studies ({cases.length})
            </h3>
            <button
              onClick={() => setEditingCase({
                caseNumber: '',
                title: '',
                court: 'Seattle Municipal Court',
                cause: '',
                judge: '',
                disposition: 'Dismissed Without Prejudice',
                status: 'Dismissed',
                year: 2026,
                executiveSummary: '',
                proceduralCollapse: '',
                proceduralBreach: [],
                evidenceAndInfo: [],
                constitutionalViolations: [],
                systemicVulnerabilities: [],
                proposedReforms: [],
                associatedDocs: [],
                tags: []
              })}
              className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Case Dossier
            </button>
          </div>

          {editingCase ? (
            <form onSubmit={handleSaveCase} className="bg-white border-2 border-black p-6 space-y-4 shadow-md">
              <div className="flex justify-between items-center border-b border-black/10 pb-3">
                <h4 className="font-serif font-bold text-lg text-neutral-900">
                  {editingCase.id ? `Edit Case #${editingCase.caseNumber}` : 'Create New Legal Case Dossier'}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="text-neutral-400 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Case Number *</label>
                  <input
                    type="text"
                    value={editingCase.caseNumber || ''}
                    onChange={(e) => setEditingCase({ ...editingCase, caseNumber: e.target.value })}
                    required
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Court Jurisdiction *</label>
                  <input
                    type="text"
                    value={editingCase.court || ''}
                    onChange={(e) => setEditingCase({ ...editingCase, court: e.target.value })}
                    required
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Status</label>
                  <select
                    value={editingCase.status || 'Dismissed'}
                    onChange={(e) => setEditingCase({ ...editingCase, status: e.target.value as any })}
                    className="bg-white border border-black/20 p-1.5 text-xs w-full font-mono"
                  >
                    <option value="Dismissed">Dismissed</option>
                    <option value="Dismissed w/o Prejudice">Dismissed w/o Prejudice</option>
                    <option value="Case Pending">Case Pending</option>
                    <option value="Judgement Satisfied">Judgement Satisfied</option>
                    <option value="Under Investigation">Under Investigation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Case Title *</label>
                  <input
                    type="text"
                    value={editingCase.title || ''}
                    onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                    required
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-serif font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Cause of Action *</label>
                  <input
                    type="text"
                    value={editingCase.cause || ''}
                    onChange={(e) => setEditingCase({ ...editingCase, cause: e.target.value })}
                    required
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Presiding Judge</label>
                  <input
                    type="text"
                    value={editingCase.judge || ''}
                    onChange={(e) => setEditingCase({ ...editingCase, judge: e.target.value })}
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Disposition</label>
                  <input
                    type="text"
                    value={editingCase.disposition || ''}
                    onChange={(e) => setEditingCase({ ...editingCase, disposition: e.target.value })}
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Year</label>
                  <input
                    type="number"
                    value={editingCase.year || 2026}
                    onChange={(e) => setEditingCase({ ...editingCase, year: Number(e.target.value) })}
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Executive Summary</label>
                <textarea
                  rows={3}
                  value={editingCase.executiveSummary || ''}
                  onChange={(e) => setEditingCase({ ...editingCase, executiveSummary: e.target.value })}
                  className="w-full bg-white border border-black/20 p-2 text-xs focus:outline-none focus:border-black font-sans leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="px-4 py-2 bg-neutral-200 text-neutral-800 text-xs font-mono font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white text-xs font-mono font-bold uppercase hover:bg-red-700 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Save Case
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {cases.map((c) => (
                <div key={c.id} className="p-4 bg-white border border-neutral-300 flex justify-between items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-neutral-900 text-white px-2 py-0.5">#{c.caseNumber}</span>
                      <span className="text-xs text-red-700 font-semibold">{c.court}</span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-neutral-900 mt-1">{c.title}</h4>
                    <p className="text-xs text-neutral-600 line-clamp-1 font-sans">{c.cause} • {c.disposition}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingCase(c)}
                      className="p-2 text-neutral-600 hover:text-black border border-neutral-300 hover:bg-neutral-100"
                      title="Edit Case"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete case #${c.caseNumber}?`)) {
                          deleteCase(c.id);
                          triggerSuccess(`Case #${c.caseNumber} deleted.`);
                        }
                      }}
                      className="p-2 text-red-600 hover:text-red-800 border border-red-200 hover:bg-red-50"
                      title="Delete Case"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TIMELINE MANAGEMENT */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-black pb-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900">
              Manage Chronological Events ({timelineEvents.length})
            </h3>
            <button
              onClick={() => setEditingTimeline({
                date: new Date().toISOString().split('T')[0],
                title: '',
                category: 'context',
                summary: '',
                details: '',
                anomaly: ''
              })}
              className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Milestone
            </button>
          </div>

          {editingTimeline ? (
            <form onSubmit={handleSaveTimeline} className="bg-white border-2 border-black p-6 space-y-4 shadow-md">
              <h4 className="font-serif font-bold text-lg text-neutral-900 border-b border-black/10 pb-3">
                {editingTimeline.id ? 'Edit Timeline Event' : 'Add New Chronological Milestone'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Date *</label>
                  <input
                    type="text"
                    value={editingTimeline.date || ''}
                    onChange={(e) => setEditingTimeline({ ...editingTimeline, date: e.target.value })}
                    required
                    placeholder="YYYY-MM-DD or MM/DD/YYYY"
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Category</label>
                  <select
                    value={editingTimeline.category || 'context'}
                    onChange={(e) => setEditingTimeline({ ...editingTimeline, category: e.target.value as any })}
                    className="bg-white border border-black/20 p-1.5 text-xs w-full font-mono"
                  >
                    <option value="arrest">Arrest & Custody</option>
                    <option value="medical">Medical & Hospital</option>
                    <option value="court">Court & Competency</option>
                    <option value="housing">Housing & Detainer</option>
                    <option value="context">Data Breaches & Context</option>
                    <option value="milestone">Forensic Milestone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Related Case #</label>
                  <input
                    type="text"
                    value={editingTimeline.caseRef || ''}
                    onChange={(e) => setEditingTimeline({ ...editingTimeline, caseRef: e.target.value })}
                    placeholder="e.g. 658931"
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Title *</label>
                <input
                  type="text"
                  value={editingTimeline.title || ''}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, title: e.target.value })}
                  required
                  className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-serif font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Brief Summary</label>
                <input
                  type="text"
                  value={editingTimeline.summary || ''}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, summary: e.target.value })}
                  className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Full Detailed Narrative</label>
                <textarea
                  rows={3}
                  value={editingTimeline.details || ''}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, details: e.target.value })}
                  className="w-full bg-white border border-black/20 p-2 text-xs focus:outline-none focus:border-black font-sans leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setEditingTimeline(null)}
                  className="px-4 py-2 bg-neutral-200 text-neutral-800 text-xs font-mono font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white text-xs font-mono font-bold uppercase hover:bg-red-700 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Save Milestone
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              {timelineEvents.map((evt) => (
                <div key={evt.id} className="p-3 bg-white border border-neutral-300 flex justify-between items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="font-bold text-red-700">{evt.date}</span>
                      <span className="text-neutral-500 uppercase">[{evt.category}]</span>
                      {evt.caseRef && <span className="text-black">Case #{evt.caseRef}</span>}
                    </div>
                    <h5 className="font-serif font-bold text-sm text-neutral-900 mt-0.5">{evt.title}</h5>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingTimeline(evt)}
                      className="p-1.5 text-neutral-600 hover:text-black border border-neutral-300"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete event "${evt.title}"?`)) {
                          deleteTimelineEvent(evt.id);
                          triggerSuccess('Timeline event deleted.');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 border border-red-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ARTICLES MANAGEMENT */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-black pb-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900">
              Manage Investigative Articles & Video Feeds ({articles.length})
            </h3>
            <button
              onClick={() => setEditingArticle({
                title: '',
                subtitle: '',
                author: settings.authorName,
                date: new Date().toISOString().split('T')[0],
                readTime: '6 min read',
                category: 'Investigative Report',
                featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
                imageCaption: 'Forensic reporting document image.',
                summary: '',
                content: '',
                relatedCases: [],
                tags: [],
                isFeatured: false
              })}
              className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Publish New Report
            </button>
          </div>

          {editingArticle ? (
            <form onSubmit={handleSaveArticle} className="bg-white border-2 border-black p-6 space-y-4 shadow-md">
              <h4 className="font-serif font-bold text-lg text-neutral-900 border-b border-black/10 pb-3">
                {editingArticle.id ? 'Edit Report' : 'Draft New Investigative Article'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Category</label>
                  <select
                    value={editingArticle.category || 'Investigative Report'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as any })}
                    className="bg-white border border-black/20 p-1.5 text-xs w-full font-mono"
                  >
                    <option value="Investigative Report">Investigative Report</option>
                    <option value="Legal Audit">Legal Audit</option>
                    <option value="Forensics">Forensics</option>
                    <option value="Deep Dive">Deep Dive</option>
                    <option value="Commentary">Commentary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Author</label>
                  <input
                    type="text"
                    value={editingArticle.author || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingArticle.readTime || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    placeholder="e.g. 7 min read"
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Article Title *</label>
                <input
                  type="text"
                  value={editingArticle.title || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  required
                  className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-serif font-bold text-base"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Subtitle / Lead Line</label>
                <input
                  type="text"
                  value={editingArticle.subtitle || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, subtitle: e.target.value })}
                  className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-serif italic"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={editingArticle.featuredImage || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, featuredImage: e.target.value })}
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Video Stream URL (Optional)</label>
                  <input
                    type="text"
                    value={editingArticle.videoUrl || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, videoUrl: e.target.value })}
                    placeholder="https://..."
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Full Article Body Content</label>
                <textarea
                  rows={6}
                  value={editingArticle.content || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full bg-white border border-black/20 p-2 text-xs focus:outline-none focus:border-black font-sans leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 bg-neutral-200 text-neutral-800 text-xs font-mono font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white text-xs font-mono font-bold uppercase hover:bg-red-700 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Save & Publish Report
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {articles.map((art) => (
                <div key={art.id} className="p-4 bg-white border border-neutral-300 flex justify-between items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                      <span className="bg-red-700 text-white px-1.5 py-0.5 font-bold uppercase">{art.category}</span>
                      <span>{art.date}</span>
                    </div>
                    <h5 className="font-serif font-bold text-base text-neutral-900 mt-1">{art.title}</h5>
                    <p className="text-xs text-neutral-600 line-clamp-1 font-sans">{art.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingArticle(art)}
                      className="p-1.5 text-neutral-600 hover:text-black border border-neutral-300"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete article "${art.title}"?`)) {
                          deleteArticle(art.id);
                          triggerSuccess('Article deleted.');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 border border-red-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: EVIDENCE MANAGEMENT */}
      {activeTab === 'evidence' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-black pb-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900">
              Manage Evidence Repository Records ({evidence.length})
            </h3>
            <button
              onClick={() => setEditingEvidence({
                title: '',
                category: 'Court Dockets',
                date: new Date().toISOString().split('T')[0],
                entity: 'Seattle Municipal Court',
                classification: 'Public Record',
                summary: '',
                content: '',
                sourceRef: 'Official Court Record',
                tags: []
              })}
              className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Evidence File
            </button>
          </div>

          {editingEvidence ? (
            <form onSubmit={handleSaveEvidence} className="bg-white border-2 border-black p-6 space-y-4 shadow-md">
              <h4 className="font-serif font-bold text-lg text-neutral-900 border-b border-black/10 pb-3">
                {editingEvidence.id ? 'Edit Evidence Document' : 'Catalog New Evidence File'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Category</label>
                  <select
                    value={editingEvidence.category || 'Court Dockets'}
                    onChange={(e) => setEditingEvidence({ ...editingEvidence, category: e.target.value as any })}
                    className="bg-white border border-black/20 p-1.5 text-xs w-full font-mono"
                  >
                    <option value="Court Dockets">Court Dockets</option>
                    <option value="Medical & Lab">Medical & Lab</option>
                    <option value="Network Logs & Traceroutes">Network Logs & Traceroutes</option>
                    <option value="Police & Dispatch">Police & Dispatch</option>
                    <option value="Media & Interviews">Media & Interviews</option>
                    <option value="Property & Deeds">Property & Deeds</option>
                    <option value="Sworn Statements">Sworn Statements</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Classification</label>
                  <select
                    value={editingEvidence.classification || 'Public Record'}
                    onChange={(e) => setEditingEvidence({ ...editingEvidence, classification: e.target.value as any })}
                    className="bg-white border border-black/20 p-1.5 text-xs w-full font-mono"
                  >
                    <option value="Public Record">Public Record</option>
                    <option value="Medical Record">Medical Record</option>
                    <option value="Forensic Log">Forensic Log</option>
                    <option value="Sworn Affidavit">Sworn Affidavit</option>
                    <option value="FOIA Record">FOIA Record</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Document #</label>
                  <input
                    type="text"
                    value={editingEvidence.docNumber || ''}
                    onChange={(e) => setEditingEvidence({ ...editingEvidence, docNumber: e.target.value })}
                    placeholder="e.g. DKT-658931-DISM"
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Document Title *</label>
                <input
                  type="text"
                  value={editingEvidence.title || ''}
                  onChange={(e) => setEditingEvidence({ ...editingEvidence, title: e.target.value })}
                  required
                  className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-serif font-bold text-base"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Evidentiary Summary</label>
                <textarea
                  rows={2}
                  value={editingEvidence.summary || ''}
                  onChange={(e) => setEditingEvidence({ ...editingEvidence, summary: e.target.value })}
                  className="w-full bg-white border border-black/20 p-2 text-xs focus:outline-none focus:border-black font-sans leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Archived Content Transcript / Text</label>
                <textarea
                  rows={4}
                  value={editingEvidence.content || ''}
                  onChange={(e) => setEditingEvidence({ ...editingEvidence, content: e.target.value })}
                  className="w-full bg-white border border-black/20 p-2 text-xs focus:outline-none focus:border-black font-mono leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setEditingEvidence(null)}
                  className="px-4 py-2 bg-neutral-200 text-neutral-800 text-xs font-mono font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white text-xs font-mono font-bold uppercase hover:bg-red-700 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Save Record
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {evidence.map((doc) => (
                <div key={doc.id} className="p-4 bg-white border border-neutral-300 flex justify-between items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                      <span className="bg-neutral-900 text-white px-1.5 py-0.5 font-bold uppercase">{doc.classification}</span>
                      <span className="text-red-700 font-bold">{doc.category}</span>
                      <span>{doc.date}</span>
                    </div>
                    <h5 className="font-serif font-bold text-base text-neutral-900 mt-1">{doc.title}</h5>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingEvidence(doc)}
                      className="p-1.5 text-neutral-600 hover:text-black border border-neutral-300"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete record "${doc.title}"?`)) {
                          deleteEvidence(doc.id);
                          triggerSuccess('Record deleted.');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 border border-red-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SUBMISSIONS MODERATION */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <div className="border-b border-black pb-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900">
              Moderate User Submissions & Whistleblower Data ({submissions.length})
            </h3>
          </div>

          <div className="space-y-3">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-4 bg-white border border-neutral-300 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 font-bold uppercase text-[10px] ${
                      sub.status === 'Verified' 
                        ? 'bg-emerald-800 text-emerald-100'
                        : sub.status === 'Pending'
                        ? 'bg-amber-700 text-amber-100'
                        : 'bg-neutral-600 text-white'
                    }`}>
                      {sub.status}
                    </span>
                    <strong className="text-black">{sub.submitterName}</strong>
                    {sub.email && <span className="text-neutral-500">({sub.email})</span>}
                  </div>
                  <span className="text-neutral-500">{sub.date}</span>
                </div>

                <h4 className="font-serif font-bold text-sm text-neutral-900">{sub.title}</h4>
                <p className="text-xs text-neutral-700 font-sans">{sub.description}</p>
                {sub.attachedFileName && (
                  <div className="text-[11px] font-mono text-neutral-500 bg-[#faf9f6] p-1.5 border border-neutral-200">
                    Attachment: <strong>{sub.attachedFileName}</strong>
                  </div>
                )}

                <div className="pt-2 flex justify-between items-center text-xs font-mono">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        updateSubmissionStatus(sub.id, 'Verified');
                        triggerSuccess('Submission marked as Verified.');
                      }}
                      className="px-2 py-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold rounded"
                    >
                      Verify & Approve
                    </button>
                    <button
                      onClick={() => {
                        updateSubmissionStatus(sub.id, 'Pending');
                        triggerSuccess('Submission set to Pending.');
                      }}
                      className="px-2 py-1 bg-amber-100 text-amber-800 hover:bg-amber-200 font-bold rounded"
                    >
                      Mark Pending
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Delete this submission record?')) {
                        deleteSubmission(sub.id);
                        triggerSuccess('Submission deleted.');
                      }
                    }}
                    className="text-red-600 hover:underline font-bold"
                  >
                    Delete Record
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: GLOBAL SITE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white border-2 border-black p-6 space-y-6 shadow-md max-w-3xl">
          <h3 className="font-serif font-bold text-xl text-neutral-900 border-b border-black/10 pb-3">
            Global Masthead & Editorial Settings
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Site Title</label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => updateSettings({ siteTitle: e.target.value })}
                className="bg-transparent border-b border-black/40 pb-1 text-base w-full focus:outline-none focus:border-black font-brand font-black"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Site Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => updateSettings({ tagline: e.target.value })}
                className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-serif italic"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Top Breaking Announcement Banner</label>
              <input
                type="text"
                value={settings.announcement}
                onChange={(e) => updateSettings({ announcement: e.target.value })}
                className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Author Name</label>
                <input
                  type="text"
                  value={settings.authorName}
                  onChange={(e) => updateSettings({ authorName: e.target.value })}
                  className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-sans"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Author Email</label>
                <input
                  type="email"
                  value={settings.authorEmail}
                  onChange={(e) => updateSettings({ authorEmail: e.target.value })}
                  className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">Majorat Corridor Name</label>
              <input
                type="text"
                value={settings.majoratCorridorName}
                onChange={(e) => updateSettings({ majoratCorridorName: e.target.value })}
                className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-black/10">
            <button
              onClick={() => triggerSuccess('Site settings updated.')}
              className="bg-black text-white px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider hover:bg-red-700"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* TAB 7: BACKUP / RESTORE */}
      {activeTab === 'backup' && (
        <div className="bg-white border-2 border-black p-6 space-y-6 shadow-md max-w-3xl">
          <h3 className="font-serif font-bold text-xl text-neutral-900 border-b border-black/10 pb-3">
            Database Backup & Portability
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-[#faf9f6] border border-black/15 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase text-neutral-900 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-red-700" /> Export Database Bundle
              </h4>
              <p className="text-xs text-neutral-600 font-sans">
                Export all cases, timeline milestones, articles, evidence records, submissions, and site settings into a standalone JSON file for secure offline backup.
              </p>
              <button
                onClick={handleExport}
                className="bg-black text-white px-4 py-2 text-xs font-mono font-bold uppercase hover:bg-red-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download Database JSON
              </button>
            </div>

            <div className="p-4 bg-[#faf9f6] border border-black/15 space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase text-neutral-900 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-red-700" /> Import JSON Backup
              </h4>
              <p className="text-xs text-neutral-600 font-sans">
                Paste JSON content below to restore all database collections.
              </p>
              <textarea
                rows={4}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Paste JSON export here: { "cases": [...], "timelineEvents": [...] }'
                className="w-full bg-white border border-black/20 p-2 text-xs font-mono"
              />
              <button
                onClick={handleImport}
                className="bg-neutral-900 text-white px-4 py-2 text-xs font-mono font-bold uppercase hover:bg-red-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" /> Import & Overwrite
              </button>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase text-red-900 flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-red-700" /> Reset to Master Initial Data
              </h4>
              <p className="text-xs text-red-800 font-sans">
                Revert all modified collections back to the master 2021–2026 Demopocrisy archive defaults.
              </p>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all data to defaults?')) {
                    resetToDefaults();
                    triggerSuccess('Database restored to default archive.');
                  }
                }}
                className="bg-red-700 text-white px-4 py-2 text-xs font-mono font-bold uppercase hover:bg-red-800 cursor-pointer"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
