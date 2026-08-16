import React from 'react';
import { useData } from '../context/DataContext';
import { Mail, Globe, Lock, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, onOpenAdminLogin }) => {
  const { settings, isAdmin } = useData();

  return (
    <footer className="bg-black text-white border-t-4 border-[#FF3B00] mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-neutral-800">
          
          {/* Brand & Mandate */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-serif font-black text-2xl tracking-tight text-white flex items-baseline">
                <span>DEMOPOCRISY</span>
                <span className="font-sans font-black text-[#FF3B00] ml-0.5">_</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-black bg-[#FF3B00] px-2 py-0.5 font-bold">
                FORENSIC ARCHIVE
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-neutral-400 font-serif max-w-lg">
              An independent repository tracing due process failures, suppressed evidence, custodial administration, and the institutions connecting them.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-serif text-neutral-400">
              <a 
                href={`mailto:${settings.authorEmail}`} 
                className="hover:text-[#FF3B00] flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF3B00]" /> {settings.authorEmail}
              </a>
              <a 
                href="https://techhumano.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" /> Techhumano.com <ArrowUpRight className="w-3 h-3 text-[#FF3B00]" />
              </a>
            </div>
          </div>

          {/* Action Column */}
          <div className="md:col-span-5 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#FF3B00] font-bold">
                Whistleblower Drop
              </div>
              <p className="text-sm text-neutral-400 font-serif leading-relaxed">
                Submit primary court dockets, medical records, or dispatch audio securely.
              </p>
              <button
                onClick={() => {
                  setCurrentTab('submissions');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#FF3B00] hover:bg-white hover:text-black text-white text-xs font-serif font-black uppercase tracking-wider text-center transition cursor-pointer"
              >
                Submit Evidence →
              </button>
            </div>

            <div className="pt-1">
              {isAdmin ? (
                <button 
                  onClick={() => {
                    setCurrentTab('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="text-[#FF3B00] text-xs font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> CMS Active
                </button>
              ) : (
                <button 
                  onClick={onOpenAdminLogin} 
                  className="text-neutral-500 hover:text-white text-xs flex items-center gap-1.5 cursor-pointer transition font-bold"
                >
                  <Lock className="w-3.5 h-3.5 text-[#FF3B00]" /> Editorial Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Notice - Clean */}
        <div className="pt-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-serif text-neutral-500">
          <div>
            © {new Date().getFullYear()} Demopocrisy Repository
          </div>
          <div className="text-neutral-600">
            Open Investigative Archive · King County
          </div>
        </div>
      </div>
    </footer>
  );
};
