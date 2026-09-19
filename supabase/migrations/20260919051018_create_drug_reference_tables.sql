/*
# Create medication reference, interaction rules, and combination matrix tables

1. New Tables
- `medications` — the canonical medication/substance list (58 entries from the Project SAFE dataset).
  - `id` (int, primary key, serial)
  - `name` (text, unique, not null)
  - `category` (text, optional grouping label)
  - `created_at` (timestamptz)

- `interaction_rules` — the 51 known drug-drug interaction pairs from the dataset.
  - `id` (int, primary key, serial)
  - `drug_a` (text, not null)
  - `drug_b` (text, not null)
  - `severity` (text: Major / Moderate / Minor)
  - `interaction` (text, description)
  - `mechanism` (text)
  - `possible_effect` (text)
  - `project_action` (text)
  - `created_at` (timestamptz)

- `drug_combinations` — the ~10,000-row pairwise combination matrix.
  Each row represents a unique unordered pair of medications from an expanded
  catalog (~142 entries), with a linked interaction rule when one exists.
  - `id` (int, primary key, serial)
  - `drug_a` (text, not null)
  - `drug_b` (text, not null)
  - `severity` (text, nullable — null means no known interaction)
  - `interaction` (text, nullable)
  - `mechanism` (text, nullable)
  - `possible_effect` (text, nullable)
  - `project_action` (text, nullable)
  - `has_interaction` (boolean, default false)
  - `created_at` (timestamptz)

2. Security
- RLS enabled on all three tables.
- These are shared reference data (read-only for everyone, no user-owned rows),
  so SELECT is open to anon + authenticated. INSERT/UPDATE/DELETE are restricted
  to authenticated users.

3. Important Notes
- The combination matrix is populated by a data-load migration after creation.
- `has_interaction` lets the frontend quickly count known vs unknown pairs.
*/

CREATE TABLE IF NOT EXISTS public.medications (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text UNIQUE NOT NULL,
  category text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_medications" ON public.medications;
CREATE POLICY "read_medications" ON public.medications FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "write_medications" ON public.medications;
CREATE POLICY "write_medications" ON public.medications FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_medications" ON public.medications;
CREATE POLICY "update_medications" ON public.medications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_medications" ON public.medications;
CREATE POLICY "delete_medications" ON public.medications FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS public.interaction_rules (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  drug_a text NOT NULL,
  drug_b text NOT NULL,
  severity text NOT NULL,
  interaction text NOT NULL,
  mechanism text,
  possible_effect text,
  project_action text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.interaction_rules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_interaction_rules" ON public.interaction_rules;
CREATE POLICY "read_interaction_rules" ON public.interaction_rules FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "write_interaction_rules" ON public.interaction_rules;
CREATE POLICY "write_interaction_rules" ON public.interaction_rules FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_interaction_rules" ON public.interaction_rules;
CREATE POLICY "update_interaction_rules" ON public.interaction_rules FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_interaction_rules" ON public.interaction_rules;
CREATE POLICY "delete_interaction_rules" ON public.interaction_rules FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS public.drug_combinations (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  drug_a text NOT NULL,
  drug_b text NOT NULL,
  severity text,
  interaction text,
  mechanism text,
  possible_effect text,
  project_action text,
  has_interaction boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.drug_combinations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_drug_combinations" ON public.drug_combinations;
CREATE POLICY "read_drug_combinations" ON public.drug_combinations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "write_drug_combinations" ON public.drug_combinations;
CREATE POLICY "write_drug_combinations" ON public.drug_combinations FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_drug_combinations" ON public.drug_combinations;
CREATE POLICY "update_drug_combinations" ON public.drug_combinations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_drug_combinations" ON public.drug_combinations;
CREATE POLICY "delete_drug_combinations" ON public.drug_combinations FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS drug_combinations_drugs_idx
  ON public.drug_combinations (drug_a, drug_b);
CREATE INDEX IF NOT EXISTS drug_combinations_has_interaction_idx
  ON public.drug_combinations (has_interaction);
CREATE INDEX IF NOT EXISTS interaction_rules_drugs_idx
  ON public.interaction_rules (drug_a, drug_b);
