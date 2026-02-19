-- ============================================================
-- SRL Website Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- 1. RESEARCHERS TABLE
-- Stores faculty, students, and research assistants
CREATE TABLE IF NOT EXISTS researchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  image_url TEXT,
  linkedin TEXT,
  department TEXT,
  semester TEXT,          -- "Faculty", "1st", "4th", "6th", "8th"
  batch TEXT,             -- e.g., "2023-2027"
  institute TEXT,
  role_type TEXT NOT NULL DEFAULT 'student' CHECK (role_type IN ('faculty', 'student', 'research_assistant')),
  specialization TEXT,    -- for faculty
  research_areas TEXT,    -- for faculty
  role_title TEXT,        -- e.g., "Head of MMPSRPC", "Assistant Professor"
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. RESEARCH WORKS TABLE
-- Parent table for research projects (may contain multiple papers)
CREATE TABLE IF NOT EXISTS research_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'Ongoing' CHECK (status IN ('Completed', 'Ongoing', 'Upcoming')),
  short_description TEXT,
  description TEXT,
  guided_by TEXT,
  guide_role TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. RESEARCH PAPERS TABLE
-- Individual papers within a multi-paper research work
CREATE TABLE IF NOT EXISTS research_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  research_work_id UUID NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. RESEARCH WORK MEMBERS TABLE
-- Links researchers to works or papers with roles
CREATE TABLE IF NOT EXISTS research_work_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  research_work_id UUID NOT NULL REFERENCES research_works(id) ON DELETE CASCADE,
  research_paper_id UUID REFERENCES research_papers(id) ON DELETE CASCADE,
  researcher_id UUID NOT NULL REFERENCES researchers(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'Member' CHECK (role IN ('Mentor', 'Presenter', 'Member')),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. ACTIVITIES TABLE
-- Events, sessions, hackathons, etc.
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  year INT,
  link TEXT,              -- LinkedIn post link etc.
  brief TEXT,
  date_label TEXT,        -- Human readable date like "4 February 2026"
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. ATTENDANCE SESSIONS TABLE
-- Each date/session when attendance was taken
CREATE TABLE IF NOT EXISTS attendance_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_date DATE NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_date)
);

-- 7. ATTENDANCE RECORDS TABLE
-- Per-student per-session attendance (0 = Absent, 1 = Present)
CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  researcher_id UUID NOT NULL REFERENCES researchers(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES attendance_sessions(id) ON DELETE CASCADE,
  status INT NOT NULL DEFAULT 0 CHECK (status IN (0, 1)),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(researcher_id, session_id)
);

-- 8. SCORES TABLE
-- Per-student scores (can be per-session or standalone)
CREATE TABLE IF NOT EXISTS scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  researcher_id UUID NOT NULL REFERENCES researchers(id) ON DELETE CASCADE,
  session_id UUID REFERENCES attendance_sessions(id) ON DELETE SET NULL,
  score DECIMAL(5,2) NOT NULL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_attendance_records_researcher ON attendance_records(researcher_id);
CREATE INDEX IF NOT EXISTS idx_attendance_records_session ON attendance_records(session_id);
CREATE INDEX IF NOT EXISTS idx_scores_researcher ON scores(researcher_id);
CREATE INDEX IF NOT EXISTS idx_scores_session ON scores(session_id);
CREATE INDEX IF NOT EXISTS idx_research_papers_work ON research_papers(research_work_id);
CREATE INDEX IF NOT EXISTS idx_research_work_members_work ON research_work_members(research_work_id);
CREATE INDEX IF NOT EXISTS idx_research_work_members_paper ON research_work_members(research_paper_id);
CREATE INDEX IF NOT EXISTS idx_research_work_members_researcher ON research_work_members(researcher_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Enable RLS on all tables, allow public read, restrict writes
-- ============================================================

-- Enable RLS
ALTER TABLE researchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_work_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view the website data)
CREATE POLICY "Public read researchers" ON researchers FOR SELECT USING (true);
CREATE POLICY "Public read research_works" ON research_works FOR SELECT USING (true);
CREATE POLICY "Public read research_papers" ON research_papers FOR SELECT USING (true);
CREATE POLICY "Public read research_work_members" ON research_work_members FOR SELECT USING (true);
CREATE POLICY "Public read activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Public read attendance_sessions" ON attendance_sessions FOR SELECT USING (true);
CREATE POLICY "Public read attendance_records" ON attendance_records FOR SELECT USING (true);
CREATE POLICY "Public read scores" ON scores FOR SELECT USING (true);

-- Authenticated users (admins) can do everything
CREATE POLICY "Admin insert researchers" ON researchers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update researchers" ON researchers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete researchers" ON researchers FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert research_works" ON research_works FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update research_works" ON research_works FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete research_works" ON research_works FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert research_papers" ON research_papers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update research_papers" ON research_papers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete research_papers" ON research_papers FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert research_work_members" ON research_work_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update research_work_members" ON research_work_members FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete research_work_members" ON research_work_members FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert activities" ON activities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update activities" ON activities FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete activities" ON activities FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert attendance_sessions" ON attendance_sessions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update attendance_sessions" ON attendance_sessions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete attendance_sessions" ON attendance_sessions FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert attendance_records" ON attendance_records FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update attendance_records" ON attendance_records FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete attendance_records" ON attendance_records FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert scores" ON scores FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update scores" ON scores FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete scores" ON scores FOR DELETE TO authenticated USING (true);

-- ============================================================
-- VIEWS for computed data
-- ============================================================

-- View: Researcher stats (attendance %, total score)
CREATE OR REPLACE VIEW researcher_stats AS
SELECT 
  r.id,
  r.name,
  r.role_type,
  COUNT(ar.id) AS total_sessions,
  COALESCE(SUM(ar.status), 0) AS present_count,
  CASE 
    WHEN COUNT(ar.id) > 0 
    THEN ROUND((COALESCE(SUM(ar.status), 0)::decimal / COUNT(ar.id)) * 100, 2)
    ELSE 0 
  END AS attendance_percentage,
  COALESCE((SELECT SUM(s.score) FROM scores s WHERE s.researcher_id = r.id), 0) AS total_score
FROM researchers r
LEFT JOIN attendance_records ar ON r.id = ar.researcher_id
GROUP BY r.id, r.name, r.role_type;

-- ============================================================
-- FUNCTION: Auto-update updated_at timestamp
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_researchers
  BEFORE UPDATE ON researchers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_research_works
  BEFORE UPDATE ON research_works
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_activities
  BEFORE UPDATE ON activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
