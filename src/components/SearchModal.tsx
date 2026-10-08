import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Search, X, FileText, Calendar, Database, Newspaper, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCase: (caseId: string) => void;
  onSelectArticle: (articleId: string) => void;
  onSelectEvidence: (evidenceId: string) => void;
  onSelectTimeline: (timelineId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCase,
  onSelectArticle,
  onSelectEvidence,
  onSelectTimeline
}) => {
  const { cases, articles, evidence, timelineEvents } = useData();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'cases' | 'articles' | 'evidence' | 'timeline'>('all');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return { cases: [], articles: [], evidence: [], timeline: [] };
    const q = query.toLowerCase();

    const matchedCases = cases.filter(
      (c) =>
        c.caseNumber.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.cause.toLowerCase().includes(q) ||
        c.judge.toLowerCase().includes(q) ||
        c.executiveSummary.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );

    const matchedArticles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );

    const matchedEvidence = evidence.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.content.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );

    const matchedTimeline = timelineEvents.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.date.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.details.toLowerCase().includes(q)
    );

    return {
      cases: matchedCases,
      articles: matchedArticles,
      evidence: matchedEvidence,
      timeline: matchedTimeline
    };
  }, [query, cases, articles, evidence, timelineEvents]);

  if (!isOpen) return null;

  const totalResultsCount =
    filteredResults.cases.length +
    filteredResults.articles.length +
    filteredResults.evidence.length +
    filteredResults.timeline.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-3xl bg-[#f8f7f4] border-2 border-[#111111] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="p-4 border-b-2 border-[#111111] bg-[#111111] text-[#f8f7f4] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#ff3b00] shrink-0" />
          <input
            type="text"
            placeholder="Search cases, dockets, evidence, judges, or medical records..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-sm sm:text-base bg-transparent text-[#f8f7f4] placeholder:text-neutral-400 focus:outline-none mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-[10px] mono font-bold uppercase bg-[#ff3b00] text-white cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-4 py-2.5 bg-[#f1efe9] border-b border-[#111111]/20 flex items-center gap-2 overflow-x-auto text-xs mono">
          <span className="text-[#111111] font-bold uppercase text-[10px] tracking-wider">// FILTER:</span>
          {(['all', 'cases', 'articles', 'evidence', 'timeline'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition cursor-pointer border ${
                filterType === type
                  ? 'bg-[#111111] text-[#f8f7f4] border-[#111111]'
                  : 'bg-[#f8f7f4] text-[#111111] hover:bg-black/5 border-[#111111]/20'
              }`}
            >
              {type}
            </button>
          ))}
          {query && (
            <span className="ml-auto text-[#111111] mono font-bold text-[11px]">
              {totalResultsCount} results
            </span>
          )}
        </div>

        {/* Results Scroll Area */}
        <div className="p-5 overflow-y-auto divide-y divide-neutral-200 space-y-4 max-h-[60vh]">
          {!query.trim() ? (
            <div className="py-12 text-center text-neutral-700 font-serif">
              <Search className="w-10 h-10 mx-auto text-[#FF3B00] mb-3" />
              <p className="text-base font-bold text-black">Search the complete forensic investigative archive:</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-mono">
                {['658931', '658959', '21-1-04347-2', '22-1-04242-3', 'Harborview', 'Neutrophil', 'CrR 3.3', 'Accellion'].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setQuery(sample)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white border-2 border-black text-black font-bold cursor-pointer text-xs"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResultsCount === 0 ? (
            <div className="py-12 text-center text-neutral-500 font-serif">
              <p className="text-base">No matching records found for "{query}".</p>
              <p className="text-xs font-mono text-neutral-400 mt-1">Try searching by docket number or keyword.</p>
            </div>
          ) : (
            <>
              {/* Cases Results */}
              {(filterType === 'all' || filterType === 'cases') && filteredResults.cases.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-mono uppercase font-black text-[#FF3B00] tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Legal Case Studies ({filteredResults.cases.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.cases.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onSelectCase(c.id);
                          onClose();
                        }}
                        className="p-3 bg-white hover:bg-neutral-50 border-2 border-black cursor-pointer transition flex items-start justify-between gap-3 group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-white bg-black px-2 py-0.5">
                              #{c.caseNumber}
                            </span>
                            <span className="text-xs text-[#FF3B00] font-bold font-mono">{c.court}</span>
                          </div>
                          <h5 className="font-serif font-black text-base text-black mt-1.5 group-hover:text-[#FF3B00] transition-colors">
                            {c.title}
                          </h5>
                          <p className="text-xs text-neutral-600 line-clamp-2 mt-1 font-sans">
                            {c.executiveSummary}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#FF3B00] shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Results */}
              {(filterType === 'all' || filterType === 'articles') && filteredResults.articles.length > 0 && (
                <div className="pt-3">
                  <h4 className="text-xs font-mono uppercase font-black text-[#FF3B00] tracking-wider mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5" /> Investigative Dispatches ({filteredResults.articles.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.articles.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onSelectArticle(a.id);
                          onClose();
                        }}
                        className="p-3 bg-white hover:bg-neutral-50 border-2 border-black cursor-pointer transition flex items-start justify-between gap-3 group"
                      >
                        <div>
                          <span className="text-[10px] font-mono font-black uppercase bg-[#FF3B00] text-white px-2 py-0.5">
                            {a.category} • {a.date}
                          </span>
                          <h5 className="font-serif font-black text-base text-black mt-1.5 group-hover:text-[#FF3B00]">
                            {a.title}
                          </h5>
                          <p className="text-xs text-neutral-600 line-clamp-1 mt-1 font-sans">{a.summary}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#FF3B00] shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence Results */}
              {(filterType === 'all' || filterType === 'evidence') && filteredResults.evidence.length > 0 && (
                <div className="pt-3">
                  <h4 className="text-xs font-mono uppercase font-black text-[#FF3B00] tracking-wider mb-2 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" /> Primary Evidence & Records ({filteredResults.evidence.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.evidence.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          onSelectEvidence(e.id);
                          onClose();
                        }}
                        className="p-3 bg-white hover:bg-neutral-50 border-2 border-black cursor-pointer transition flex items-start justify-between gap-3 group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-black bg-black text-white px-2 py-0.5 uppercase">
                              {e.category}
                            </span>
                            <span className="text-xs text-neutral-500 font-mono">{e.date}</span>
                          </div>
                          <h5 className="font-serif font-black text-base text-black mt-1.5 group-hover:text-[#FF3B00]">
                            {e.title}
                          </h5>
                          <p className="text-xs text-neutral-600 line-clamp-1 mt-1 font-sans">{e.summary}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#FF3B00] shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline Results */}
              {(filterType === 'all' || filterType === 'timeline') && filteredResults.timeline.length > 0 && (
                <div className="pt-3">
                  <h4 className="text-xs font-mono uppercase font-black text-[#FF3B00] tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Timeline Milestones ({filteredResults.timeline.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.timeline.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          onSelectTimeline(t.id);
                          onClose();
                        }}
                        className="p-3 bg-white hover:bg-neutral-50 border-2 border-black cursor-pointer transition flex items-start justify-between gap-3 group"
                      >
                        <div>
                          <span className="text-xs font-mono font-black text-[#FF3B00]">{t.date}</span>
                          <h5 className="font-serif font-black text-base text-black mt-1 group-hover:text-[#FF3B00]">
                            {t.title}
                          </h5>
                          <p className="text-xs text-neutral-600 line-clamp-1 mt-1 font-sans">{t.summary}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#FF3B00] shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3.5 bg-neutral-100 border-t-2 border-black flex justify-between items-center text-xs font-mono text-neutral-600">
          <span>Press <strong className="text-black">ESC</strong> to exit search</span>
          <button
            onClick={onClose}
            className="text-black font-black uppercase hover:text-[#FF3B00]"
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>
  );
};
