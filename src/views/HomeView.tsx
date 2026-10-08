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
  Layers,
  ArrowUpRight
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
  const sideArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div className="bg-[#f8f7f4] text-[#111111] min-h-screen">
      
      {/* Primary Viewport Structure matching Variation 3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Primary Focus (1.5fr / 8 cols) */}
          <div className="lg:col-span-8 lg:pr-8 lg:border-r border-[#111111]/10 flex flex-col justify-between">
            <div>
              {/* Archive Entry Kicker */}
              <div className="mono text-[#ff3b00] opacity-100 font-bold mb-3">
                Vol. 01 // Archive Entry
              </div>

              {/* Giant Hero Title */}
              <h1 
                onClick={() => onSelectArticle(featuredArticle?.id || 'art-001')}
                className="hero-title hover:text-[#ff3b00] cursor-pointer transition-colors"
              >
                {featuredArticle?.title || 'Seattle Officers Seek Anonymity in Supreme Court While Whistleblowers Face Institutional Shadow'}
              </h1>

              {/* Hero Summary */}
              <p className="hero-summary">
                {featuredArticle?.subtitle || 'An investigative analysis of how the highest courts shielded law enforcement identities after Jan. 6, while citizens documenting systemic cracks faced warrantless arrests.'}
              </p>

              {/* Investigations Grid - 2 Column Brutalist Cards */}
              <div className="investigations-grid my-8">
                {/* Entry Card 1: Inslee Threat Case */}
                <div 
                  onClick={() => onSelectArticle('art-002')}
                  className="entry-card cursor-pointer group"
                >
                  <span className="mono text-[#111111]/60 group-hover:text-[#ff3b00] transition-colors">
                    #658931 / 2021
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                    Inslee Threat Case Drifts into Year Four Without Evidence
                  </h3>
                  <p className="mono text-xs normal-case tracking-normal opacity-85 leading-relaxed text-neutral-700">
                    Prosecution of Shane Lozenich continues for over 1,300 days without production of audio recording in discovery.
                  </p>
                </div>

                {/* Entry Card 2: Acoustic Jurisprudence */}
                <div 
                  onClick={() => onSelectArticle('art-003')}
                  className="entry-card cursor-pointer group"
                >
                  <span className="mono text-[#111111]/60 group-hover:text-[#ff3b00] transition-colors">
                    Intelligence / Signal
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                    Acoustic Jurisprudence: The Forensic Record of V2K
                  </h3>
                  <p className="mono text-xs normal-case tracking-normal opacity-85 leading-relaxed text-neutral-700">
                    Scientific basis of the microwave auditory effect (Frey effect) and the legal requirement for a Digital Bill of Rights.
                  </p>
                </div>

                {/* Entry Card 3: Accellion Data Leak */}
                <div 
                  onClick={() => onSelectArticle('art-004')}
                  className="entry-card cursor-pointer group"
                >
                  <span className="mono text-[#111111]/60 group-hover:text-[#ff3b00] transition-colors">
                    SAO Breach // 1.6M Victims
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                    The 2021 Accellion Data Leak & Procedural Inversion
                  </h3>
                  <p className="mono text-xs normal-case tracking-normal opacity-85 leading-relaxed text-neutral-700">
                    How massive state cyber vulnerabilities exposed whistleblower identities before warrantless bedroom arrests.
                  </p>
                </div>

                {/* Entry Card 4: King County Custody Audit */}
                <div 
                  onClick={() => onSelectArticle('art-005')}
                  className="entry-card cursor-pointer group"
                >
                  <span className="mono text-[#111111]/60 group-hover:text-[#ff3b00] transition-colors">
                    Pretrial Detention // CrR 3.3
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                    365+ Days Detained Without Adjudication
                  </h3>
                  <p className="mono text-xs normal-case tracking-normal opacity-85 leading-relaxed text-neutral-700">
                    Auditing 10 months in King County Jail, physical injury, and continuous competency evaluation tolling.
                  </p>
                </div>
              </div>
            </div>

            {/* Brutalist Editorial Stats Strip */}
            <div className="stats-strip">
              <div className="stat-block">
                <span className="value">67%</span>
                <span className="mono">Warrantless Arrests</span>
              </div>
              <div className="stat-block">
                <span className="value">365+</span>
                <span className="mono">Days Pretrial Detention</span>
              </div>
              <div className="stat-block">
                <span className="value text-[#ff3b00]">Restored</span>
                <span className="mono">Clinical Status 2026</span>
              </div>
              <div className="stat-block">
                <span className="value">8</span>
                <span className="mono">Cases Audited</span>
              </div>
              <div className="stat-block">
                <span className="value">57</span>
                <span className="mono">Network Entities</span>
              </div>
            </div>
          </div>

          {/* Right Column: Case Study Index (1fr / 4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Section Header */}
              <div className="mono text-[0.7rem] font-bold pb-2.5 mb-6 border-b-2 border-[#111111] text-[#111111] flex items-center justify-between">
                <span>Case Study Index</span>
                <span className="text-[#ff3b00]">RCW 10.77 // CrR 3.3</span>
              </div>

              {/* Docket 1: Harborview Medical Audit */}
              <div 
                onClick={() => setCurrentTab('medical')} 
                className="mb-8 cursor-pointer group border-b border-[#111111]/10 pb-6"
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[#111111]/60 group-hover:text-[#ff3b00] transition-colors font-bold">
                    Docket #658959
                  </span>
                  <span className="mono text-[0.6rem] text-[#ff3b00]">22-Day Hold</span>
                </div>
                <h4 className="font-serif text-2xl font-semibold my-2 text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                  Harborview Medical Audit
                </h4>
                <p className="mono text-xs normal-case tracking-normal opacity-85 line-clamp-3 leading-relaxed text-neutral-700">
                  Lab records reveal 95% neutrophils in CSF (inconsistent with viral/neurosyphilis lymphocytic norm) yet justified 22 days of involuntary hold and forced meds.
                </p>
                <div className="mt-3 flex items-center gap-1.5 mono text-[0.62rem] text-[#111111] group-hover:text-[#ff3b00]">
                  <span>Inspect Lumbar Puncture Audit</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Docket 2: Municipal Database Sync Failure */}
              <div 
                onClick={() => onSelectCase('660121')} 
                className="mb-8 cursor-pointer group border-b border-[#111111]/10 pb-6"
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[#111111]/60 group-hover:text-[#ff3b00] transition-colors font-bold">
                    Docket #660121
                  </span>
                  <span className="mono text-[0.6rem] text-neutral-500">May 15, 2021</span>
                </div>
                <h4 className="font-serif text-2xl font-semibold my-2 text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                  Municipal Database Sync Failure
                </h4>
                <p className="mono text-xs normal-case tracking-normal opacity-85 line-clamp-3 leading-relaxed text-neutral-700">
                  Expired protective order erroneously flagged as active produced unlawful custodial actions on May 15, 2021.
                </p>
                <div className="mt-3 flex items-center gap-1.5 mono text-[0.62rem] text-[#111111] group-hover:text-[#ff3b00]">
                  <span>Review Docket File</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Docket 3: Midvale Ave N Deed Scrubbing */}
              <div 
                onClick={() => setCurrentTab('timeline')} 
                className="mb-8 cursor-pointer group border-b border-[#111111]/10 pb-6"
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[#111111]/60 group-hover:text-[#ff3b00] transition-colors font-bold">
                    Forensics: Urban Erasure
                  </span>
                  <span className="mono text-[0.6rem] text-neutral-500">Spatial Audit</span>
                </div>
                <h4 className="font-serif text-2xl font-semibold my-2 text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                  Midvale Ave N Deed Scrubbing
                </h4>
                <p className="mono text-xs normal-case tracking-normal opacity-85 line-clamp-3 leading-relaxed text-neutral-700">
                  Examination of 911 dispatch spikes across two residential blocks, followed by rapid property sales and alterations.
                </p>
                <div className="mt-3 flex items-center gap-1.5 mono text-[0.62rem] text-[#111111] group-hover:text-[#ff3b00]">
                  <span>Inspect Timeline Record</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Docket 4: Warrantless Bedroom Seizure */}
              <div 
                onClick={() => onSelectCase('658931')} 
                className="mb-8 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[#111111]/60 group-hover:text-[#ff3b00] transition-colors font-bold">
                    Docket #658931
                  </span>
                  <span className="mono text-[0.6rem] text-[#ff3b00]">Dismissed</span>
                </div>
                <h4 className="font-serif text-2xl font-semibold my-2 text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                  No Complaint Filed Dismissal
                </h4>
                <p className="mono text-xs normal-case tracking-normal opacity-85 line-clamp-3 leading-relaxed text-neutral-700">
                  Physical bedroom arrest followed by King County Jail overnight hold, dismissed by Judge McDowall when the City failed to produce any complaint.
                </p>
                <div className="mt-3 flex items-center gap-1.5 mono text-[0.62rem] text-[#111111] group-hover:text-[#ff3b00]">
                  <span>Inspect Case Dossier</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="pt-4 space-y-2 border-t-2 border-[#111111]">
              <button
                onClick={() => setCurrentTab('cases')}
                className="w-full text-left p-3 border border-[#111111]/15 hover:border-[#111111] hover:bg-black/[0.03] transition flex items-center justify-between mono text-[0.65rem] font-bold"
              >
                <span>View All 8 Court Dockets</span>
                <Scale className="w-3.5 h-3.5 text-[#ff3b00]" />
              </button>
              <button
                onClick={() => setCurrentTab('network')}
                className="w-full text-left p-3 border border-[#111111]/15 hover:border-[#111111] hover:bg-black/[0.03] transition flex items-center justify-between mono text-[0.65rem] font-bold"
              >
                <span>Surveillance Network Map (57 Entities)</span>
                <Database className="w-3.5 h-3.5 text-[#ff3b00]" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Secondary Forensic Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 border-t-2 border-[#111111] mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 mb-8">
          <div>
            <div className="mono text-[#ff3b00] font-bold text-[0.65rem]">
              Archive Section // Comprehensive Audits
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] mt-1">
              Court Dockets & Forensic Chronology
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('news')}
            className="mono text-[0.68rem] text-[#111111] hover:text-[#ff3b00] font-bold flex items-center gap-1.5"
          >
            <span>All Special Investigations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-Column Dossier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: 5-Year Chronology */}
          <div 
            onClick={() => setCurrentTab('timeline')}
            className="border border-[#111111]/15 hover:border-[#ff3b00] p-6 flex flex-col justify-between cursor-pointer group bg-transparent transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="mono text-[0.65rem] text-[#ff3b00] font-bold">Chronology 2020–2026</span>
                <Clock className="w-4 h-4 text-[#111111] opacity-40 group-hover:opacity-100 group-hover:text-[#ff3b00]" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                Systemic Timeline Audit
              </h3>
              <p className="mono text-xs normal-case tracking-normal opacity-85 leading-relaxed text-neutral-700">
                12 chronological chapters tracking 911 call records, warrantless entries, competency evaluations, and speedy trial tolling across five years.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#111111]/10 flex items-center justify-between mono text-[0.65rem]">
              <span>{timelineEvents.length} Verified Events</span>
              <span className="text-[#ff3b00] font-bold flex items-center gap-1">
                Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Card 2: Harborview Lumbar Puncture */}
          <div 
            onClick={() => setCurrentTab('medical')}
            className="border border-[#111111]/15 hover:border-[#ff3b00] p-6 flex flex-col justify-between cursor-pointer group bg-transparent transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="mono text-[0.65rem] text-[#ff3b00] font-bold">Harborview Medical</span>
                <Activity className="w-4 h-4 text-[#111111] opacity-40 group-hover:opacity-100 group-hover:text-[#ff3b00]" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                95% Neutrophils CSF Record
              </h3>
              <p className="mono text-xs normal-case tracking-normal opacity-85 leading-relaxed text-neutral-700">
                Lab records indicate acute mechanical or bacterial insult rather than viral etiology, contradicting grounds used for involuntary psych holds.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#111111]/10 flex items-center justify-between mono text-[0.65rem]">
              <span className="text-emerald-700 font-bold">Restored Feb 2026</span>
              <span className="text-[#ff3b00] font-bold flex items-center gap-1">
                Review Lab Audit <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Card 3: Evidence Vault */}
          <div 
            onClick={() => setCurrentTab('evidence')}
            className="border border-[#111111]/15 hover:border-[#ff3b00] p-6 flex flex-col justify-between cursor-pointer group bg-transparent transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="mono text-[0.65rem] text-[#ff3b00] font-bold">Evidence Vault</span>
                <Layers className="w-4 h-4 text-[#111111] opacity-40 group-hover:opacity-100 group-hover:text-[#ff3b00]" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#111111] group-hover:text-[#ff3b00] transition-colors">
                Primary Audio & Records
              </h3>
              <p className="mono text-xs normal-case tracking-normal opacity-85 leading-relaxed text-neutral-700">
                Direct access to King County Superior Court motions, 911 audio recordings, medical charts, and unredacted institutional correspondence.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#111111]/10 flex items-center justify-between mono text-[0.65rem]">
              <span>{evidence.length} Primary Documents</span>
              <span className="text-[#ff3b00] font-bold flex items-center gap-1">
                Open Vault <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
