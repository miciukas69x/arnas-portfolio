import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { isAdminAuthenticated } from '@/lib/auth-helpers';
import { DownloadableResource } from '@/data/resources';

// PUT - Update a resource
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
    const resourceId = resolvedParams.id;

    if (!resourceId) {
      return NextResponse.json({ error: 'Resource ID is required' }, { status: 400 });
    }

    const resource: DownloadableResource = await request.json();

    // Use admin client (service_role) for write operations
    const { data, error } = await supabaseAdmin
      .from('resources')
      .update({
        title_lt: resource.title.lt,
        title_en: resource.title.en,
        description_lt: resource.description.lt,
        description_en: resource.description.en,
        file_url: resource.fileUrl,
        file_name: resource.fileName,
        file_size: resource.fileSize,
        file_type: resource.fileType,
        category_lt: resource.category.lt,
        category_en: resource.category.en,
        thumbnail: resource.thumbnail,
        download_count: resource.downloadCount || 0,
        tags: resource.tags || [],
        updated_at: new Date().toISOString(),
      })
      .eq('id', resourceId)
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

// DELETE - Delete a resource
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
    const resourceId = resolvedParams.id;

    if (!resourceId) {
      return NextResponse.json({ error: 'Resource ID is required' }, { status: 400 });
    }

    // Use admin client (service_role) for write operations
    const { error } = await supabaseAdmin
      .from('resources')
      .delete()
      .eq('id', resourceId);

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

