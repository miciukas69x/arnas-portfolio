import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { isAdminAuthenticated } from '@/lib/auth-helpers';
import { Service } from '@/data/services';

// PUT - Update a service
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
    const serviceId = resolvedParams.id;

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    const service: Service & { iconName?: string } = await request.json();

    // Use iconName if provided, otherwise default to Palette
    const iconName = service.iconName || 'Palette';

    // Use admin client (service_role) for write operations
    const { data, error } = await supabaseAdmin
      .from('services')
      .update({
        icon: iconName,
        title_key: service.titleKey,
        desc_key: service.descKey,
        overview_lt: service.overview.lt,
        overview_en: service.overview.en,
        pricing_lt: service.pricing?.lt,
        pricing_en: service.pricing?.en,
        gradient: service.gradient,
        features_lt: service.features.lt,
        features_en: service.features.en,
        benefits_lt: service.benefits.lt,
        benefits_en: service.benefits.en,
        process: service.process,
        deliverables_lt: service.deliverables.lt,
        deliverables_en: service.deliverables.en,
        updated_at: new Date().toISOString(),
      })
      .eq('id', serviceId)
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

// DELETE - Delete a service
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
    const serviceId = resolvedParams.id;

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    // Use admin client (service_role) for write operations
    const { error } = await supabaseAdmin
      .from('services')
      .delete()
      .eq('id', serviceId);

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

