import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Search, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Menu, 
  X, 
  FileText, 
  Layers, 
  Activity, 
  Database, 
  Clock, 
  Send, 
  Scale, 
  ArrowRight
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
    { id: 'timeline', label: 'Timeline Chronology' },
    { id: 'cases', label: 'Court Cases & Dockets' },
    { id: 'news', label: 'Special Investigations' },
    { id: 'medical', label: 'Forensic Medical Audit' },
    { id: 'evidence', label: 'Evidence Vault Archive' },
    { id: 'network', label: 'Surveillance Network Map' },
    { id: 'profile', label: 'Investigative Dossier' }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setDrawerOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        {/* Main Masthead Bar - Clean Editorial Style */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left: Hamburger, Brand Logo & Sub-tagline */}
          <div className="flex items-start gap-3 sm:gap-5 min-w-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1 sm:p-2 -ml-1 sm:-ml-2 text-black hover:text-[#FF3B00] transition-colors cursor-pointer flex items-center gap-1.5 group shrink-0 mt-1"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline font-serif font-black text-xs uppercase tracking-wider">Menu</span>
            </button>

            <div className="flex flex-col min-w-0">
              <button 
                onClick={() => handleNavClick('home')}
                className="font-serif font-black text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] tracking-tight text-black hover:text-[#FF3B00] transition-colors cursor-pointer flex items-baseline text-left leading-none"
              >
                <span>DEMOPOCRISY</span>
                <span className="font-sans font-black text-[#FF3B00] ml-0.5 sm:ml-1">_</span>
              </button>

              {/* Forensic Public Interest Audit Sub-title */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-serif text-neutral-600 mt-2">
                <span className="font-bold text-[#FF3B00] uppercase tracking-wider text-[11px]">
                  Forensic Public Interest Audit
                </span>
                <span className="text-neutral-300 hidden sm:inline">|</span>
                <span className="text-neutral-700 leading-snug">
                  Examining due process, CrR 3.3 speedy trial tolling, and administrative substitutions in Washington State.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Admin & Primary Action Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-end md:self-center">
            {/* Admin Login / CMS Status */}
            {isAdmin ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-serif font-bold uppercase bg-black text-white hover:bg-[#FF3B00] transition cursor-pointer"
                  title="Editorial CMS Active"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF3B00]" />
                  <span className="hidden sm:inline">CMS</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  className="p-1.5 text-neutral-500 hover:text-black transition cursor-pointer"
                  title="Logout"
                >
                  <Unlock className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-serif font-bold uppercase tracking-wider text-black hover:text-[#FF3B00] transition cursor-pointer"
                title="Admin Authentication"
              >
                <Lock className="w-3.5 h-3.5 text-[#FF3B00]" />
                <span>ADMIN</span>
              </button>
            )}

            {/* Bright Orange/Red Action Button - The Intercept Style */}
            <button
              onClick={() => handleNavClick('submissions')}
              className="bg-[#FF3B00] hover:bg-black text-white px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-serif font-black uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              <span className="hidden sm:inline">SUBMIT EVIDENCE</span>
              <span className="sm:hidden">SUBMIT</span>
            </button>
          </div>

        </div>

        {/* Sub-Header Row: Just below the line, right-aligned search bar aligned under CMS / Submit buttons */}
        <div className="border-t border-neutral-200 bg-neutral-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
            {/* Left label / section breadcrumb */}
            <div className="hidden md:flex items-center gap-2 text-[11px] font-sans text-neutral-500 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B00]" />
              <span className="font-semibold text-neutral-700">Official Dossier & Evidence Record</span>
            </div>

            {/* Right: Search bar sized to balance with buttons above */}
            <div className="w-full md:w-auto flex items-center justify-end">
              <button
                onClick={onOpenSearch}
                className="w-full sm:w-80 group flex items-center justify-between bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-400 py-1.5 px-3 transition-colors text-left shadow-2xs cursor-pointer"
                title="Search Archive (⌘K)"
                aria-label="Search Archive"
              >
                <div className="flex items-center gap-2 text-neutral-500">
                  <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#FF3B00] transition-colors" />
                  <span className="text-xs font-sans text-neutral-600">Search cases, dockets, evidence...</span>
                </div>
                <kbd className="hidden sm:inline text-[10px] font-mono bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 text-neutral-500">
                  ⌘K
                </kbd>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Sidebar Drawer - Clean Pop-out from Left */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-r border-neutral-300 animate-in slide-in-from-left duration-200">
            <div className="p-6 space-y-6">
              
              {/* Drawer Top: Close & Logo */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 text-black hover:text-[#FF3B00] cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-6 h-6 stroke-[2]" />
                </button>

                <div className="font-serif font-black text-xl sm:text-2xl tracking-tight text-neutral-900 flex items-baseline">
                  <span>DEMOPOCRISY</span>
                  <span className="font-sans font-black text-[#FF3B00] ml-0.5">_</span>
                </div>
              </div>

              {/* Drawer Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="SEARCH REPOSITORY..."
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenSearch();
                  }}
                  readOnly
                  className="w-full bg-neutral-50 border border-neutral-200 py-2 pl-9 pr-3 text-xs font-sans font-medium uppercase placeholder-neutral-500 cursor-pointer"
                />
              </div>

              {/* Primary Section Links */}
              <div className="space-y-1 font-sans font-bold text-sm tracking-wide uppercase text-neutral-900 pt-1">
                {primaryNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left py-2.5 px-2 transition-colors cursor-pointer flex items-center justify-between border-b border-neutral-100 hover:bg-neutral-50 ${
                      currentTab === item.id ? 'text-[#FF3B00] font-black pl-3 border-l-2 border-l-[#FF3B00]' : 'hover:text-[#FF3B00]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                  </button>
                ))}
              </div>

              {/* Solid Action Button in Drawer */}
              <div className="pt-2">
                <button
                  onClick={() => handleNavClick('submissions')}
                  className="w-full bg-[#FF3B00] hover:bg-neutral-900 text-white py-3 px-4 font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-between shadow-xs"
                >
                  <span>SUBMIT EVIDENCE →</span>
                </button>
              </div>
            </div>

            {/* Drawer Bottom Footer */}
            <div className="p-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-xs font-sans">
              {isAdmin ? (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="text-[#FF3B00] font-bold uppercase hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" /> CMS Dashboard
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="text-black font-bold uppercase hover:text-[#FF3B00] flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-[#FF3B00]" /> Editorial Login
                </button>
              )}
              <span className="text-neutral-500 font-mono text-[10px]">Demopocrisy Archive</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

