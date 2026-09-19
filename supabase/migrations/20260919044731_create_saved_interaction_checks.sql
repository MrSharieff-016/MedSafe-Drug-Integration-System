/*
# Create saved interaction checks

1. New Tables
- `saved_interaction_checks` stores each signed-in user's medication review history.
- `id` (uuid, primary key) uniquely identifies a saved review.
- `user_id` (uuid) links the review to the signed-in Supabase account.
- `medications` (jsonb) stores the medication names entered for the review.
- `interactions` (jsonb) stores the detected interaction results shown to the user.
- `risk_level` (text) stores the overall result label.
- `created_at` (timestamptz) records when the review was saved.

2. Security
- Row Level Security is enabled.
- Four separate authenticated-user policies allow each user to select, insert, update, and delete only their own reviews.

3. Important Notes
- The owner is filled from the authenticated session by default.
- No medication data is readable by anonymous visitors.
*/

CREATE TABLE IF NOT EXISTS public.saved_interaction_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  medications jsonb NOT NULL DEFAULT '[]'::jsonb,
  interactions jsonb NOT NULL DEFAULT '[]'::jsonb,
  risk_level text NOT NULL DEFAULT 'No known conflicts',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_interaction_checks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own interaction checks" ON public.saved_interaction_checks;
CREATE POLICY "Users can view own interaction checks"
  ON public.saved_interaction_checks FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can save own interaction checks" ON public.saved_interaction_checks;
CREATE POLICY "Users can save own interaction checks"
  ON public.saved_interaction_checks FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own interaction checks" ON public.saved_interaction_checks;
CREATE POLICY "Users can update own interaction checks"
  ON public.saved_interaction_checks FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own interaction checks" ON public.saved_interaction_checks;
CREATE POLICY "Users can delete own interaction checks"
  ON public.saved_interaction_checks FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS saved_interaction_checks_user_created_idx
  ON public.saved_interaction_checks (user_id, created_at DESC);
