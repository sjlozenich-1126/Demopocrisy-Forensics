import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
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
import {
  isCloudConfigured,
  loadSitePayload,
  saveSitePayload,
  SitePayload
} from '../lib/supabase';

type SyncStatus = 'idle' | 'loading' | 'saving' | 'synced' | 'error' | 'local-only';

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
  // Cloud sync
  syncStatus: SyncStatus;
  cloudEnabled: boolean;
  lastSyncedAt: string | null;
  publishToCloud: () => Promise<boolean>;
  refreshFromCloud: () => Promise<boolean>;
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

function readLocal<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<CaseStudy[]>(() => readLocal(STORAGE_KEYS.CASES, initialCases));
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(() =>
    readLocal(STORAGE_KEYS.TIMELINE, initialTimelineEvents)
  );
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>(() =>
    readLocal(STORAGE_KEYS.NODES, initialNetworkNodes)
  );
  const [networkEdges, setNetworkEdges] = useState<NetworkEdge[]>(() =>
    readLocal(STORAGE_KEYS.EDGES, initialNetworkEdges)
  );
  const [evidence, setEvidence] = useState<EvidenceDocument[]>(() =>
    readLocal(STORAGE_KEYS.EVIDENCE, initialEvidence)
  );
  const [articles, setArticles] = useState<Article[]>(() =>
    readLocal(STORAGE_KEYS.ARTICLES, initialArticles)
  );
  const [submissions, setSubmissions] = useState<UserSubmission[]>(() =>
    readLocal(STORAGE_KEYS.SUBMISSIONS, initialSubmissions)
  );
  const [comments, setComments] = useState<PublicComment[]>(() =>
    readLocal(STORAGE_KEYS.COMMENTS, initialComments)
  );
  const [settings, setSettings] = useState<SiteSettings>(() =>
    readLocal(STORAGE_KEYS.SETTINGS, initialSiteSettings)
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(() => localStorage.getItem(STORAGE_KEYS.AUTH) === 'true');

  const [syncStatus, setSyncStatus] = useState<SyncStatus>(
    isCloudConfigured ? 'loading' : 'local-only'
  );
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  // Skip auto-save until initial cloud load finishes
  const hydratedRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildPayload = useCallback((): SitePayload => {
    return {
      version: '1.0',
      updatedAt: new Date().toISOString(),
      cases,
      timelineEvents,
      networkNodes,
      networkEdges,
      evidence,
      articles,
      submissions,
      comments,
      settings
    };
  }, [
    cases,
    timelineEvents,
    networkNodes,
    networkEdges,
    evidence,
    articles,
    submissions,
    comments,
    settings
  ]);

  const applyPayload = useCallback((payload: SitePayload) => {
    if (payload.cases) setCases(payload.cases as CaseStudy[]);
    if (payload.timelineEvents) setTimelineEvents(payload.timelineEvents as TimelineEvent[]);
    if (payload.networkNodes) setNetworkNodes(payload.networkNodes as NetworkNode[]);
    if (payload.networkEdges) setNetworkEdges(payload.networkEdges as NetworkEdge[]);
    if (payload.evidence) setEvidence(payload.evidence as EvidenceDocument[]);
    if (payload.articles) setArticles(payload.articles as Article[]);
    if (payload.submissions) setSubmissions(payload.submissions as UserSubmission[]);
    if (payload.comments) setComments(payload.comments as PublicComment[]);
    if (payload.settings) setSettings(payload.settings as SiteSettings);
    if (payload.updatedAt) setLastSyncedAt(payload.updatedAt);
  }, []);

  // Initial load from cloud
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (!isCloudConfigured) {
        hydratedRef.current = true;
        setSyncStatus('local-only');
        return;
      }

      setSyncStatus('loading');
      const remote = await loadSitePayload();
      if (cancelled) return;

      if (remote) {
        applyPayload(remote);
        setSyncStatus('synced');
        setLastSyncedAt(remote.updatedAt || new Date().toISOString());
      } else {
        // No remote row yet — seed with current local data on next publish
        setSyncStatus('idle');
      }
      hydratedRef.current = true;
    }

    hydrate();
    return () => {
      cancelled = true;
    };
  }, [applyPayload]);

  // Persist to localStorage always (fast offline cache)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  }, [cases]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(timelineEvents));
  }, [timelineEvents]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(networkNodes));
  }, [networkNodes]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EDGES, JSON.stringify(networkEdges));
  }, [networkEdges]);
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

  // Debounced auto-publish to cloud after data changes
  useEffect(() => {
    if (!isCloudConfigured || !hydratedRef.current) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      setSyncStatus('saving');
      const result = await saveSitePayload(buildPayload());
      if (result.ok) {
        setSyncStatus('synced');
        setLastSyncedAt(new Date().toISOString());
      } else {
        setSyncStatus('error');
      }
    }, 1200);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [
    cases,
    timelineEvents,
    networkNodes,
    networkEdges,
    evidence,
    articles,
    submissions,
    comments,
    settings,
    buildPayload
  ]);

  const publishToCloud = async () => {
    if (!isCloudConfigured) return false;
    setSyncStatus('saving');
    const result = await saveSitePayload(buildPayload());
    if (result.ok) {
      setSyncStatus('synced');
      setLastSyncedAt(new Date().toISOString());
      return true;
    }
    setSyncStatus('error');
    return false;
  };

  const refreshFromCloud = async () => {
    if (!isCloudConfigured) return false;
    setSyncStatus('loading');
    const remote = await loadSitePayload();
    if (remote) {
      applyPayload(remote);
      setSyncStatus('synced');
      return true;
    }
    setSyncStatus('error');
    return false;
  };

  const loginAdmin = (pass: string) => {
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
  const addCase = (newCase: CaseStudy) => setCases((prev) => [newCase, ...prev]);
  const updateCase = (id: string, updated: Partial<CaseStudy>) =>
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  const deleteCase = (id: string) => setCases((prev) => prev.filter((c) => c.id !== id));

  // Timeline Methods
  const addTimelineEvent = (event: TimelineEvent) => setTimelineEvents((prev) => [...prev, event]);
  const updateTimelineEvent = (id: string, updated: Partial<TimelineEvent>) =>
    setTimelineEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  const deleteTimelineEvent = (id: string) =>
    setTimelineEvents((prev) => prev.filter((e) => e.id !== id));

  // Article Methods
  const addArticle = (article: Article) => setArticles((prev) => [article, ...prev]);
  const updateArticle = (id: string, updated: Partial<Article>) =>
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
  const deleteArticle = (id: string) => setArticles((prev) => prev.filter((a) => a.id !== id));

  // Evidence Methods
  const addEvidence = (doc: EvidenceDocument) => setEvidence((prev) => [doc, ...prev]);
  const updateEvidence = (id: string, updated: Partial<EvidenceDocument>) =>
    setEvidence((prev) => prev.map((doc) => (doc.id === id ? { ...doc, ...updated } : doc)));
  const deleteEvidence = (id: string) => setEvidence((prev) => prev.filter((doc) => doc.id !== id));

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
  const deleteSubmission = (id: string) => setSubmissions((prev) => prev.filter((s) => s.id !== id));

  // Comment Methods
  const addComment = (commentData: Omit<PublicComment, 'id' | 'date' | 'approved'>) => {
    const newComment: PublicComment = {
      ...commentData,
      id: `com-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      approved: true
    };
    setComments((prev) => [newComment, ...prev]);
  };
  const approveComment = (id: string) =>
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, approved: true } : c)));
  const deleteComment = (id: string) => setComments((prev) => prev.filter((c) => c.id !== id));

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Export / Import
  const exportAllData = () => JSON.stringify(buildPayload(), null, 2);

  const importAllData = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      applyPayload({
        version: parsed.version || '1.0',
        updatedAt: parsed.updatedAt || parsed.exportedAt || new Date().toISOString(),
        cases: parsed.cases,
        timelineEvents: parsed.timelineEvents,
        networkNodes: parsed.networkNodes,
        networkEdges: parsed.networkEdges,
        evidence: parsed.evidence,
        articles: parsed.articles,
        submissions: parsed.submissions,
        comments: parsed.comments,
        settings: parsed.settings
      });
      return true;
    } catch {
      return false;
    }
  };

  const resetToDefaults = () => {
    setCases(initialCases);
    setTimelineEvents(initialTimelineEvents);
    setNetworkNodes(initialNetworkNodes);
    setNetworkEdges(initialNetworkEdges);
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
        syncStatus,
        cloudEnabled: isCloudConfigured,
        lastSyncedAt,
        publishToCloud,
        refreshFromCloud
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
