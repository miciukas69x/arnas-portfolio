import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { isAdminAuthenticated } from '@/lib/auth-helpers';
import { Service } from '@/data/services';
import { Palette, Facebook, Search, MessageCircle, Lightbulb, LucideIcon } from 'lucide-react';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Palette,
  Facebook,
  Search,
  MessageCircle,
  Lightbulb,
};

// GET - Fetch all services
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform database format to app format
    // Note: icon is kept as string (iconName) since React components can't be serialized in JSON
    const services = data.map((row) => ({
      id: row.id,
      iconName: row.icon, // Keep as string for JSON serialization
      titleKey: row.title_key,
      descKey: row.desc_key,
      overview: {
        lt: row.overview_lt || '',
        en: row.overview_en || '',
      },
      pricing: row.pricing_lt || row.pricing_en
        ? {
            lt: row.pricing_lt || '',
            en: row.pricing_en || '',
          }
        : undefined,
      gradient: row.gradient || '',
      features: {
        lt: row.features_lt || [],
        en: row.features_en || [],
      },
      benefits: {
        lt: row.benefits_lt || [],
        en: row.benefits_en || [],
      },
      process: row.process || [],
      deliverables: {
        lt: row.deliverables_lt || [],
        en: row.deliverables_en || [],
      },
    })) as any[]; // Type assertion since we're adding iconName instead of icon

    return NextResponse.json(services);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new service
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const service: Service & { iconName?: string } = await request.json();

    // Use iconName if provided, otherwise default to Palette
    const iconName = service.iconName || 'Palette';

    // Use admin client (service_role) for write operations
    const { data, error } = await supabaseAdmin
      .from('services')
      .insert({
        id: service.id,
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

