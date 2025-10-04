export type UserPersona = 'scientist' | 'manager' | 'mission_architect' | 'engineering';

export interface ResearchResult {
  persona: UserPersona;
  summary: string; // Always required
  keyFindings?: string; // Optional - only if relevant to query
  uncertaintiesAndConflicts?: string; // Optional - only if relevant to query
  technologyAndOperationalImplications?: string; // Optional - only if relevant to query
  technologyLimitations?: string; // Optional - only if relevant to query
  sourcesAndDataAccess: string; // Always required
  engineeringAndSystemsIntegration?: string; // Optional - only for engineering persona
  sources: Array<ResearchSource>; // Always required
}

export interface ResearchSource {
  title: string;
  url: string;
  authors: string;
  year: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ResearchCategory {
  name: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}
