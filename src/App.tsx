import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AdminLoginModal } from './components/AdminLoginModal';

// Views
import { HomeView } from './views/HomeView';
import { CasesView } from './views/CasesView';
import { TimelineView } from './views/TimelineView';
import { NewsView } from './views/NewsView';
import { MedicalView } from './views/MedicalView';
import { EvidenceView } from './views/EvidenceView';
import { NetworkAnalysisView } from './views/NetworkAnalysisView';
import { SubmissionsView } from './views/SubmissionsView';
import { ProfileView } from './views/ProfileView';
import { AdminView } from './views/AdminView';

function AppContent() {
  const { isAdmin } = useData();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Deep-link entity selection states
  const [selectedCaseId, setSelectedCaseId] = useState<string | undefined>();
  const [selectedArticleId, setSelectedArticleId] = useState<string | undefined>();
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | undefined>();
  const [selectedTimelineId, setSelectedTimelineId] = useState<string | undefined>();

  // Global keyboard shortcut for Search (CMD/CTRL + K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsAdminModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for cross-view navigation
  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentTab('cases');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentTab('news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEvidence = (evidenceId: string) => {
    setSelectedEvidenceId(evidenceId);
    setCurrentTab('evidence');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTimeline = (timelineId: string) => {
    setSelectedTimelineId(timelineId);
    setCurrentTab('timeline');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#FF3B00] selection:text-white">
      {/* Editorial Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdminLogin={() => {
          if (isAdmin) {
            handleTabChange('admin');
          } else {
            setIsAdminModalOpen(true);
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={handleTabChange}
            onSelectCase={handleSelectCase}
            onSelectArticle={handleSelectArticle}
            onSelectEvidence={handleSelectEvidence}
          />
        )}

        {currentTab === 'cases' && (
          <CasesView
            selectedCaseId={selectedCaseId}
            onSelectCase={handleSelectCase}
            onSelectEvidence={handleSelectEvidence}
          />
        )}

        {currentTab === 'timeline' && (
          <TimelineView
            onSelectCase={handleSelectCase}
            selectedEventId={selectedTimelineId}
          />
        )}

        {currentTab === 'news' && (
          <NewsView
            onSelectCase={handleSelectCase}
            selectedArticleId={selectedArticleId}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentTab === 'medical' && (
          <MedicalView
            onSelectEvidence={handleSelectEvidence}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentTab === 'evidence' && (
          <EvidenceView
            selectedEvidenceId={selectedEvidenceId}
            onSelectEvidence={handleSelectEvidence}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentTab === 'network' && (
          <NetworkAnalysisView
            onSelectCase={handleSelectCase}
          />
        )}

        {currentTab === 'submissions' && (
          <SubmissionsView
            onSelectCase={handleSelectCase}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            onSelectCase={handleSelectCase}
            setCurrentTab={handleTabChange}
          />
        )}

        {currentTab === 'admin' && (
          <AdminView />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        setCurrentTab={handleTabChange}
        onOpenAdminLogin={() => {
          if (isAdmin) {
            handleTabChange('admin');
          } else {
            setIsAdminModalOpen(true);
          }
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCase={handleSelectCase}
        onSelectArticle={handleSelectArticle}
        onSelectEvidence={handleSelectEvidence}
        onSelectTimeline={handleSelectTimeline}
      />

      {/* Admin Passcode Authentication Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          setIsAdminModalOpen(false);
          handleTabChange('admin');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
