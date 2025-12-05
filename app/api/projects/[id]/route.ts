import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { isAdminAuthenticated } from '@/lib/auth-helpers';
import { Project } from '@/data/projects';

// PUT - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Check authentication
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle async params (Next.js 15)
    const resolvedParams = await Promise.resolve(params);
    const projectId = resolvedParams.id;

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const project: Project = await request.json();

    // Use admin client (service_role) for write operations
    const { data, error } = await supabaseAdmin
      .from('projects')
      .update({
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
        updated_at: new Date().toISOString(),
      })
      .eq('id', projectId)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Check authentication
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle async params (Next.js 15)
    const resolvedParams = await Promise.resolve(params);
    const projectId = resolvedParams.id;

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Use admin client (service_role) for write operations
    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

