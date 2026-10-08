import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { formatTitleCase } from '../lib/formatters';
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  Clock,
  MapPin,
  ExternalLink
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 bg-white">
      
      {/* Editorial Header - ProPublica Style with hairline divider */}
      <div className="border-b border-neutral-200 pb-6 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-sans font-bold text-[#FF3B00] uppercase tracking-wider">
            Chronological Audit · Five-Year Reconstruction
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-neutral-900 tracking-tight leading-[1.12]">
          Narrative Timeline (2020–2026)
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 font-serif max-w-3xl leading-relaxed">
          A forensic chronological reconstruction of legal and institutional encounters compiled from case dockets, jail intake logs, spinal fluid panels, and competency delays.
        </p>
      </div>

      {/* Filter and Search Bar - Thin 1px borders */}
      <div className="bg-white border border-neutral-200 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search timeline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50/70 border border-neutral-200 focus:outline-none focus:border-[#FF3B00] font-sans font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs font-sans pb-1 md:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-medium transition cursor-pointer border whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Quick Jump - Light hairline container */}
      <div className="bg-neutral-50/70 border border-neutral-200 p-3 sm:p-4 flex items-center overflow-x-auto text-xs font-sans gap-3">
        <span className="text-[#FF3B00] font-bold uppercase text-[11px] tracking-wider shrink-0">
          Chapters:
        </span>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-neutral-700 font-medium text-xs">
          <span>Ch. 1: Origins (2020)</span>
          <span className="text-neutral-300">•</span>
          <span>Ch. 2: First Arrests (2021)</span>
          <span className="text-neutral-300">•</span>
          <span>Ch. 3: Felony Case (2021–2022)</span>
          <span className="text-neutral-300">•</span>
          <span>Ch. 4: Gov Case (2022–2023)</span>
          <span className="text-neutral-300">•</span>
          <span>Ch. 5: Housing (2023–2025)</span>
          <span className="text-neutral-300">•</span>
          <span>Ch. 6: Restored (2026)</span>
        </div>
      </div>

      {/* Timeline Stream with 2px hairline spine and spacious padding */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-neutral-200 space-y-6 sm:space-y-8 my-6 sm:my-8 ml-4 sm:ml-8">
        {filteredEvents.map((evt, index) => {
          const isExpanded = expandedId === evt.id;
          return (
            <div key={evt.id} className="relative group">
              {/* Timeline Pin Indicator - Refined 1px outline */}
              <div className={`absolute -left-[35px] sm:-left-[51px] top-3 w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full border border-neutral-300 shadow-xs flex items-center justify-center text-[10px] font-sans font-bold ${
                evt.category === 'arrest'
                  ? 'bg-[#FF3B00] text-white border-[#FF3B00]'
                  : evt.category === 'medical'
                  ? 'bg-neutral-900 text-[#FF3B00] border-neutral-800'
                  : evt.category === 'court'
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : evt.category === 'milestone'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-neutral-700 text-white border-neutral-700'
              }`}>
                {index + 1}
              </div>

              {/* Event Card with thin 1px hairline border and comfortable padding */}
              <div className="bg-white border border-neutral-200 hover:border-neutral-400 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                      {evt.date}
                    </span>
                    <span className="text-[10px] font-sans uppercase font-bold text-[#FF3B00] bg-red-50 px-2 py-0.5 border border-red-100">
                      {evt.category}
                    </span>
                    {evt.caseRef && (
                      <span className="text-[10px] font-mono font-medium text-neutral-600 bg-neutral-50 px-1.5 py-0.5 border border-neutral-200">
                        Case #{evt.caseRef}
                      </span>
                    )}
                  </div>
                  {evt.location && (
                    <span className="text-xs font-sans text-neutral-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400" /> {evt.location}
                    </span>
                  )}
                </div>

                {/* Title Cased Event Title */}
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-neutral-900 leading-snug mt-2">
                  {formatTitleCase(evt.title)}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-700 font-serif leading-relaxed mt-2">
                  {evt.summary}
                </p>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-neutral-100 space-y-4 animate-in fade-in">
                    <div className="p-4 bg-neutral-50/70 border border-neutral-200 font-serif text-xs text-neutral-800 leading-relaxed space-y-2">
                      <div className="font-sans text-[11px] uppercase font-bold text-neutral-500">
                        Detailed Narrative & Docket Analysis
                      </div>
                      <p>{evt.details}</p>
                    </div>

                    {evt.anomaly && (
                      <div className="p-3 bg-red-50/50 border border-red-100 text-xs font-serif text-neutral-800">
                        <strong className="text-[#FF3B00] font-sans uppercase text-[10px] block mb-0.5">Procedural Anomaly:</strong>
                        {evt.anomaly}
                      </div>
                    )}

                    {evt.caseRef && (
                      <div className="pt-2">
                        <button
                          onClick={() => onSelectCase(evt.caseRef!)}
                          className="px-4 py-2 bg-neutral-900 hover:bg-[#FF3B00] text-white text-xs font-sans font-semibold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5"
                        >
                          Inspect Case Dossier (#{evt.caseRef}) <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Toggle Button */}
                <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between items-center text-xs font-sans">
                  <button
                    onClick={() => toggleExpand(evt.id)}
                    className="text-neutral-900 font-semibold hover:text-[#FF3B00] flex items-center gap-1 cursor-pointer tracking-wide"
                  >
                    {isExpanded ? (
                      <>Collapse Record <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Examine Chronology Details <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                  <span className="text-neutral-400 text-[11px]">
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
