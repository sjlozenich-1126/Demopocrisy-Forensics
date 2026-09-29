import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Search, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface TimelineViewProps {
  onSelectCase: (caseId: string) => void;
  selectedTimelineId?: string;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ onSelectCase, selectedTimelineId }) => {
  const { timelineEvents } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(selectedTimelineId || null);

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'arrest', label: 'Arrests & Custody' },
    { id: 'medical', label: 'Medical & Hospital' },
    { id: 'court', label: 'Court & Competency' },
    { id: 'housing', label: 'Housing & Detainer' },
    { id: 'context', label: 'Data Breaches' },
    { id: 'milestone', label: 'Milestones' },
  ];

  const filteredEvents = timelineEvents.filter((evt) => {
    const matchesCat = selectedCategory === 'all' || evt.category === selectedCategory;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12 bg-white overflow-x-hidden">
      
      {/* Page Header */}
      <div className="border-b-4 border-black pb-6 space-y-2">
        <div className="w-12 h-1.5 bg-[#FF3B00] mb-2"></div>
        <div className="text-xs font-mono font-black text-[#FF3B00] uppercase tracking-widest">
          // CHRONOLOGICAL AUDIT • FIVE-YEAR RECONSTRUCTION
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black font-serif leading-[1.08] tracking-tight">
          Narrative Timeline (2020–2026)
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 font-serif italic max-w-3xl leading-relaxed">
          A forensic chronological reconstruction of legal and institutional encounters compiled from case dockets, jail intake logs, spinal fluid panels, and competency delays.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-2 border-black p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#FF3B00] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search timeline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border-2 border-black focus:outline-none focus:border-[#FF3B00] font-mono font-bold"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs font-mono pb-1 md:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 uppercase text-[11px] font-bold transition cursor-pointer border whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black hover:bg-neutral-100 border-neutral-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Quick Jump */}
      <div className="bg-neutral-50 border-2 border-black p-3 sm:p-4 flex items-center overflow-x-auto text-xs font-serif gap-3">
        <span className="text-[#FF3B00] font-mono font-black uppercase text-[11px] tracking-wider shrink-0">// CHAPTERS:</span>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-neutral-800 font-bold text-xs">
          <span>Ch. 1: Origins (2020)</span>
          <span className="text-neutral-400">•</span>
          <span>Ch. 2: First Arrests (2021)</span>
          <span className="text-neutral-400">•</span>
          <span>Ch. 3: Felony Case (2021–2022)</span>
          <span className="text-neutral-400">•</span>
          <span>Ch. 4: Gov Case (2022–2023)</span>
          <span className="text-neutral-400">•</span>
          <span>Ch. 5: Housing (2023–2025)</span>
          <span className="text-neutral-400">•</span>
          <span>Ch. 6: Restored (2026)</span>
        </div>
      </div>

      {/* Timeline Stream with Safe Mobile Margins */}
      <div className="relative pl-6 sm:pl-10 border-l-4 border-black space-y-6 sm:space-y-8 my-6 sm:my-8 ml-4 sm:ml-8">
        {filteredEvents.map((evt, index) => {
          const isExpanded = expandedId === evt.id;
          return (
            <div key={evt.id} className="relative group">
              {/* Timeline Pin Indicator */}
              <div className={`absolute -left-[38px] sm:-left-[54px] top-2 w-6 h-6 sm:w-7 sm:h-7 border-2 border-black shadow-xs flex items-center justify-center text-[10px] sm:text-xs font-mono font-black ${
                evt.category === 'arrest'
                  ? 'bg-[#FF3B00] text-white'
                  : evt.category === 'medical'
                  ? 'bg-black text-[#FF3B00]'
                  : evt.category === 'court'
                  ? 'bg-black text-white'
                  : evt.category === 'milestone'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-800 text-white'
              }`}>
                {index + 1}
              </div>

              {/* Event Card */}
              <div className="bg-white border-2 border-black hover:border-[#FF3B00] p-4 sm:p-6 shadow-xs transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-white bg-black px-2.5 py-0.5">
                      {evt.date}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-[#FF3B00] text-white px-2 py-0.5 font-bold">
                      {evt.category}
                    </span>
                  </div>
                  {evt.location && (
                    <span className="text-xs font-mono text-neutral-600 font-bold">
                      {evt.location}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-black text-xl sm:text-2xl text-black leading-tight mt-2">
                  {evt.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-700 font-serif leading-relaxed mt-2">
                  {evt.summary}
                </p>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t-2 border-neutral-200 space-y-4 animate-in fade-in">
                    <div className="p-4 bg-neutral-50 border border-neutral-300 font-serif text-xs text-neutral-800 leading-relaxed space-y-2">
                      <div className="font-mono text-[10px] uppercase font-bold text-neutral-500">
                        Detailed Narrative & Docket Analysis
                      </div>
                      <p>{evt.details}</p>
                    </div>

                    {evt.keyEntities && evt.keyEntities.length > 0 && (
                      <div>
                        <div className="text-[10px] font-mono uppercase font-bold text-[#FF3B00] mb-1">
                          Key Institutional Entities
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {evt.keyEntities.map((ent, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-[11px] font-mono bg-neutral-100 text-black border border-neutral-300 font-bold">
                              {ent}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {evt.relatedCaseId && (
                      <div className="pt-2">
                        <button
                          onClick={() => onSelectCase(evt.relatedCaseId!)}
                          className="px-4 py-2 bg-black hover:bg-[#FF3B00] text-white text-xs font-mono font-bold uppercase transition cursor-pointer"
                        >
                          Inspect Case Dossier ({evt.relatedCaseId}) →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Toggle Button */}
                <div className="mt-4 pt-3 border-t border-neutral-200 flex justify-between items-center text-xs font-mono">
                  <button
                    onClick={() => toggleExpand(evt.id)}
                    className="text-black font-black hover:text-[#FF3B00] flex items-center gap-1 cursor-pointer uppercase tracking-wider"
                  >
                    {isExpanded ? (
                      <>Collapse Record <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Examine Chronology Details <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                  <span className="text-neutral-400 text-[10px]">
                    Event #{index + 1}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
