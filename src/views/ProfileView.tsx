import React from 'react';
import { useData } from '../context/DataContext';
import { 
  MapPin, 
  Mail, 
  Globe, 
  ArrowUpRight
} from 'lucide-react';

interface ProfileViewProps {
  onSelectCase: (caseId: string) => void;
  setCurrentTab: (tab: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onSelectCase, setCurrentTab }) => {
  const { settings, cases } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Editorial Header */}
      <div className="border-b-2 border-black pb-4">
        <div className="flex items-center space-x-2 mb-1">
          <span className="bg-[#FF3B00] text-white text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider font-mono">
            Subject Profile & Lineage
          </span>
          <span className="text-[10px] font-mono text-black/60 uppercase tracking-[0.15em]">
            Biographical Dossier & Jurisdictional Background
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 font-serif leading-tight">
          Shane Jonathan Lozenich
        </h2>
        <p className="text-sm text-neutral-600 font-serif italic mt-1 max-w-3xl">
          Systems architect, researcher, and author of the Demopocrisy forensic audit mapping due process breakdowns, privacy intrusions, and constitutional vulnerabilities in Washington State.
        </p>
      </div>

      {/* Main Profile Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Bio Card & Contact (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border-2 border-black p-6 shadow-xs space-y-4">
            <div className="aspect-square bg-neutral-900 text-white flex flex-col items-center justify-center p-6 text-center border-2 border-black">
              <div className="w-20 h-20 rounded-full border-2 border-[#FF3B00] flex items-center justify-center text-3xl font-serif font-black text-white bg-black mb-3">
                SJL
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Shane J. Lozenich</h3>
              <p className="text-xs font-mono text-[#FF3B00] mt-0.5">Forensic Author & Subject</p>
              <p className="text-[11px] font-mono text-neutral-400 mt-1">Techhumano / Jonathan Shane Concepts</p>
            </div>

            <div className="space-y-3 pt-2 text-xs font-mono border-t border-black/10">
              <div className="flex items-center gap-2 text-neutral-700">
                <Mail className="w-3.5 h-3.5 text-[#FF3B00]" />
                <a href={`mailto:${settings.authorEmail}`} className="hover:underline text-black font-semibold">
                  {settings.authorEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <Globe className="w-3.5 h-3.5 text-[#FF3B00]" />
                <a href="https://techhumano.com" target="_blank" rel="noreferrer" className="hover:underline text-black font-semibold flex items-center gap-1">
                  techhumano.com <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <MapPin className="w-3.5 h-3.5 text-[#FF3B00]" />
                <span>Seattle & Kitsap County, WA</span>
              </div>
            </div>
          </div>

          <div className="bg-black text-white p-6 space-y-3 border-2 border-black">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF3B00]">
              Corridor Designation
            </h4>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              {settings.majoratCorridorName}
            </p>
            <p className="text-[10px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
              Majorat lineage status and security audit framework covering Puget Sound maritime routes and municipal jurisdictions.
            </p>
          </div>
        </div>

        {/* Right Detailed Narrative & Case Matrix (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="font-serif font-bold text-2xl text-neutral-900 border-b-2 border-black pb-3">
              Forensic Background & Scope of Audit
            </h3>

            <p className="text-base leading-relaxed text-black/80 font-serif italic border-l-4 border-[#FF3B00] pl-4">
              “This archive was not assembled out of abstract interest; it represents a forensic self-audit documenting five years of state custody, unfiled criminal charges, and institutional delays across eight legal proceedings.”
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-800 font-serif leading-relaxed">
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

            {/* Matrix of Case Engagements */}
            <div className="pt-4 border-t-2 border-black space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900">
                Direct Case Engagements & Dockets
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cases.map((c) => (
                  <div 
                    key={c.id}
                    onClick={() => onSelectCase(c.id)}
                    className="p-3.5 bg-white border-2 border-black hover:bg-neutral-50 cursor-pointer transition flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
                        <span className="font-bold text-black">#{c.caseNumber}</span>
                        <span className="text-[#FF3B00] font-bold">{c.year}</span>
                      </div>
                      <h5 className="font-serif font-bold text-sm text-neutral-900 leading-snug group-hover:text-[#FF3B00] transition-colors">
                        {c.title}
                      </h5>
                      <p className="text-[11px] text-neutral-600 font-serif mt-1 line-clamp-2">{c.cause}</p>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 pt-2.5 mt-2 border-t border-neutral-200 text-right">
                      {c.disposition}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-black flex flex-wrap justify-between items-center gap-3 text-xs font-mono">
              <button
                onClick={() => setCurrentTab('timeline')}
                className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF3B00] transition-colors"
              >
                View 5-Year Chronology →
              </button>
              <button
                onClick={() => setCurrentTab('cases')}
                className="text-[#FF3B00] font-bold hover:underline"
              >
                Explore All Case Studies
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
