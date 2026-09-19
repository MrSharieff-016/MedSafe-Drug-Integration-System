import { supabase } from '@/lib/supabase';
import type { Finding, Risk } from '@/lib/types';

export function severityToRisk(severity: string | null): Risk {
  if (severity === 'Major') return 'High';
  if (severity === 'Moderate') return 'Moderate';
  if (severity === 'Minor') return 'Low';
  return 'None';
}

export function riskTone(risk: Risk | string): string {
  if (risk === 'High' || risk === 'Major') return 'risk-high';
  if (risk === 'Moderate') return 'risk-moderate';
  if (risk === 'Low' || risk === 'Minor') return 'risk-low';
  return 'risk-none';
}

export function overallRisk(findings: Finding[]): Risk {
  if (findings.some((f) => f.risk === 'High')) return 'High';
  if (findings.some((f) => f.risk === 'Moderate')) return 'Moderate';
  if (findings.length) return 'Low';
  return 'None';
}

type ComboRow = {
  drug_a: string;
  drug_b: string;
  severity: string | null;
  interaction: string | null;
  mechanism: string | null;
  possible_effect: string | null;
  project_action: string | null;
};

export async function checkInteractions(
  medications: string[]
): Promise<Finding[]> {
  if (medications.length < 2) return [];

  // Create all unique medication pairs.
  const pairs: [string, string][] = [];

  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      pairs.push([medications[i], medications[j]]);
    }
  }

  // Load the interaction reference data.
  // We intentionally avoid .or() and has_interaction filtering here.
  const { data, error } = await supabase
    .from('drug_combinations')
    .select(
      'drug_a, drug_b, severity, interaction, mechanism, possible_effect, project_action'
    );

  if (error) {
    console.error('Interaction database error:', error);
    throw new Error(error.message);
  }

  if (!data) return [];

  const findings: Finding[] = [];
  const seen = new Set<string>();

  // Match selected medication pairs against the reference dataset.
  for (const [medA, medB] of pairs) {
    const row = (data as ComboRow[]).find(
      (item) =>
        (item.drug_a.toLowerCase() === medA.toLowerCase() &&
          item.drug_b.toLowerCase() === medB.toLowerCase()) ||
        (item.drug_a.toLowerCase() === medB.toLowerCase() &&
          item.drug_b.toLowerCase() === medA.toLowerCase())
    );

    if (!row) continue;

    const key = [row.drug_a, row.drug_b]
      .sort()
      .join(' + ');

    if (seen.has(key)) continue;

    seen.add(key);

    const risk = severityToRisk(row.severity);

    findings.push({
      pair: key,
      risk,
      title: row.interaction ?? 'Interaction detected',
      detail: row.interaction ?? '',
      mechanism: row.mechanism ?? '',
      possibleEffect: row.possible_effect ?? '',
      advice:
        row.project_action ??
        'Consult a healthcare professional.',
    });
  }

  // Highest risk first.
  findings.sort((a, b) => {
    const order: Record<Risk, number> = {
      High: 0,
      Moderate: 1,
      Low: 2,
      None: 3,
    };

    return order[a.risk] - order[b.risk];
  });

  return findings;
}