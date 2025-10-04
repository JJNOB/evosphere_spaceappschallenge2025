export type UserPersona = 'scientist' | 'manager' | 'mission_architect' | 'engineering';

export interface ResearchResult {
  persona: UserPersona;
  summary: string;
  keyFindings: string;
  uncertaintiesAndConflicts: string;
  technologyAndOperationalImplications: string;
  technologyLimitations: string;
  sourcesAndDataAccess: string;
  engineeringAndSystemsIntegration?: string; // Only for engineering persona
  sources: Array<ResearchSource>;
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
