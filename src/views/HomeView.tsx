import React from 'react';
import { useData } from '../context/DataContext';
import { formatTitleCase } from '../lib/formatters';
import { 
  Scale, 
  Clock, 
  Activity, 
  Database, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  ShieldAlert, 
  Share2, 
  Layers, 
  ExternalLink,
  ChevronRight, 
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

  // Primary lead and companion articles
  const featuredArticle = articles.find((a) => a.isFeatured) || articles[0];
  const sideArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);

  // Key primary evidence items for spotlight
  const spotlightEvidence = evidence.slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-16">
        
        {/* ========================================================= */}
        {/* SECTION 1: PROPUBLICA LEAD INVESTIGATIVE PACKAGE          */}
        {/* (Top Stories shown ONCE with authentic editorial balance) */}
        {/* ========================================================= */}
        <section aria-label="Lead Investigations">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 8 Cols: Major Lead Story */}
            <article className="lg:col-span-8 space-y-5">
              
              {/* Category Kicker */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-sans font-bold text-[#FF3B00] uppercase tracking-wider">
                  {featuredArticle.category}
                </span>
                <span className="text-neutral-300">·</span>
                <span className="text-xs font-sans text-neutral-500">
                  Demopocrisy Special Report
                </span>
              </div>

              {/* Title-Cased Headline (First letter of each word capitalized) */}
              <h1 
                onClick={() => onSelectArticle(featuredArticle.id)}
                className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-black text-neutral-900 leading-[1.12] tracking-tight hover:text-[#FF3B00] cursor-pointer transition-colors"
              >
                {formatTitleCase(featuredArticle.title)}
              </h1>

              {/* Subtitle / Deck */}
              <p className="text-lg sm:text-xl text-neutral-700 font-serif leading-relaxed">
                {featuredArticle.subtitle}
              </p>

              {/* Byline and Dateline */}
              <div className="flex items-center gap-2 text-xs font-sans text-neutral-600 pb-2 border-b border-neutral-200">
                <span className="font-semibold text-neutral-900">By {featuredArticle.author}</span>
                <span>·</span>
                <span>{featuredArticle.date}</span>
                <span>·</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              {/* Editorial Hero Visual with Subtle Frame & Caption */}
              <div 
                onClick={() => onSelectArticle(featuredArticle.id)}
                className="group cursor-pointer space-y-2 pt-1"
              >
                <div className="aspect-16/10 sm:aspect-16/9 overflow-hidden bg-neutral-900 border border-neutral-200 relative">
                  <img
                    src={featuredArticle.featuredImage}
                    alt={featuredArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  {featuredArticle.mediaType === 'gallery' && (
                    <span className="absolute top-3 left-3 bg-neutral-900/90 text-white text-[10px] font-sans font-semibold px-2 py-0.5 tracking-wider uppercase">
                      Investigative Dossier
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 font-serif italic leading-normal">
                  {featuredArticle.imageCaption}
                </p>
              </div>

              {/* Lead Nut Graf */}
              <p className="text-base text-neutral-700 font-serif leading-relaxed pt-2">
                {featuredArticle.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectArticle(featuredArticle.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-[#FF3B00] text-white text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Read Full Story <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {featuredArticle.relatedCases && featuredArticle.relatedCases.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-sans font-semibold text-neutral-500 uppercase tracking-wider hidden sm:inline">
                      Related Dossiers:
                    </span>
                    {featuredArticle.relatedCases.slice(0, 3).map((caseId) => (
                      <button
                        key={caseId}
                        onClick={() => onSelectCase(caseId)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 hover:text-[#FF3B00] text-xs font-sans font-medium border border-neutral-300 transition-colors cursor-pointer"
                      >
                        <Scale className="w-3 h-3 text-[#FF3B00]" />
                        <span>Case #{caseId}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </article>

            {/* Right 4 Cols: Side Rail Companion Investigations */}
            <aside className="lg:col-span-4 lg:border-l lg:border-neutral-200 lg:pl-8 space-y-7">
              <div className="border-b border-neutral-200 pb-2">
                <h2 className="text-xs font-sans font-bold text-neutral-900 uppercase tracking-widest">
                  Featured Investigations
                </h2>
              </div>

              <div className="space-y-7 divide-y divide-neutral-200">
                {sideArticles.map((art, idx) => (
                  <article 
                    key={art.id} 
                    className={`${idx > 0 ? 'pt-6' : ''} space-y-2.5 group cursor-pointer`}
                    onClick={() => onSelectArticle(art.id)}
                  >
                    <div className="text-[11px] font-sans font-bold text-[#FF3B00] uppercase tracking-wider">
                      {art.category}
                    </div>

                    {/* Thumbnail for first side item */}
                    {idx === 0 && (
                      <div className="aspect-16/10 overflow-hidden bg-neutral-100 border border-neutral-200 my-2">
                        <img
                          src={art.featuredImage}
                          alt={art.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Title-cased Headline */}
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-neutral-900 leading-snug group-hover:text-[#FF3B00] transition-colors">
                      {formatTitleCase(art.title)}
                    </h3>

                    <p className="text-xs text-neutral-600 font-serif leading-relaxed line-clamp-2">
                      {art.summary}
                    </p>

                    <div className="text-[11px] font-sans text-neutral-500 pt-1 flex items-center justify-between">
                      <span className="font-medium text-neutral-700">By {art.author}</span>
                      <span>{art.date}</span>
                    </div>
                  </article>
                ))}
              </div>

              {/* View all button in side rail */}
              <div className="pt-2 border-t border-neutral-200">
                <button
                  onClick={() => setCurrentTab('news')}
                  className="w-full py-2.5 text-center text-xs font-sans font-semibold text-neutral-800 hover:text-[#FF3B00] bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer"
                >
                  View All Investigations Archive →
                </button>
              </div>

            </aside>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: PROPUBLICA-STYLE "IN DEPTH: INVESTIGATIVE SERIES" */}
        {/* (Replaces the duplicated Top Stories section with real depth)*/}
        {/* ========================================================= */}
        <section className="pt-8 border-t border-neutral-200 space-y-6" aria-label="Investigative Series">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200 pb-3">
            <div>
              <span className="text-[11px] font-sans font-bold text-[#FF3B00] uppercase tracking-wider block">
                In-Depth Projects
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
                Ongoing Investigative Series
              </h2>
            </div>
            <p className="text-xs font-serif text-neutral-500 max-w-md text-left sm:text-right">
              Multi-year investigative audits mapping systemic discretion, sealed discovery, and institutional substitution across Washington State.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Series Card 1 */}
            <div className="border border-neutral-200 bg-white p-6 flex flex-col justify-between hover:border-neutral-400 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="font-bold text-[#FF3B00] uppercase tracking-wider">Series 01</span>
                  <span className="text-neutral-400">Civil Rights & Anonymity</span>
                </div>
                
                <h3 
                  onClick={() => onSelectArticle('art-001')}
                  className="font-serif font-bold text-xl text-neutral-900 leading-snug hover:text-[#FF3B00] cursor-pointer transition-colors"
                >
                  The Secrecy & Prosecution Nexus
                </h3>

                <p className="text-xs text-neutral-600 font-serif leading-relaxed">
                  How law enforcement personnel petitioned the Supreme Court to seal identities following Jan. 6, while civilian whistleblowers faced warrantless detentions by unmarked personnel without visible badges.
                </p>

                <div className="pt-2 space-y-1.5 text-[11px] font-sans text-neutral-600 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B00]" />
                    <span>6 SPOG Officers Under Record Seal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>Unmarked Arrest on Columbia St (Jul 2021)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-sans">
                <button
                  onClick={() => onSelectCase('21-1-04347-2')}
                  className="text-neutral-700 hover:text-[#FF3B00] font-semibold cursor-pointer"
                >
                  Case #21-1-04347-2 →
                </button>
                <button
                  onClick={() => onSelectArticle('art-001')}
                  className="text-[#FF3B00] font-semibold hover:underline cursor-pointer"
                >
                  Read Series
                </button>
              </div>
            </div>

            {/* Series Card 2 */}
            <div className="border border-neutral-200 bg-white p-6 flex flex-col justify-between hover:border-neutral-400 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="font-bold text-[#FF3B00] uppercase tracking-wider">Series 02</span>
                  <span className="text-neutral-400">Due Process & Discovery</span>
                </div>
                
                <h3 
                  onClick={() => onSelectArticle('art-002')}
                  className="font-serif font-bold text-xl text-neutral-900 leading-snug hover:text-[#FF3B00] cursor-pointer transition-colors"
                >
                  The Jay Inslee Threat Docket Void
                </h3>

                <p className="text-xs text-neutral-600 font-serif leading-relaxed">
                  Investigating 1,300+ days of continuous criminal prosecution, ten months of pretrial incarceration, and broken facial bones in custody without the state ever producing the alleged voicemail audio or transcript.
                </p>

                <div className="pt-2 space-y-1.5 text-[11px] font-sans text-neutral-600 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B00]" />
                    <span>0 Audio Files Produced in Discovery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>CrR 3.3 Speedy Trial Continuous Tolling</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-sans">
                <button
                  onClick={() => onSelectCase('22-1-04242-3')}
                  className="text-neutral-700 hover:text-[#FF3B00] font-semibold cursor-pointer"
                >
                  Case #22-1-04242-3 →
                </button>
                <button
                  onClick={() => onSelectArticle('art-002')}
                  className="text-[#FF3B00] font-semibold hover:underline cursor-pointer"
                >
                  Read Series
                </button>
              </div>
            </div>

            {/* Series Card 3 */}
            <div className="border border-neutral-200 bg-white p-6 flex flex-col justify-between hover:border-neutral-400 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="font-bold text-[#FF3B00] uppercase tracking-wider">Series 03</span>
                  <span className="text-neutral-400">Urban Property & 911 Logs</span>
                </div>
                
                <h3 
                  onClick={() => onSelectArticle('art-003')}
                  className="font-serif font-bold text-xl text-neutral-900 leading-snug hover:text-[#FF3B00] cursor-pointer transition-colors"
                >
                  Zoned for Erasure: Midvale Ave North
                </h3>

                <p className="text-xs text-neutral-600 font-serif leading-relaxed">
                  Cross-referencing 911 dispatch calls, unexplained residential disappearances, sewer line consolidation, and county-wide deed alterations during pandemic closures in North Seattle.
                </p>

                <div className="pt-2 space-y-1.5 text-[11px] font-sans text-neutral-600 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B00]" />
                    <span>12 Emergency 911 Calls Audited</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>Multi-Family Rezoning Acceleration</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-sans">
                <button
                  onClick={() => onSelectCase('658931')}
                  className="text-neutral-700 hover:text-[#FF3B00] font-semibold cursor-pointer"
                >
                  Case #658931 →
                </button>
                <button
                  onClick={() => onSelectArticle('art-003')}
                  className="text-[#FF3B00] font-semibold hover:underline cursor-pointer"
                >
                  Read Series
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: PROPUBLICA DATA LAB & INTERACTIVE FORENSICS     */}
        {/* (Refined hairline borders, uncrowded metrics, no thick black)*/}
        {/* ========================================================= */}
        <section className="pt-8 border-t border-neutral-200 space-y-6" aria-label="Forensic Data Hub">
          <div className="border border-neutral-200 bg-neutral-50/60 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-neutral-200">
              <div>
                <span className="text-[11px] font-sans font-bold text-[#FF3B00] uppercase tracking-wider block">
                  Interactive Databases & Systems Mapping
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight mt-0.5">
                  Five-Year Quantitative Forensic Audit (2021–2026)
                </h2>
                <p className="text-xs font-serif text-neutral-600 mt-1 max-w-2xl">
                  Empirical metrics and custody logs reconstructed from King County court records, municipal booking blotters, and hospital clinical files.
                </p>
              </div>

              <button
                onClick={() => setCurrentTab('network')}
                className="px-4 py-2 bg-neutral-900 hover:bg-[#FF3B00] text-white text-xs font-sans font-semibold tracking-wide transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                Launch Network Map (57 Entities) <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 6 Clean Tabular Stat Cards with 1px hairline outlines */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-6">
              
              <div className="p-4 bg-white border border-neutral-200 text-center">
                <div className="text-3xl font-serif font-black text-neutral-900 tabular-nums">8</div>
                <div className="text-[11px] font-sans font-bold text-neutral-700 mt-1 uppercase">Cases Audited</div>
                <div className="text-[10px] text-neutral-500 font-serif mt-0.5">Municipal & Superior</div>
              </div>

              <div className="p-4 bg-white border border-neutral-200 text-center">
                <div className="text-3xl font-serif font-black text-[#FF3B00] tabular-nums">4</div>
                <div className="text-[11px] font-sans font-bold text-neutral-700 mt-1 uppercase">No Complaint Filed</div>
                <div className="text-[10px] text-neutral-500 font-serif mt-0.5">Dismissed Post-Jail</div>
              </div>

              <div className="p-4 bg-white border border-neutral-200 text-center">
                <div className="text-3xl font-serif font-black text-neutral-900 tabular-nums">365+</div>
                <div className="text-[11px] font-sans font-bold text-neutral-700 mt-1 uppercase">Days Detained</div>
                <div className="text-[10px] text-neutral-500 font-serif mt-0.5">Pretrial Without Trial</div>
              </div>

              <div className="p-4 bg-white border border-neutral-200 text-center">
                <div className="text-3xl font-serif font-black text-neutral-900 tabular-nums">2</div>
                <div className="text-[11px] font-sans font-bold text-neutral-700 mt-1 uppercase">Involuntary Holds</div>
                <div className="text-[10px] text-neutral-500 font-serif mt-0.5">Harborview & Western</div>
              </div>

              <div className="p-4 bg-white border border-neutral-200 text-center">
                <div className="text-3xl font-serif font-black text-[#FF3B00] tabular-nums">67%</div>
                <div className="text-[11px] font-sans font-bold text-neutral-700 mt-1 uppercase">Warrantless Arrests</div>
                <div className="text-[10px] text-neutral-500 font-serif mt-0.5">Fourth Amendment Issue</div>
              </div>

              <div className="p-4 bg-white border border-emerald-300 text-center">
                <div className="text-3xl font-serif font-black text-emerald-700 tabular-nums">100%</div>
                <div className="text-[11px] font-sans font-bold text-emerald-800 mt-1 uppercase">Competence Restored</div>
                <div className="text-[10px] text-emerald-600 font-serif mt-0.5">Dr. Leavey Feb 2026</div>
              </div>

            </div>

            {/* Quick Interactive Tool Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-6 mt-6 border-t border-neutral-200 text-xs font-serif">
              <div 
                onClick={() => setCurrentTab('timeline')}
                className="p-3.5 bg-white border border-neutral-200 hover:border-neutral-400 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5 font-sans">
                    <Clock className="w-3.5 h-3.5 text-[#FF3B00]" /> 5-Year Chronological Tool
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Auditing court delays & jail dates</div>
                </div>
                <span className="text-[#FF3B00] font-sans font-semibold">Inspect →</span>
              </div>

              <div 
                onClick={() => setCurrentTab('medical')}
                className="p-3.5 bg-white border border-neutral-200 hover:border-neutral-400 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5 font-sans">
                    <Activity className="w-3.5 h-3.5 text-[#FF3B00]" /> Harborview CSF Lab Audit
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">95% neutrophils discrepancy review</div>
                </div>
                <span className="text-[#FF3B00] font-sans font-semibold">Inspect →</span>
              </div>

              <div 
                onClick={() => setCurrentTab('evidence')}
                className="p-3.5 bg-white border border-neutral-200 hover:border-neutral-400 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5 font-sans">
                    <FileText className="w-3.5 h-3.5 text-[#FF3B00]" /> Primary Evidence Vault
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Court dockets, audio, & FOIA logs</div>
                </div>
                <span className="text-[#FF3B00] font-sans font-semibold">Inspect →</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: AUDITED COURT CASES & DOCKETS                  */}
        {/* (Clean, airy cards, reduced line weight, Title Cased)    */}
        {/* ========================================================= */}
        <section className="pt-8 border-t border-neutral-200 space-y-6" aria-label="Legal Dockets">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-neutral-200 pb-3">
            <div>
              <span className="text-[11px] font-sans font-bold text-[#FF3B00] uppercase tracking-wider block">
                Court Records Archive
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
                Audited Case Dockets (2021–2026)
              </h2>
            </div>
            <button
              onClick={() => setCurrentTab('cases')}
              className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-800 hover:text-[#FF3B00] flex items-center gap-1.5 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-[#FF3B00]" /> View All 8 Dockets →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cases.slice(0, 4).map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className="bg-white border border-neutral-200 hover:border-neutral-400 p-5 flex flex-col justify-between cursor-pointer group shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                      Docket #{c.caseNumber}
                    </span>
                    <span className="text-[10px] text-neutral-600 font-medium">
                      {c.year}
                    </span>
                  </div>

                  {/* Title-Cased Case Title */}
                  <h3 className="font-serif font-bold text-lg text-neutral-900 group-hover:text-[#FF3B00] transition-colors leading-snug">
                    {formatTitleCase(c.title)}
                  </h3>

                  <div className="text-[11px] font-sans text-neutral-500 font-medium">
                    {c.court} · {c.cause}
                  </div>

                  <p className="text-xs text-neutral-600 font-serif leading-relaxed line-clamp-3">
                    {c.executiveSummary}
                  </p>
                </div>

                <div className="pt-3.5 mt-5 border-t border-neutral-100 flex items-center justify-between text-xs font-sans text-neutral-700 group-hover:text-[#FF3B00]">
                  <span className="text-[11px] text-neutral-500 font-medium">{c.associatedDocs.length} Primary Records</span>
                  <span className="flex items-center gap-1 font-semibold text-[11px] uppercase">
                    Inspect <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: PRIMARY EVIDENCE & RECORDS SPOTLIGHT           */}
        {/* (Showcasing authentic documentation, ProPublica style)    */}
        {/* ========================================================= */}
        <section className="pt-8 border-t border-neutral-200 space-y-6" aria-label="Primary Sources">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-neutral-200 pb-3">
            <div>
              <span className="text-[11px] font-sans font-bold text-[#FF3B00] uppercase tracking-wider block">
                Primary Records
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
                Evidentiary Documents & Clinical Panels
              </h2>
            </div>
            <button
              onClick={() => setCurrentTab('evidence')}
              className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-800 hover:text-[#FF3B00] flex items-center gap-1 cursor-pointer"
            >
              Browse Complete Evidence Vault →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {spotlightEvidence.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => onSelectEvidence(doc.id)}
                className="p-5 bg-white border border-neutral-200 hover:border-neutral-400 transition-all cursor-pointer group shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-sans">
                    <span className="text-[#FF3B00] font-bold uppercase tracking-wide">
                      {doc.category}
                    </span>
                    <span className="text-neutral-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-neutral-900 group-hover:text-[#FF3B00] transition-colors leading-snug">
                    {formatTitleCase(doc.title)}
                  </h3>

                  <div className="text-[11px] font-sans text-neutral-500">
                    Source: {doc.entity} ({doc.date})
                  </div>

                  <p className="text-xs text-neutral-600 font-serif leading-relaxed line-clamp-3">
                    {doc.summary}
                  </p>
                </div>

                <div className="pt-3.5 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-sans text-neutral-600 group-hover:text-[#FF3B00]">
                  <span className="text-[11px] font-mono">{doc.docNumber || 'RECORD-REF'}</span>
                  <span className="font-semibold text-[11px] flex items-center gap-1">
                    Examine Record <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: PROPUBLICA-STYLE PUBLIC INTEREST TIP DROP      */}
        {/* ========================================================= */}
        <section className="pt-8 border-t border-neutral-200">
          <div className="p-6 sm:p-8 bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <span className="text-[11px] font-sans font-bold text-[#FF3B00] uppercase tracking-wider block">
                Whistleblower & Public Inquiries
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900">
                Have Evidence, Audio Recordings, or Court Records to Share?
              </h3>
              <p className="text-xs text-neutral-600 font-serif leading-relaxed">
                The Demopocrisy archive accepts public dockets, medical reports, dispatch logs, and sworn affidavits auditing procedural justice in Washington State.
              </p>
            </div>

            <button
              onClick={() => setCurrentTab('submissions')}
              className="px-6 py-3 bg-[#FF3B00] hover:bg-neutral-900 text-white text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              Submit Evidence Document →
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
