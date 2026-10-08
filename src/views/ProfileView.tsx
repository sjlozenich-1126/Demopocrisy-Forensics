import React from 'react';
import { useData } from '../context/DataContext';
import { 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Globe, 
  ArrowUpRight,
  Scale, 
  Activity, 
  FileText,
  CheckCircle2,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface ProfileViewProps {
  onSelectCase: (caseId: string) => void;
  setCurrentTab: (tab: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onSelectCase, setCurrentTab }) => {
  const { settings, cases } = useData();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-12 bg-white overflow-x-hidden">
      
      {/* Editorial Header - The Intercept Style */}
      <div className="border-b-4 border-black pb-6 space-y-3">
        <div className="w-12 h-1.5 bg-[#FF3B00] mb-2"></div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-black text-[#FF3B00] uppercase tracking-widest">
            // INVESTIGATIVE DOSSIER • SUBJECT BIOGRAPHY & LEGAL MATRIX
          </span>
          <span className="text-neutral-400 font-mono text-xs hidden sm:inline">•</span>
          <span className="text-xs font-mono text-neutral-600 uppercase tracking-wider hidden sm:inline">
            JURISDICTIONAL AUDIT 2021–2026
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-black leading-[1.08] tracking-tight">
          {settings.authorName || 'Shane Jonathan Lozenich'}
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 font-serif italic max-w-3xl leading-relaxed">
          Systems architect, researcher, and author of the Demopocrisy forensic audit mapping due process breakdowns, privacy intrusions, and constitutional vulnerabilities across Washington State tribunals.
        </p>

        {/* Audit Status Strip */}
        <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-mono border-t border-neutral-200">
          <div className="flex items-center gap-1.5 text-neutral-800">
            <span className="w-2 h-2 rounded-full bg-[#FF3B00]"></span>
            <span className="font-bold">STATUS:</span>
            <span>Competency Restored (Feb 2026)</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-800">
            <span className="font-bold">DOCKETS:</span>
            <span>8 Proceedings Audited</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-800">
            <span className="font-bold">CUSTODY:</span>
            <span>365+ Days Detained (No Convictions)</span>
          </div>
        </div>
      </div>

      {/* Main Profile Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column: Bio Card, Contact & Corridor (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Subject Dossier Card */}
          <div className="bg-white border-2 border-black p-5 sm:p-6 shadow-xs space-y-5">
            
            {/* Subject Identity Header */}
            <div className="border-b-2 border-black pb-4 space-y-1.5">
              <span className="bg-[#FF3B00] text-white text-[10px] font-mono font-black uppercase px-2 py-0.5 tracking-widest inline-block mb-1">
                SUBJECT 01
              </span>
              <h3 className="font-serif font-black text-2xl text-black tracking-tight leading-tight">
                {settings.authorName || 'Shane Jonathan Lozenich'}
              </h3>
              <p className="text-xs font-mono text-[#FF3B00] font-bold">
                Forensic Author & Subject
              </p>
              <p className="text-xs font-mono text-neutral-600">
                {settings.authorOrg}
              </p>
            </div>

            {/* Channels & Meta */}
            <div className="space-y-3 pt-1 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-neutral-800">
                <Mail className="w-4 h-4 text-[#FF3B00] shrink-0" />
                <a href={`mailto:${settings.authorEmail}`} className="hover:text-[#FF3B00] text-black font-bold truncate transition-colors">
                  {settings.authorEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-800">
                <Globe className="w-4 h-4 text-[#FF3B00] shrink-0" />
                <a 
                  href="https://techhumano.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#FF3B00] text-black font-bold flex items-center gap-1 transition-colors"
                >
                  techhumano.com <ArrowUpRight className="w-3 h-3 text-[#FF3B00]" />
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-800">
                <MapPin className="w-4 h-4 text-[#FF3B00] shrink-0" />
                <span className="font-medium">Seattle & Kitsap County, WA</span>
              </div>
            </div>
          </div>

          {/* Corridor Designation Card */}
          <div className="bg-black text-white p-5 sm:p-6 space-y-3 border-2 border-black shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF3B00]">
                // Corridor Designation
              </h4>
              <span className="text-[10px] font-mono text-neutral-400 uppercase">TITLE & BOUNDARY</span>
            </div>
            <p className="text-sm text-neutral-200 font-serif leading-relaxed">
              {settings.majoratCorridorName}
            </p>
            <p className="text-[11px] font-mono text-neutral-400 pt-3 border-t border-neutral-800 leading-normal">
              Majorat lineage status and security audit framework covering Puget Sound maritime routes, King County municipal jurisdiction, and historical land stewardship declarations.
            </p>
          </div>

          {/* Clinical & Restoration Verification Card */}
          <div className="bg-neutral-50 border-2 border-black p-5 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-black">
              <ShieldCheck className="w-4 h-4 text-[#FF3B00]" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                Clinical Restoration Seal
              </h4>
            </div>
            <p className="text-xs text-neutral-700 font-serif leading-relaxed">
              Evaluated by Dr. Jamie Leavey (DSHS Office of Forensic Mental Health Services, Feb 2026). Full cognitive integrity affirmed with zero active psychosis, formally concluding five years of procedural competency stalling.
            </p>
            <div className="text-[10px] font-mono text-neutral-500 pt-2 border-t border-neutral-300 flex justify-between items-center">
              <span>DOC REF: #EVD-2026-MED01</span>
              <button 
                onClick={() => setCurrentTab('medical')}
                className="text-[#FF3B00] font-bold hover:underline"
              >
                View Audit →
              </button>
            </div>
          </div>

        </div>

        {/* Right Detailed Narrative & Case Matrix (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Narrative Overview Card */}
          <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-6 shadow-xs">
            
            <div className="border-b-2 border-black pb-3 flex flex-wrap justify-between items-baseline gap-2">
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-black">
                Forensic Background & Scope of Audit
              </h2>
              <span className="text-xs font-mono text-[#FF3B00] font-bold uppercase tracking-wider">
                // EXECUTIVE ARCHIVE
              </span>
            </div>

            {/* Editorial Blockquote */}
            <blockquote className="border-l-4 border-[#FF3B00] bg-neutral-50 p-4 sm:p-5 border-y border-r border-neutral-200">
              <p className="text-base sm:text-lg leading-relaxed text-black font-serif italic">
                “This archive was not assembled out of abstract interest; it represents a forensic self-audit documenting five years of state custody, unfiled criminal charges, and institutional delays across eight legal proceedings.”
              </p>
            </blockquote>

            {/* Narrative Body */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-800 font-serif leading-relaxed">
              <p>
                Shane Jonathan Lozenich experienced a continuous chain of legal and medical interactions between 2021 and 2026. Following the catastrophic 1.6-million-record Washington State Auditor Accellion data breach, Lozenich reported active digital stalking and spoofed communication channels that were dismissed by local authorities without investigation.
              </p>
              <p>
                Over the subsequent five years, an apparatus of administrative substitution led to 365+ days in pretrial custody across King County Jail, two involuntary psychiatric commitments at Harborview Medical Center and Western State Hospital, and multiple case dismissals where prosecutors failed to file formal criminal complaints.
              </p>
              <p>
                In February 2026, forensic psychologist Dr. Leavey restored Lozenich's legal competency unconditionally, verifying his cognitive integrity and concluding the five-year cycle of procedural delay.
              </p>
            </div>

            {/* Key Dossier Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-black">
              <div className="p-3 bg-neutral-50 border border-neutral-300">
                <span className="block text-[10px] font-mono text-neutral-500 uppercase">Docket Span</span>
                <span className="font-serif font-black text-lg text-black">2021–2026</span>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-300">
                <span className="block text-[10px] font-mono text-neutral-500 uppercase">Custody Days</span>
                <span className="font-serif font-black text-lg text-[#FF3B00]">365+</span>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-300">
                <span className="block text-[10px] font-mono text-neutral-500 uppercase">Accellion Vector</span>
                <span className="font-serif font-black text-lg text-black">1.6M WA</span>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-300">
                <span className="block text-[10px] font-mono text-neutral-500 uppercase">Competency</span>
                <span className="font-serif font-black text-lg text-black">Restored</span>
              </div>
            </div>

            {/* Matrix of Case Engagements */}
            <div className="pt-6 border-t-2 border-black space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                  Direct Case Engagements & Dockets ({cases.length})
                </h3>
                <span className="text-[11px] font-mono text-neutral-500">Click docket to view full case study</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cases.map((c) => (
                  <div 
                    key={c.id}
                    onClick={() => onSelectCase(c.id)}
                    className="p-4 bg-white border-2 border-black hover:border-[#FF3B00] hover:bg-neutral-50 cursor-pointer transition flex flex-col justify-between group shadow-xs"
                  >
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
                        <span className="font-black text-black group-hover:text-[#FF3B00] transition-colors">#{c.caseNumber}</span>
                        <span className="text-[#FF3B00] font-black">{c.year}</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-neutral-900 leading-snug group-hover:text-[#FF3B00] transition-colors line-clamp-2">
                        {c.title}
                      </h4>
                      <p className="text-xs text-neutral-600 font-serif mt-1 line-clamp-2">
                        {c.cause}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-neutral-200 flex justify-between items-center text-[10px] font-mono">
                      <span className="text-neutral-500 truncate max-w-[170px]">{c.court}</span>
                      <span className="font-bold text-neutral-800 uppercase tracking-tight truncate pl-2">
                        {c.disposition}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="pt-6 border-t-2 border-black flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
              <button
                onClick={() => setCurrentTab('timeline')}
                className="bg-black text-white px-5 py-2.5 text-xs font-serif font-black uppercase tracking-wider hover:bg-[#FF3B00] transition-colors cursor-pointer"
              >
                View 5-Year Chronology →
              </button>
              <button
                onClick={() => setCurrentTab('cases')}
                className="text-[#FF3B00] font-serif font-bold text-xs uppercase tracking-wider hover:underline cursor-pointer"
              >
                Explore All Case Studies →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
