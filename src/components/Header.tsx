import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Search, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Menu, 
  X, 
  ArrowRight,
  Clock,
  Scale,
  FileText,
  Activity,
  Layers,
  Database,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAdminLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  onOpenAdminLogin
}) => {
  const { isAdmin, logoutAdmin } = useData();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const primaryNavItems = [
    { id: 'news', label: 'Investigative Bureau', desc: 'Special Investigations & Reporting', icon: FileText },
    { id: 'cases', label: 'Legal Systems Audit', desc: 'Court Cases, Dockets & Due Process', icon: Scale },
    { id: 'timeline', label: 'Urban Forensics & Timeline', desc: '5-Year Chronology (2020–2026)', icon: Clock },
    { id: 'medical', label: 'Forensic Medical Audit', desc: 'Harborview CSF & Clinical Status', icon: Activity },
    { id: 'evidence', label: 'Evidence Vault Archive', desc: 'Audio, Discovery & Public Records', icon: Layers },
    { id: 'network', label: 'Surveillance Network Map', desc: '57 Documented Systemic Entities', icon: Database },
    { id: 'profile', label: 'Investigative Dossier', desc: 'Subject Profile & Constitutional Defense', icon: UserCheck }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setDrawerOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#f8f7f4] border-b-2 border-[#111111]">
        {/* Masthead Navigation matching Variation 3 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1.5 -ml-1 text-[#111111] hover:text-[#ff3b00] transition-colors cursor-pointer flex items-center gap-1.5 group shrink-0"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline mono text-[0.65rem] font-bold">Index</span>
            </button>

            <button 
              onClick={() => handleNavClick('home')}
              className="font-serif italic font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#111111] hover:text-[#ff3b00] transition-colors cursor-pointer tracking-tight truncate"
            >
              Demopocrisy_
            </button>
          </div>

          {/* Center: Curated Bureau Links matching Variation 3 HTML */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            <button
              onClick={() => handleNavClick('news')}
              className={`mono transition-colors cursor-pointer pb-0.5 border-b-2 ${
                currentTab === 'news' 
                  ? 'text-[#ff3b00] opacity-100 border-[#ff3b00] font-bold' 
                  : 'text-[#111111] opacity-70 hover:opacity-100 hover:text-[#ff3b00] border-transparent'
              }`}
            >
              Investigative Bureau
            </button>
            <button
              onClick={() => handleNavClick('cases')}
              className={`mono transition-colors cursor-pointer pb-0.5 border-b-2 ${
                currentTab === 'cases' 
                  ? 'text-[#ff3b00] opacity-100 border-[#ff3b00] font-bold' 
                  : 'text-[#111111] opacity-70 hover:opacity-100 hover:text-[#ff3b00] border-transparent'
              }`}
            >
              Legal Systems Audit
            </button>
            <button
              onClick={() => handleNavClick('timeline')}
              className={`mono transition-colors cursor-pointer pb-0.5 border-b-2 ${
                currentTab === 'timeline' 
                  ? 'text-[#ff3b00] opacity-100 border-[#ff3b00] font-bold' 
                  : 'text-[#111111] opacity-70 hover:opacity-100 hover:text-[#ff3b00] border-transparent'
              }`}
            >
              Urban Forensics
            </button>
          </div>

          {/* Right: Search, Admin & Primary Action Button */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Icon Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#111111] hover:text-[#ff3b00] transition cursor-pointer"
              title="Search Archive (⌘K)"
              aria-label="Search Archive"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </button>

            {/* Admin Login / CMS Status */}
            {isAdmin ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="flex items-center gap-1 px-2.5 py-1.5 mono text-[0.65rem] font-bold bg-[#111111] text-[#f8f7f4] hover:bg-[#ff3b00] transition cursor-pointer"
                  title="Editorial CMS Active"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ff3b00]" />
                  <span className="hidden sm:inline">CMS</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  className="p-1.5 text-neutral-600 hover:text-[#111111] transition cursor-pointer"
                  title="Logout"
                >
                  <Unlock className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 mono text-[0.65rem] text-[#111111] hover:text-[#ff3b00] transition cursor-pointer"
                title="Admin Authentication"
              >
                <Lock className="w-3 h-3 text-[#ff3b00]" />
                <span>Admin</span>
              </button>
            )}

            {/* Brutalist Editorial CTA Button matching Variation 3 */}
            <button
              onClick={() => handleNavClick('submissions')}
              className="cta-btn text-[0.65rem] sm:text-[0.7rem] px-3.5 sm:px-6 py-2 sm:py-2.5 shadow-none"
            >
              <span className="hidden sm:inline">Submit Evidence Drop</span>
              <span className="sm:hidden">Evidence Drop</span>
            </button>
          </div>

        </div>
      </header>

      {/* Slide-out Sidebar Drawer for All Views */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-[#f8f7f4] h-full shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-r-2 border-[#111111] animate-in slide-in-from-left duration-200">
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Drawer Top: Close & Logo */}
              <div className="flex items-center justify-between border-b-2 border-[#111111] pb-4">
                <div className="font-serif italic font-semibold text-2xl tracking-tight text-[#111111]">
                  Demopocrisy_
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 text-[#111111] hover:text-[#ff3b00] cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-6 h-6 stroke-[2.2]" />
                </button>
              </div>

              {/* Drawer Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#111111] absolute left-3 top-3.5 opacity-60" />
                <input
                  type="text"
                  placeholder="SEARCH CASE VAULT & DOSSIER..."
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenSearch();
                  }}
                  readOnly
                  className="w-full bg-white border border-[#111111]/20 py-2.5 pl-9 pr-3 mono text-[0.7rem] placeholder:text-neutral-500 cursor-pointer focus:border-[#ff3b00] focus:outline-none"
                />
              </div>

              {/* Primary Section Links */}
              <div className="space-y-2 pt-2">
                <div className="mono text-[0.65rem] text-[#111111] opacity-50 pb-1 border-b border-[#111111]/10">
                  Forensic Archive Directory
                </div>
                {primaryNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left p-3 transition-colors cursor-pointer flex items-center justify-between border ${
                        currentTab === item.id 
                          ? 'border-[#ff3b00] bg-[#ff3b00]/5 text-[#111111]' 
                          : 'border-transparent hover:border-[#111111]/15 hover:bg-black/[0.02]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-serif text-lg font-semibold text-[#111111] flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${currentTab === item.id ? 'text-[#ff3b00]' : 'text-neutral-500'}`} />
                          <span>{item.label}</span>
                        </div>
                        <div className="mono text-[0.6rem] text-neutral-600 pl-6">
                          {item.desc}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-40 text-[#111111]" />
                    </button>
                  );
                })}
              </div>

              {/* Solid Action Button in Drawer */}
              <div className="pt-2">
                <button
                  onClick={() => handleNavClick('submissions')}
                  className="cta-btn w-full py-3.5 text-center justify-center"
                >
                  <span>Submit Evidence Drop →</span>
                </button>
              </div>
            </div>

            {/* Drawer Bottom Footer */}
            <div className="p-6 bg-[#f1efe9] border-t-2 border-[#111111] flex items-center justify-between text-xs font-serif">
              {isAdmin ? (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="mono text-[0.65rem] text-[#ff3b00] font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> CMS Dashboard Active
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="mono text-[0.65rem] text-[#111111] opacity-70 hover:opacity-100 hover:text-[#ff3b00] flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-[#ff3b00]" /> Editorial Login
                </button>
              )}
              <span className="mono text-[0.6rem] text-neutral-500">Demopocrisy Forensics</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
