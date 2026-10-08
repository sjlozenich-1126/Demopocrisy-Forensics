import React from 'react';
import { useData } from '../context/DataContext';
import { Lock, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, onOpenAdminLogin }) => {
  const { settings, isAdmin } = useData();

  return (
    <footer className="border-t-2 border-[#111111] bg-[#f8f7f4] mt-16 sm:mt-24 transition-colors">
      {/* Top Editorial Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Left: Forensic Archive Copyright & Scope */}
        <div className="space-y-1">
          <div className="mono text-[0.68rem] text-[#111111] opacity-90 font-bold">
            © 2026 Forensic Investigative Archive // KING COUNTY WA
          </div>
          <div className="mono text-[0.6rem] text-neutral-500">
            Procedural Justice, CrR 3.3 Speed-Trial Audits & Institutional Due Process
          </div>
        </div>

        {/* Right: Contact & Primary Action Button matching Variation 3 */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a 
            href={`mailto:${settings.authorEmail || 'shane@jonathanshaneconcepts.com'}`}
            className="mono text-[0.68rem] text-[#111111] opacity-75 hover:opacity-100 hover:text-[#ff3b00] transition-colors"
          >
            {settings.authorEmail || 'shane@jonathanshaneconcepts.com'}
          </a>

          <a 
            href="https://techhumano.com" 
            target="_blank" 
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 mono text-[0.65rem] text-neutral-600 hover:text-[#111111] transition-colors"
          >
            Techhumano.com <ArrowUpRight className="w-3 h-3 text-[#ff3b00]" />
          </a>

          <button
            onClick={() => {
              setCurrentTab('submissions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cta-btn text-[0.65rem] sm:text-[0.7rem] px-5 py-2.5"
          >
            Submit Evidence Drop
          </button>
        </div>

      </div>

      {/* Subtle Bottom Strip */}
      <div className="border-t border-[#111111]/10 bg-[#f1efe9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <span className="mono text-[0.6rem] text-neutral-500">
            RCW 10.77 Involuntary Holds & Forensic Acoustic Record Audit
          </span>
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <button 
                onClick={() => {
                  setCurrentTab('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="mono text-[0.6rem] text-[#ff3b00] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ShieldCheck className="w-3 h-3" /> Editorial CMS Active
              </button>
            ) : (
              <button 
                onClick={onOpenAdminLogin} 
                className="mono text-[0.6rem] text-neutral-500 hover:text-[#111111] flex items-center gap-1 cursor-pointer transition"
              >
                <Lock className="w-2.5 h-2.5 text-[#ff3b00]" /> Editorial Login
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
