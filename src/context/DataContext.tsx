import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CaseStudy,
  TimelineEvent,
  NetworkNode,
  NetworkEdge,
  EvidenceDocument,
  Article,
  UserSubmission,
  PublicComment,
  SiteSettings
} from '../types';
import {
  initialCases,
  initialTimelineEvents,
  initialNetworkNodes,
  initialNetworkEdges,
  initialEvidence,
  initialArticles,
  initialSubmissions,
  initialComments,
  initialSiteSettings
} from '../data/initialData';

interface DataContextType {
  cases: CaseStudy[];
  timelineEvents: TimelineEvent[];
  networkNodes: NetworkNode[];
  networkEdges: NetworkEdge[];
  evidence: EvidenceDocument[];
  articles: Article[];
  submissions: UserSubmission[];
  comments: PublicComment[];
  settings: SiteSettings;
  isAdmin: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  // Case operations
  addCase: (item: CaseStudy) => void;
  updateCase: (id: string, item: Partial<CaseStudy>) => void;
  deleteCase: (id: string) => void;
  // Timeline operations
  addTimelineEvent: (event: TimelineEvent) => void;
  updateTimelineEvent: (id: string, event: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string) => void;
  // Article operations
  addArticle: (article: Article) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  // Evidence operations
  addEvidence: (doc: EvidenceDocument) => void;
  updateEvidence: (id: string, doc: Partial<EvidenceDocument>) => void;
  deleteEvidence: (id: string) => void;
  // Submission operations
  addSubmission: (sub: Omit<UserSubmission, 'id' | 'date' | 'status'>) => void;
  updateSubmissionStatus: (id: string, status: UserSubmission['status'], notes?: string) => void;
  deleteSubmission: (id: string) => void;
  // Comment operations
  addComment: (comment: Omit<PublicComment, 'id' | 'date' | 'approved'>) => void;
  approveComment: (id: string) => void;
  deleteComment: (id: string) => void;
  // Site settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  // Backup / restore
  exportAllData: () => string;
  importAllData: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
  syncToCodebase: () => Promise<{ success: boolean; message: string }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CASES: 'demopocrisy_cases_v1',
  TIMELINE: 'demopocrisy_timeline_v1',
  NODES: 'demopocrisy_nodes_v1',
  EDGES: 'demopocrisy_edges_v1',
  EVIDENCE: 'demopocrisy_evidence_v1',
  ARTICLES: 'demopocrisy_articles_v1',
  SUBMISSIONS: 'demopocrisy_submissions_v1',
  COMMENTS: 'demopocrisy_comments_v1',
  SETTINGS: 'demopocrisy_settings_v1',
  AUTH: 'demopocrisy_is_admin_v1'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<CaseStudy[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CASES);
    return saved ? JSON.parse(saved) : initialCases;
  });

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TIMELINE);
    return saved ? JSON.parse(saved) : initialTimelineEvents;
  });

  const [networkNodes] = useState<NetworkNode[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NODES);
    return saved ? JSON.parse(saved) : initialNetworkNodes;
  });

  const [networkEdges] = useState<NetworkEdge[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EDGES);
    return saved ? JSON.parse(saved) : initialNetworkEdges;
  });

  const [evidence, setEvidence] = useState<EvidenceDocument[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVIDENCE);
    return saved ? JSON.parse(saved) : initialEvidence;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [submissions, setSubmissions] = useState<UserSubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  const [comments, setComments] = useState<PublicComment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    return saved ? JSON.parse(saved) : initialComments;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(timelineEvents));
  }, [timelineEvents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVIDENCE, JSON.stringify(evidence));
  }, [evidence]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  const loginAdmin = (pass: string) => {
    // Default admin password or 'demopocrisy' or 'admin2026'
    if (pass === 'admin2026' || pass === 'demopocrisy' || pass === 'admin') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  // Case Methods
  const addCase = (newCase: CaseStudy) => {
    setCases((prev) => [newCase, ...prev]);
  };

  const updateCase = (id: string, updated: Partial<CaseStudy>) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCase = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  };

  // Timeline Methods
  const addTimelineEvent = (event: TimelineEvent) => {
    setTimelineEvents((prev) => [...prev, event]);
  };

  const updateTimelineEvent = (id: string, updated: Partial<TimelineEvent>) => {
    setTimelineEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteTimelineEvent = (id: string) => {
    setTimelineEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // Article Methods
  const addArticle = (article: Article) => {
    setArticles((prev) => [article, ...prev]);
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  // Evidence Methods
  const addEvidence = (doc: EvidenceDocument) => {
    setEvidence((prev) => [doc, ...prev]);
  };

  const updateEvidence = (id: string, updated: Partial<EvidenceDocument>) => {
    setEvidence((prev) => prev.map((doc) => (doc.id === id ? { ...doc, ...updated } : doc)));
  };

  const deleteEvidence = (id: string) => {
    setEvidence((prev) => prev.filter((doc) => doc.id !== id));
  };

  // Submission Methods
  const addSubmission = (sub: Omit<UserSubmission, 'id' | 'date' | 'status'>) => {
    const newSub: UserSubmission = {
      ...sub,
      id: `sub-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      isPublic: true
    };
    setSubmissions((prev) => [newSub, ...prev]);
  };

  const updateSubmissionStatus = (id: string, status: UserSubmission['status'], notes?: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, verificationNotes: notes || s.verificationNotes } : s))
    );
  };

  const deleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  // Comment Methods
  const addComment = (commentData: Omit<PublicComment, 'id' | 'date' | 'approved'>) => {
    const newComment: PublicComment = {
      ...commentData,
      id: `com-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      approved: true // default approved in demo
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const approveComment = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, approved: true } : c)));
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Export / Import
  const exportAllData = () => {
    const exportBundle = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      cases,
      timelineEvents,
      evidence,
      articles,
      submissions,
      comments,
      settings
    };
    return JSON.stringify(exportBundle, null, 2);
  };

  const importAllData = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.cases) setCases(parsed.cases);
      if (parsed.timelineEvents) setTimelineEvents(parsed.timelineEvents);
      if (parsed.evidence) setEvidence(parsed.evidence);
      if (parsed.articles) setArticles(parsed.articles);
      if (parsed.submissions) setSubmissions(parsed.submissions);
      if (parsed.comments) setComments(parsed.comments);
      if (parsed.settings) setSettings(parsed.settings);
      return true;
    } catch {
      return false;
    }
  };

  const syncToCodebase = async () => {
    try {
      const payload = {
        cases,
        timelineEvents,
        evidence,
        articles,
        submissions,
        comments,
        settings
      };
      const res = await fetch('/api/sync-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return { success: true, message: 'App data and photos synced to codebase successfully!' };
      }
      return { success: false, message: 'Server returned error while syncing data.' };
    } catch (e) {
      return { success: false, message: String(e) };
    }
  };

  // Automatically flush changes to codebase so git commits capture user modifications
  useEffect(() => {
    const timer = setTimeout(() => {
      syncToCodebase().catch(() => {});
    }, 1500);
    return () => clearTimeout(timer);
  }, [cases, articles, settings, evidence, timelineEvents]);

  const resetToDefaults = () => {
    setCases(initialCases);
    setTimelineEvents(initialTimelineEvents);
    setEvidence(initialEvidence);
    setArticles(initialArticles);
    setSubmissions(initialSubmissions);
    setComments(initialComments);
    setSettings(initialSiteSettings);
  };

  return (
    <DataContext.Provider
      value={{
        cases,
        timelineEvents,
        networkNodes,
        networkEdges,
        evidence,
        articles,
        submissions,
        comments,
        settings,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        addCase,
        updateCase,
        deleteCase,
        addTimelineEvent,
        updateTimelineEvent,
        deleteTimelineEvent,
        addArticle,
        updateArticle,
        deleteArticle,
        addEvidence,
        updateEvidence,
        deleteEvidence,
        addSubmission,
        updateSubmissionStatus,
        deleteSubmission,
        addComment,
        approveComment,
        deleteComment,
        updateSettings,
        exportAllData,
        importAllData,
        resetToDefaults,
        syncToCodebase
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
