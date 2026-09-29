import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { UserSubmission } from '../types';
import { 
  Send, 
  ShieldCheck, 
  Lock, 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  Search, 
  Filter, 
  AlertCircle,
  HelpCircle,
  Eye
} from 'lucide-react';

interface SubmissionsViewProps {
  onSelectCase: (caseId: string) => void;
}

export const SubmissionsView: React.FC<SubmissionsViewProps> = ({ onSelectCase }) => {
  const { submissions, addSubmission, cases } = useData();
  const [submitterName, setSubmitterName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState('Court Docket & Filing');
  const [caseRef, setCaseRef] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const publicSubmissions = submissions.filter((s) => s.isPublic);

  const filteredSubmissions = publicSubmissions.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.caseRef && s.caseRef.toLowerCase().includes(q))
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addSubmission({
      title: title.trim(),
      submitterName: isAnonymous ? 'Anonymous Whistleblower' : submitterName.trim() || 'Community Researcher',
      email: isAnonymous ? undefined : email.trim(),
      isAnonymous,
      category,
      caseRef: caseRef.trim() || undefined,
      description: description.trim(),
      attachedFileName: attachedFile ? attachedFile.name : undefined,
      isPublic: true
    });

    setTitle('');
    setDescription('');
    setSubmitterName('');
    setEmail('');
    setCaseRef('');
    setAttachedFile(null);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Editorial Header */}
      <div className="border-b-4 border-black pb-6 space-y-3">
        <div className="w-12 h-1.5 bg-[#FF3B00] mb-2"></div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-black text-[#FF3B00] uppercase tracking-widest">
            // SAFE DROP • CITIZEN & WHISTLEBLOWER REPOSITORY
          </span>
          <span className="text-neutral-400 font-mono text-xs hidden sm:inline">•</span>
          <span className="text-xs font-mono text-neutral-600 uppercase tracking-wider hidden sm:inline">
            AES-256 ENCRYPTED PORTAL
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-black leading-[1.08] tracking-tight">
          Public Submissions & Whistleblower Safe-Drop
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 font-serif italic max-w-3xl leading-relaxed">
          Submit documentation, municipal dockets, dispatch logs, or corroborating research regarding procedural irregularities in King County and Washington State.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Whistleblower Upload Form & Encryption Banner (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Encrypted Vault Banner */}
          <div className="bg-black text-white p-6 sm:p-8 space-y-4 border-2 border-black">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF3B00]">
                Secure Data Upload Portal
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-300">
                  Network Status: Protected
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              Submissions are recorded directly into the repository. You may submit anonymously or provide contact credentials for editorial verification follow-up.
            </p>

            <div className="border-2 border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-center hover:border-white/50 transition-all cursor-pointer bg-neutral-900/60">
              <UploadCloud className="w-8 h-8 text-neutral-400 mb-2" />
              <label htmlFor="file-upload" className="text-xs font-mono font-bold text-white cursor-pointer hover:underline">
                {attachedFile ? `Selected: ${attachedFile.name}` : 'Drop sensitive materials here or Browse Files'}
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setAttachedFile(e.target.files[0]);
                  }
                }}
              />
              <p className="text-[9px] font-mono uppercase tracking-tight text-neutral-400 mt-1">
                Accepts PDF, DOCX, CSV, JPG, PNG, MP3, MP4 • Max 50 MB
              </p>
            </div>
          </div>

          {/* Submission Form */}
          <form onSubmit={handleSubmit} className="border border-black/15 bg-white p-6 sm:p-8 space-y-5 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-neutral-900 border-b border-black/10 pb-3">
              Evidentiary Submission Form
            </h3>

            {submittedSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Submission Received.</strong>
                  <p className="mt-0.5">Your documentation has been securely appended to the repository index.</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-800 mb-1">
                  Report / Document Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Seattle Municipal Court Docket Audit - Case 664676"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-800 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-white border border-black/20 p-2 text-xs w-full focus:outline-none focus:border-black font-mono"
                  >
                    <option value="Court Docket & Filing">Court Docket & Filing</option>
                    <option value="Medical & Psychiatric Record">Medical & Psychiatric Record</option>
                    <option value="Police Dispatch & 911 Log">Police Dispatch & 911 Log</option>
                    <option value="Technical / Signal Forensic Log">Technical / Signal Forensic Log</option>
                    <option value="Sworn Witness Statement">Sworn Witness Statement</option>
                    <option value="Housing / Land Use Detainer">Housing / Land Use Detainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-800 mb-1">
                    Related Case Reference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 658931, 658959, 21-1-04347-2"
                    value={caseRef}
                    onChange={(e) => setCaseRef(e.target.value)}
                    className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-800 mb-1">
                  Evidentiary Summary & Context *
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail the procedural anomaly, date, agency involved, and specific inconsistencies..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="bg-white border border-black/20 p-2 text-xs w-full focus:outline-none focus:border-black font-sans leading-relaxed"
                />
              </div>

              {/* Submitter Info & Anonymity */}
              <div className="pt-3 border-t border-black/10 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anon"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-black text-[#FF3B00] focus:ring-[#FF3B00]"
                  />
                  <label htmlFor="anon" className="text-xs font-mono font-bold text-neutral-800 cursor-pointer">
                    Submit Anonymously (Hide Submitter Identity)
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">
                        Submitter Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your Name or Organization"
                        value={submitterName}
                        onChange={(e) => setSubmitterName(e.target.value)}
                        className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 mb-1">
                        Contact Email (Confidential)
                      </label>
                      <input
                        type="email"
                        placeholder="email@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent border-b border-black/40 pb-1 text-xs w-full focus:outline-none focus:border-black font-sans"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF3B00] hover:bg-black text-white py-3 text-xs font-serif font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" /> Submit to Investigative Repository
            </button>
          </form>

        </div>

        {/* Right Side: Public Submissions & User Database (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-2 border-black bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#FF3B00] rounded-full"></span>
                Public Submissions Database ({publicSubmissions.length})
              </h3>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search user-submitted items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-b border-black/40 pb-1 pl-8 text-xs w-full focus:outline-none focus:border-black font-mono"
              />
            </div>

            {/* Submission Cards Scrollbox */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredSubmissions.map((sub) => (
                <div key={sub.id} className="p-4 bg-white border-2 border-black space-y-2 hover:border-[#FF3B00] transition-colors">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="bg-[#FF3B00] text-white px-1.5 py-0.5 font-bold uppercase tracking-wider">
                      {sub.status}
                    </span>
                    <span className="text-neutral-500">{sub.date}</span>
                  </div>

                  <h4 className="font-serif font-bold text-sm text-neutral-900">
                    {sub.title}
                  </h4>

                  <p className="text-xs text-neutral-700 font-serif leading-relaxed">
                    {sub.description}
                  </p>

                  <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-600">
                    <span>By: <strong>{sub.submitterName}</strong></span>
                    {sub.caseRef && (
                      <button
                        onClick={() => onSelectCase(sub.caseRef!)}
                        className="text-[#FF3B00] hover:underline font-bold"
                      >
                        Case #{sub.caseRef} →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
