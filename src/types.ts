export type CaseStatus = 'Dismissed' | 'Dismissed w/o Prejudice' | 'Case Pending' | 'Judgement Satisfied' | 'Under Investigation';

export interface CaseStudy {
  id: string;
  caseNumber: string;
  title: string;
  court: string;
  cause: string;
  judge: string;
  attorney?: string;
  incarcerationDates?: string;
  incarcerationDuration?: string;
  disposition: string;
  status: CaseStatus;
  year: number;
  coverImage?: string;
  headlineQuote: string;
  executiveSummary: string;
  contextualOrigins: string;
  backgroundSummary: string;
  narrativeSummary: string;
  proceduralCollapse: string;
  proceduralBreach: string[];
  evidenceAndInfo: string[];
  constitutionalViolations: {
    amendment: string;
    violation: string;
    details?: string;
  }[];
  systemicVulnerabilities: {
    vector: string;
    manifestation: string;
  }[];
  interactionModel: string;
  proposedReforms: string[];
  systemicVariables: {
    arrestModality?: string;
    evidenceStatus?: string;
    restorationOrder?: string;
    clinicalNarrative?: string;
    competencyStatus?: string;
    dataContext?: string;
    primaryTechnology?: string;
    targetedPhenomena?: string;
    triggerMechanism?: string;
    tacticalDeployment?: string;
    retaliatoryTrigger?: string;
    landStatus?: string;
    operationalPretext?: string;
    [key: string]: string | undefined;
  };
  associatedDocs: {
    id: string;
    title: string;
    type: 'docket' | 'medical' | 'police_report' | 'filing' | 'media' | 'motion';
    date: string;
    fileSize?: string;
    summary: string;
  }[];
  tags: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  caseRef?: string;
  category: 'arrest' | 'medical' | 'court' | 'housing' | 'context' | 'milestone';
  summary: string;
  details: string;
  anomaly?: string;
  location?: string;
  evidenceRef?: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'case' | 'agency' | 'failure_mode' | 'reform';
  degree: number;
  betweenness?: number;
  closeness?: number;
  reach?: number;
  reachEfficiency?: number;
  description: string;
  categoryName: string;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: 'Involves entity' | 'Exposes systemic flaw' | 'Suffers procedural breakdown' | 'Sustains structural gap' | 'Remedied by' | 'Root cause mechanism';
  label?: string;
}

export interface EvidenceDocument {
  id: string;
  title: string;
  docNumber?: string;
  category: 'Court Dockets' | 'Medical & Lab' | 'Network Logs & Traceroutes' | 'Police & Dispatch' | 'Media & Interviews' | 'Property & Deeds' | 'Sworn Statements';
  date: string;
  entity: string;
  classification: 'Public Record' | 'Medical Record' | 'Forensic Log' | 'Sworn Affidavit' | 'FOIA Record';
  summary: string;
  content: string;
  sourceRef: string;
  verified: boolean;
  fileSize?: string;
  downloadUrl?: string;
  tags: string[];
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: string;
  category: 'Investigative Report' | 'Legal Audit' | 'Forensics' | 'Deep Dive' | 'Commentary';
  featuredImage: string;
  imageCaption: string;
  summary: string;
  content: string;
  videoUrl?: string;
  audioUrl?: string;
  mediaType?: 'video' | 'audio' | 'chart' | 'gallery';
  relatedCases: string[];
  tags: string[];
  isFeatured?: boolean;
}

export interface UserSubmission {
  id: string;
  title: string;
  submitterName: string;
  email?: string;
  isAnonymous: boolean;
  date: string;
  category: string;
  caseRef?: string;
  description: string;
  attachedFileName?: string;
  status: 'Pending' | 'Verified' | 'Archived';
  verificationNotes?: string;
  isPublic: boolean;
}

export interface PublicComment {
  id: string;
  targetType: 'article' | 'case' | 'timeline' | 'general';
  targetId: string;
  authorName: string;
  date: string;
  content: string;
  approved: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  announcement: string;
  contactEmail: string;
  authorName: string;
  authorOrg: string;
  authorEmail: string;
  majoratCorridorName: string;
}
