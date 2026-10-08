import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { EvidenceDocument } from '../types';
import { 
  Database, 
  Search, 
  Download, 
  Eye, 
  X
} from 'lucide-react';

interface EvidenceViewProps {
  selectedEvidenceId?: string;
  onSelectEvidence: (evidenceId: string) => void;
  onSelectCase: (caseId: string) => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({
  selectedEvidenceId,
  onSelectEvidence,
  onSelectCase
}) => {
  const { evidence } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activePreviewDoc, setActivePreviewDoc] = useState<EvidenceDocument | null>(() => {
    return evidence.find((e) => e.id === selectedEvidenceId) || null;
  });

  const categories = [
    { id: 'all', label: 'All Evidence' },
    { id: 'Court Dockets', label: 'Court Dockets' },
    { id: 'Medical & Lab', label: 'Medical & Lab' },
    { id: 'Network Logs & Traceroutes', label: 'Network Logs' },
    { id: 'Police & Dispatch', label: 'Police Reports' },
    { id: 'Media & Interviews', label: 'Media & Audio' },
    { id: 'Property & Deeds', label: 'Property Records' },
    { id: 'Sworn Statements', label: 'Affidavits' }
  ];

  const filteredEvidence = evidence.filter((doc) => {
    const matchesCat = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.docNumber && doc.docNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleDownloadDoc = (doc: EvidenceDocument) => {
    const blob = new Blob([
      `DOCUMENT: ${doc.title}\nID: ${doc.id}\nCLASSIFICATION: ${doc.classification}\nDATE: ${doc.date}\nENTITY: ${doc.entity}\n\nSUMMARY:\n${doc.summary}\n\nCONTENT / EVIDENCE LOG:\n${doc.content}`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_Archive.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12 bg-white overflow-x-hidden">
      
      {/* Editorial Header */}
      <div className="border-b-4 border-black pb-6 space-y-2">
        <div className="w-12 h-1.5 bg-[#FF3B00] mb-2"></div>
        <div className="text-xs font-mono font-black text-[#FF3B00] uppercase tracking-widest">
          // ARCHIVAL REPOSITORY • PRIMARY SOURCES
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-black tracking-tight leading-[1.08]">
          Evidence Locker & Legal Archive
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 font-serif italic max-w-3xl leading-relaxed">
          A searchable forensic vault of municipal court dockets, hospital spinal tap records, network logs, police dispatch records, and sworn whistleblower affidavits.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-2 border-black p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#FF3B00] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search evidence archive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border-2 border-black focus:outline-none focus:border-[#FF3B00] font-mono font-bold"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs font-mono pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 uppercase text-[11px] font-bold transition cursor-pointer border whitespace-nowrap ${
                categoryFilter === cat.id
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black hover:bg-neutral-100 border-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-black pb-2 text-xs font-mono">
          <span className="font-black uppercase tracking-wider text-black flex items-center gap-2">
            <Database className="w-4 h-4 text-[#FF3B00]" />
            Records Catalog ({filteredEvidence.length} Entries)
          </span>
          <span className="text-neutral-500">Public Accountability Vault</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvidence.map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                setActivePreviewDoc(doc);
                onSelectEvidence(doc.id);
              }}
              className="bg-white border-2 border-black hover:border-[#FF3B00] transition-all flex flex-col justify-between cursor-pointer group shadow-xs"
            >
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black bg-black text-white px-2 py-0.5 uppercase tracking-wider">
                    {doc.classification}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 font-bold">
                    {doc.date}
                  </span>
                </div>

                <div className="text-xs font-mono text-[#FF3B00] font-bold uppercase tracking-wider">
                  {doc.category}
                </div>

                <h4 className="font-serif font-black text-lg text-black group-hover:text-[#FF3B00] transition-colors leading-snug">
                  {doc.title}
                </h4>

                <p className="text-xs text-neutral-700 font-serif line-clamp-3 leading-relaxed">
                  {doc.summary}
                </p>

                <div className="text-xs font-mono text-neutral-700 bg-neutral-50 p-3 border border-neutral-200 space-y-1">
                  <div><strong className="text-black font-black">Entity:</strong> {doc.entity}</div>
                  {doc.docNumber && <div><strong className="text-black font-black">Doc #:</strong> {doc.docNumber}</div>}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">{doc.fileSize || 'PDF File'}</span>
                <span className="text-black font-black group-hover:text-[#FF3B00] flex items-center gap-1 uppercase tracking-wider">
                  Inspect Record <Eye className="w-3.5 h-3.5 text-[#FF3B00]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Detail Full Modal */}
      {activePreviewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div 
            className="w-full max-w-3xl bg-white border-4 border-black text-black my-8 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Bar */}
            <div className="bg-black text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-[#FF3B00]">
              <div className="flex items-center gap-2">
                <span className="bg-[#FF3B00] text-white text-[10px] px-2.5 py-0.5 font-mono font-black uppercase tracking-wider">
                  {activePreviewDoc.classification}
                </span>
                <span className="text-xs font-mono text-neutral-300">
                  {activePreviewDoc.date} • {activePreviewDoc.entity}
                </span>
              </div>
              <button
                onClick={() => setActivePreviewDoc(null)}
                className="text-neutral-400 hover:text-white p-1 cursor-pointer"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Document Content */}
            <div className="p-5 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
              <div className="border-b-2 border-black pb-4 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF3B00] font-bold">
                  {activePreviewDoc.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-black leading-tight">
                  {activePreviewDoc.title}
                </h2>
                {activePreviewDoc.docNumber && (
                  <p className="text-xs font-mono text-neutral-600">
                    Official Reference Code: <strong className="text-black font-black">{activePreviewDoc.docNumber}</strong>
                  </p>
                )}
              </div>

              {/* Summary Blockquote */}
              <div className="text-base sm:text-lg leading-relaxed text-neutral-800 font-serif italic border-l-4 border-[#FF3B00] pl-4">
                {activePreviewDoc.summary}
              </div>

              {/* Raw Record Transcript / Content */}
              <div className="p-4 sm:p-5 bg-neutral-50 border-2 border-black font-serif text-xs text-neutral-900 leading-relaxed space-y-2">
                <div className="text-[11px] uppercase font-mono font-bold text-neutral-600 border-b border-neutral-300 pb-2 mb-3 flex items-center justify-between">
                  <span className="text-black font-black">Archived Text & Docket Findings</span>
                  <span className="text-[#FF3B00] font-bold">Verified Primary Source</span>
                </div>
                <div className="font-mono text-xs text-neutral-800 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {activePreviewDoc.content}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 bg-neutral-100 border-t-2 border-black flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono">
              <span className="text-neutral-600 truncate max-w-xs">Source: {activePreviewDoc.sourceRef}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownloadDoc(activePreviewDoc)}
                  className="bg-[#FF3B00] hover:bg-black text-white px-5 py-2.5 text-xs font-mono font-black uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download Record
                </button>
                <button
                  onClick={() => setActivePreviewDoc(null)}
                  className="bg-black text-white hover:bg-neutral-800 px-4 py-2.5 text-xs font-mono font-bold uppercase cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
