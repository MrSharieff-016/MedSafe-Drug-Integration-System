export type Severity = 'Major' | 'Moderate' | 'Minor';
export type Risk = 'High' | 'Moderate' | 'Low' | 'None';

export interface DrugInteraction {
  drugA: string;
  drugB: string;
  severity: Severity;
  interaction: string;
  mechanism: string;
  possibleEffect: string;
  projectAction: string;
}

export interface Finding {
  pair: string;
  risk: Risk;
  title: string;
  detail: string;
  mechanism: string;
  possibleEffect: string;
  advice: string;
}

export interface SavedCheck {
  id: string;
  medications: string[];
  interactions: Finding[];
  risk_level: string;
  created_at: string;
}

export interface Medication {
  id: number;
  name: string;
  category: string | null;
}
