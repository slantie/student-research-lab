/**
 * Supabase Data Service
 * Centralized data fetching for the public website.
 * Falls back to local static data if Supabase is unavailable.
 */
import { supabase } from './supabase';

// ─── RESEARCHERS ───────────────────────────────────────────

export async function fetchResearchers() {
    const { data, error } = await supabase
        .from('researchers')
        .select('*')
        .order('display_order', { ascending: true })
        .order('name', { ascending: true });

    if (error) {
        console.warn('Supabase fetchResearchers error:', error.message);
        return null;
    }
    return data;
}

export async function fetchResearcherStats() {
    const { data, error } = await supabase
        .from('researcher_stats')
        .select('*');

    if (error) {
        console.warn('Supabase fetchResearcherStats error:', error.message);
        return null;
    }
    return data;
}

// ─── ACTIVITIES ────────────────────────────────────────────

export async function fetchActivities() {
    const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('year', { ascending: false })
        .order('display_order', { ascending: true });

    if (error) {
        console.warn('Supabase fetchActivities error:', error.message);
        return null;
    }
    return data;
}

// ─── RESEARCH WORKS ────────────────────────────────────────

export async function fetchResearchWorks() {
    const { data, error } = await supabase
        .from('research_works')
        .select(`
      *,
      research_papers (
        id, title, description, display_order,
        research_work_members (
          id, role, display_order,
          researcher:researchers ( id, name, email, image_url, linkedin, department, semester, batch, institute )
        )
      ),
      research_work_members!research_work_members_research_work_id_fkey (
        id, role, display_order, research_paper_id,
        researcher:researchers ( id, name, email, image_url, linkedin, department, semester, batch, institute )
      )
    `)
        .order('display_order', { ascending: true });

    if (error) {
        console.warn('Supabase fetchResearchWorks error:', error.message);
        return null;
    }
    return data;
}

// ─── ATTENDANCE & SCORES (for Team/Leaderboard) ────────────

export async function fetchAttendanceStats() {
    // Get total sessions count
    const { count: totalSessions } = await supabase
        .from('attendance_sessions')
        .select('id', { count: 'exact', head: true });

    // Get per-researcher attendance
    const { data: records, error } = await supabase
        .from('attendance_records')
        .select('researcher_id, status');

    if (error) {
        console.warn('Supabase fetchAttendanceStats error:', error.message);
        return null;
    }

    // Aggregate: { researcher_id: { present, total } }
    const stats = {};
    (records || []).forEach((r) => {
        if (!stats[r.researcher_id]) {
            stats[r.researcher_id] = { present: 0, total: 0 };
        }
        stats[r.researcher_id].total += 1;
        if (r.status === 1) stats[r.researcher_id].present += 1;
    });

    return { stats, totalSessions: totalSessions || 0 };
}

export async function fetchScoreStats() {
    const { data, error } = await supabase
        .from('scores')
        .select('researcher_id, score');

    if (error) {
        console.warn('Supabase fetchScoreStats error:', error.message);
        return null;
    }

    // Aggregate: { researcher_id: totalScore }
    const scores = {};
    (data || []).forEach((s) => {
        scores[s.researcher_id] = (scores[s.researcher_id] || 0) + Number(s.score);
    });

    return scores;
}
