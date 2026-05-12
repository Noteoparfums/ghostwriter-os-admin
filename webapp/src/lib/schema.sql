-- ============================================================
-- GHOSTWRITER OS: DOCUMENTS & PROJECTS SCHEMA (IDEMPOTENT)
-- ============================================================

-- 1. Create Documents table to store user writing
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Untitled Document',
  content TEXT DEFAULT '',
  chat_history JSONB DEFAULT '[]'::jsonb,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for Documents
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can view own documents" ON public.documents;
    DROP POLICY IF EXISTS "Users can insert own documents" ON public.documents;
    DROP POLICY IF EXISTS "Users can update own documents" ON public.documents;
    DROP POLICY IF EXISTS "Users can delete own documents" ON public.documents;
END $$;

CREATE POLICY "Users can view own documents" ON public.documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON public.documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own documents" ON public.documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON public.documents FOR DELETE USING (auth.uid() = user_id);

-- 4. Automatically update updated_at on change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_documents_updated_at ON public.documents;
CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON public.documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. AI Generation Logs table
CREATE TABLE IF NOT EXISTS public.generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT,
  output TEXT,
  processing_time_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.generation_logs ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Admin can view all logs" ON public.generation_logs;
    DROP POLICY IF EXISTS "Users can insert own logs" ON public.generation_logs;
END $$;

CREATE POLICY "Admin can view all logs" ON public.generation_logs FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Users can insert own logs" ON public.generation_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. App Settings (for Admin panel)
CREATE TABLE IF NOT EXISTS public.app_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  system_prompt TEXT,
  maintenance_mode BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Anyone can read settings" ON public.app_settings;
    DROP POLICY IF EXISTS "Admin can write settings" ON public.app_settings;
END $$;

CREATE POLICY "Anyone can read settings" ON public.app_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can write settings" ON public.app_settings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
