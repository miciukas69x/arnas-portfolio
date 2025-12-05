import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { isAdminAuthenticated } from '@/lib/auth-helpers';
import { Project } from '@/data/projects';

// GET - Fetch all projects
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform database format to app format
    const projects: Project[] = data.map((row) => ({
      id: row.id,
      title: row.title,
      category: {
        lt: row.category_lt,
        en: row.category_en,
      },
      description: {
        lt: row.description_lt,
        en: row.description_en,
      },
      fullDescription: {
        lt: row.full_description_lt || '',
        en: row.full_description_en || '',
      },
      challenge: {
        lt: row.challenge_lt || '',
        en: row.challenge_en || '',
      },
      solution: {
        lt: row.solution_lt || '',
        en: row.solution_en || '',
      },
      timeline: {
        lt: row.timeline_lt || '',
        en: row.timeline_en || '',
      },
      client: row.client_name
        ? {
            name: row.client_name,
            testimonial: row.client_testimonial_lt || row.client_testimonial_en
              ? {
                  lt: row.client_testimonial_lt || '',
                  en: row.client_testimonial_en || '',
                }
              : undefined,
          }
        : undefined,
      stats: row.stats || [],
      process: row.process || [],
      deliverables: {
        lt: row.deliverables_lt || [],
        en: row.deliverables_en || [],
      },
      technologies: row.technologies_lt || row.technologies_en
        ? {
            lt: row.technologies_lt || [],
            en: row.technologies_en || [],
          }
        : undefined,
      gradient: row.gradient || '',
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project: Project = await request.json();

    // Use admin client (service_role) for write operations
    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert({
        id: project.id,
        title: project.title,
        category_lt: project.category.lt,
        category_en: project.category.en,
        description_lt: project.description.lt,
        description_en: project.description.en,
        full_description_lt: project.fullDescription.lt,
        full_description_en: project.fullDescription.en,
        challenge_lt: project.challenge.lt,
        challenge_en: project.challenge.en,
        solution_lt: project.solution.lt,
        solution_en: project.solution.en,
        timeline_lt: project.timeline.lt,
        timeline_en: project.timeline.en,
        client_name: project.client?.name,
        client_testimonial_lt: project.client?.testimonial?.lt,
        client_testimonial_en: project.client?.testimonial?.en,
        gradient: project.gradient,
        stats: project.stats,
        process: project.process,
        deliverables_lt: project.deliverables.lt,
        deliverables_en: project.deliverables.en,
        technologies_lt: project.technologies?.lt,
        technologies_en: project.technologies?.en,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

