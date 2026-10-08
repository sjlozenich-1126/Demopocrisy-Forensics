import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Scale, 
  Clock, 
  Activity, 
  Database, 
  ArrowRight, 
  AlertTriangle, 
  ChevronRight, 
  Send, 
  Tv, 
  Volume2 
} from 'lucide-react';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  onSelectCase: (caseId: string) => void;
  onSelectArticle: (articleId: string) => void;
  onSelectEvidence: (evidenceId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  onSelectCase,
  onSelectArticle,
  onSelectEvidence
}) => {
  const { cases, articles, evidence, timelineEvents } = useData();

  const featuredArticle = articles.find((a) => a.isFeatured) || articles[0];
  const sideArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);
  const investigationList = articles.slice(0, 4);

  return (
    <div className="space-y-16 pb-20 bg-white">
      
      {/* Top Stories Section - Matching Screenshot 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-black tracking-tight mb-8">
          Top Stories
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Lead Story with Duotone Tint Box */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              
              {/* Duotone Visual Block - The Intercept Style */}
              <div 
                onClick={() => onSelectArticle(featuredArticle.id)}
                className="sm:col-span-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black overflow-hidden relative group cursor-pointer aspect-4/5 flex items-end p-6 border-2 border-black"
              >
                <img
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-150 mix-blend-luminosity group-hover:scale-103 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-[#FF3B00]/20 mix-blend-multiply pointer-events-none" />
                <div className="relative z-10 text-white space-y-1">
                  <span className="bg-[#FF3B00] text-white text-[10px] font-serif font-black uppercase px-2 py-0.5 tracking-wider">
                    {featuredArticle.category}
                  </span>
                  <p className="text-xs text-neutral-300 font-serif italic pt-1 line-clamp-2">
                    {featuredArticle.imageCaption}
                  </p>
                </div>
              </div>

              {/* Lead Headline & Description */}
              <div className="sm:col-span-6 space-y-3.5 flex flex-col justify-between h-full">
                <div>
                  {/* Black Kicker Bar - Intercept Signature */}
                  <div className="w-12 h-1.5 bg-black mb-3"></div>

                  {/* Kicker Category in Bright Orange/Red */}
                  <div className="text-[#FF3B00] font-serif font-bold text-sm tracking-tight mb-1">
                    Demopocrisy Special Briefing
                  </div>

                  <h3 
                    onClick={() => onSelectArticle(featuredArticle.id)}
                    className="text-2xl sm:text-3xl font-serif font-black text-black leading-[1.12] uppercase tracking-tight hover:text-[#FF3B00] cursor-pointer transition-colors"
                  >
                    {featuredArticle.title}
                  </h3>

                  <p className="text-base text-neutral-700 font-serif font-normal leading-relaxed mt-3">
                    {featuredArticle.subtitle}
                  </p>

                  <p className="text-sm text-neutral-600 font-serif font-normal leading-relaxed mt-2 line-clamp-3">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-300 flex items-center justify-between text-xs font-serif text-neutral-600">
                  <span className="text-[#FF3B00] font-bold">{featuredArticle.author}</span>
                  <span>{featuredArticle.date}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Stacked Top Stories - Matching Screenshot 1 */}
          <div className="lg:col-span-4 space-y-8 lg:border-l lg:border-neutral-300 lg:pl-8">
            {sideArticles.map((art, idx) => (
              <div key={art.id} className="space-y-3 group cursor-pointer" onClick={() => onSelectArticle(art.id)}>
                {idx === 0 ? (
                  /* Top Thumbnail Card */
                  <div className="space-y-2.5">
                    <div className="aspect-16/10 overflow-hidden bg-neutral-100 border border-neutral-300">
                      <img
                        src={art.featuredImage}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-[#FF3B00] font-serif font-bold text-xs uppercase tracking-tight">
                      {art.category} • {art.date}
                    </div>
                    <h4 className="font-serif font-black text-xl text-black leading-snug group-hover:text-[#FF3B00] transition-colors">
                      {art.title}
                    </h4>
                    <div className="text-xs font-serif text-[#FF3B00] font-semibold">
                      {art.author}
                    </div>
                  </div>
                ) : (
                  /* Secondary Item with Kicker Bar */
                  <div className="pt-6 border-t border-neutral-300 space-y-2">
                    <div className="w-10 h-1 bg-black"></div>
                    <div className="text-[#FF3B00] font-serif font-bold text-xs">
                      {art.category}
                    </div>
                    <h4 className="font-serif font-black text-lg text-black leading-snug group-hover:text-[#FF3B00] transition-colors">
                      {art.title}
                    </h4>
                    <p className="text-xs text-neutral-600 font-serif font-normal line-clamp-2">
                      {art.summary}
                    </p>
                    <div className="text-xs font-serif text-[#FF3B00] font-semibold pt-1">
                      {art.author}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Special Investigations Section - Matching Screenshot 5 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 border-t-2 border-black">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-black tracking-tight">
            Special Investigations
          </h2>
          <button
            onClick={() => setCurrentTab('news')}
            className="text-xs font-serif font-bold uppercase tracking-wider text-[#FF3B00] hover:text-black flex items-center gap-1 cursor-pointer"
          >
            All Investigations →
          </button>
        </div>

        {/* 3-Column Horizontal Row List Layout (Image | Headline + Author | Excerpt) */}
        <div className="divide-y divide-neutral-300">
          {investigationList.map((art) => (
            <div 
              key={art.id} 
              onClick={() => onSelectArticle(art.id)}
              className="py-8 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group cursor-pointer"
            >
              {/* Col 1: Graphic / Photo */}
              <div className="md:col-span-4 aspect-16/10 overflow-hidden bg-neutral-900 border border-neutral-300 relative">
                <img
                  src={art.featuredImage}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-103 transition-transform duration-500"
                />
                {art.mediaType === 'video' && (
                  <span className="absolute top-2 left-2 bg-[#FF3B00] text-white text-[9px] font-serif font-bold px-2 py-0.5 flex items-center gap-1 uppercase">
                    <Tv className="w-3 h-3" /> Video Included
                  </span>
                )}
                {art.mediaType === 'audio' && (
                  <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-serif font-bold px-2 py-0.5 flex items-center gap-1 uppercase">
                    <Volume2 className="w-3 h-3 text-[#FF3B00]" /> Audio Tape
                  </span>
                )}
              </div>

              {/* Col 2: Headline & Author in Bright Orange/Red */}
              <div className="md:col-span-4 space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-black text-black leading-snug group-hover:text-[#FF3B00] transition-colors">
                  {art.title}
                </h3>
                <div className="text-xs font-serif text-[#FF3B00] font-bold">
                  {art.author} <span className="text-neutral-500 font-normal">- {art.date}</span>
                </div>
              </div>

              {/* Col 3: Excerpt in Refined Serif */}
              <div className="md:col-span-4">
                <p className="text-sm text-neutral-700 font-serif font-normal leading-relaxed line-clamp-4">
                  {art.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quantitative Systemic Audit Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-black text-white p-8 sm:p-10 border-4 border-black">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-neutral-800 pb-4 mb-6">
            <div>
              <div className="text-[#FF3B00] font-serif font-bold text-xs uppercase tracking-widest">
                // QUANTITATIVE SYSTEMIC AUDIT
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-white mt-1">
                Five-Year Forensic Audit Data (2021–2026)
              </h3>
            </div>
            <button
              onClick={() => setCurrentTab('network')}
              className="text-xs font-serif text-[#FF3B00] hover:text-white font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              Surveillance Network Map (57 Entities) <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-4 bg-neutral-900 border border-neutral-800">
              <div className="text-4xl font-black text-white font-serif">8</div>
              <div className="text-xs font-serif font-bold text-neutral-300 mt-2 uppercase">Cases Audited</div>
              <div className="text-[11px] text-neutral-400 font-serif mt-0.5">Municipal & Superior</div>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800">
              <div className="text-4xl font-black text-[#FF3B00] font-serif">4</div>
              <div className="text-xs font-serif font-bold text-neutral-300 mt-2 uppercase">No Complaint Filed</div>
              <div className="text-[11px] text-neutral-400 font-serif mt-0.5">Dismissed Post-Jail</div>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800">
              <div className="text-4xl font-black text-white font-serif">365+</div>
              <div className="text-xs font-serif font-bold text-neutral-300 mt-2 uppercase">Days Detained</div>
              <div className="text-[11px] text-neutral-400 font-serif mt-0.5">Pretrial Without Trial</div>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800">
              <div className="text-4xl font-black text-white font-serif">2</div>
              <div className="text-xs font-serif font-bold text-neutral-300 mt-2 uppercase">Involuntary Holds</div>
              <div className="text-[11px] text-neutral-400 font-serif mt-0.5">Harborview & Western</div>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800">
              <div className="text-4xl font-black text-[#FF3B00] font-serif">67%</div>
              <div className="text-xs font-serif font-bold text-neutral-300 mt-2 uppercase">Warrantless Arrests</div>
              <div className="text-[11px] text-neutral-400 font-serif mt-0.5">4th Amendment Issue</div>
            </div>

            <div className="p-4 bg-[#FF3B00] text-white">
              <div className="text-4xl font-black text-white font-serif">100%</div>
              <div className="text-xs font-serif font-bold text-white mt-2 uppercase">Restored</div>
              <div className="text-[11px] text-white/90 font-serif mt-0.5">Dr. Leavey Feb 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Audited Legal Cases Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b-2 border-black pb-4 mb-8">
          <div>
            <div className="text-xs font-serif font-bold text-[#FF3B00] uppercase tracking-widest">
              // LEGAL REPOSITORY
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-black font-serif mt-1">
              Audited Case Studies (2021–2026)
            </h3>
          </div>
          <button
            onClick={() => setCurrentTab('cases')}
            className="text-xs font-serif font-bold uppercase tracking-wider bg-black text-white hover:bg-[#FF3B00] px-4 py-2.5 transition cursor-pointer flex items-center gap-2"
          >
            <Scale className="w-4 h-4" /> View All 8 Dockets
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.slice(0, 4).map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectCase(c.id)}
              className="bg-white border-2 border-black hover:border-[#FF3B00] p-6 flex flex-col justify-between cursor-pointer group shadow-sm transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xs font-black bg-black text-white px-2 py-0.5">
                    #{c.caseNumber}
                  </span>
                  <span className="text-[10px] font-serif font-bold uppercase px-2 py-0.5 bg-neutral-100 text-black border border-black">
                    {c.status}
                  </span>
                </div>

                <h4 className="font-serif font-black text-xl text-black group-hover:text-[#FF3B00] transition-colors leading-snug">
                  {c.title}
                </h4>

                <p className="text-xs text-neutral-600 font-serif leading-relaxed line-clamp-3">
                  {c.executiveSummary}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-300 flex items-center justify-between text-xs font-serif text-black group-hover:text-[#FF3B00]">
                <span className="font-bold">{c.associatedDocs.length} Primary Documents</span>
                <span className="flex items-center gap-1 font-bold uppercase">
                  Dossier <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-Column Features: Chronological Timeline & Medical CSF Audit */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Timeline Feature (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-black p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#FF3B00]" />
                  <h3 className="font-serif font-black text-2xl text-black">
                    5-Year Chronology (2020–2026)
                  </h3>
                </div>
                <button
                  onClick={() => setCurrentTab('timeline')}
                  className="text-xs font-serif text-[#FF3B00] hover:underline font-bold uppercase"
                >
                  Full Timeline →
                </button>
              </div>

              <p className="text-sm font-serif text-neutral-700">
                A forensic narrative timeline reconstructing arrests, competency orders, speedy trial tolling, and medicalizations.
              </p>

              <div className="space-y-3 pt-2">
                {timelineEvents.slice(0, 3).map((evt) => (
                  <div 
                    key={evt.id} 
                    className="p-4 bg-neutral-50 border-l-4 border-[#FF3B00] border border-neutral-300 hover:bg-neutral-100 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-bold text-[#FF3B00]">{evt.date}</span>
                      {evt.caseRef && (
                        <span className="text-[10px] font-serif font-bold bg-black text-white px-1.5 py-0.2">
                          Case #{evt.caseRef}
                        </span>
                      )}
                    </div>
                    <h5 className="font-serif font-black text-base text-black mt-1">
                      {evt.title}
                    </h5>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2 font-serif">
                      {evt.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t-2 border-black">
              <button
                onClick={() => setCurrentTab('timeline')}
                className="w-full py-3 text-center text-xs font-serif font-black uppercase tracking-wider bg-black hover:bg-[#FF3B00] text-white transition cursor-pointer"
              >
                Inspect All Chronological Chapters →
              </button>
            </div>
          </div>

          {/* Medical CSF Audit Preview (5 cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-black p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-6 h-6 text-[#FF3B00]" />
                  <h3 className="font-serif font-black text-2xl text-black">
                    Harborview Medical Audit
                  </h3>
                </div>
                <button
                  onClick={() => setCurrentTab('medical')}
                  className="text-xs font-serif text-[#FF3B00] hover:underline font-bold uppercase"
                >
                  Full Audit →
                </button>
              </div>

              <div className="p-4 bg-red-50 border-2 border-[#FF3B00] space-y-2">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#FF3B00] uppercase">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>March 2021 Lumbar Puncture Discrepancy</span>
                </div>
                <p className="text-xs text-neutral-900 font-serif leading-relaxed">
                  Lab records reveal <strong>95% neutrophils</strong> in CSF (inconsistent with viral/neurosyphilis lymphocytic norm) and zero positive viral panels, yet justified 22 days of involuntary hold and forced Haloperidol.
                </p>
              </div>

              <div className="space-y-2 text-xs font-serif">
                <div className="p-2.5 bg-neutral-50 border border-neutral-300 flex justify-between items-center">
                  <span className="text-neutral-700">CSF Neutrophils:</span>
                  <span className="font-bold text-[#FF3B00]">95% (Bacterial/Trauma)</span>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-300 flex justify-between items-center">
                  <span className="text-neutral-700">Viral / Syphilis PCR:</span>
                  <span className="font-bold text-emerald-700">ALL NEGATIVE</span>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-300 flex justify-between items-center">
                  <span className="text-neutral-700">2026 Competency:</span>
                  <span className="font-bold text-emerald-700">Restored (Dr. Leavey)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t-2 border-black">
              <button
                onClick={() => setCurrentTab('medical')}
                className="w-full py-3 text-center text-xs font-serif font-black uppercase tracking-wider bg-[#FF3B00] hover:bg-black text-white transition cursor-pointer"
              >
                Inspect Medical Records & Analysis →
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
