import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { isAdminAuthenticated } from '@/lib/auth-helpers';
import { DownloadableResource } from '@/data/resources';

// GET - Fetch all resources
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform database format to app format
    const resources: DownloadableResource[] = data.map((row) => ({
      id: row.id,
      title: {
        lt: row.title_lt,
        en: row.title_en,
      },
      description: {
        lt: row.description_lt || '',
        en: row.description_en || '',
      },
      fileUrl: row.file_url,
      fileName: row.file_name,
      fileSize: row.file_size || '0 MB',
      fileType: row.file_type || 'PDF',
      category: {
        lt: row.category_lt || '',
        en: row.category_en || '',
      },
      thumbnail: row.thumbnail,
      downloadCount: row.download_count || 0,
      tags: row.tags || [],
      createdAt: row.created_at,
    }));

    return NextResponse.json(resources);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new resource
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resource: DownloadableResource = await request.json();

    // Use admin client (service_role) for write operations
    const { data, error } = await supabaseAdmin
      .from('resources')
      .insert({
        id: resource.id,
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

