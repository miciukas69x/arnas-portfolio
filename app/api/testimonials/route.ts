import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { isAdminAuthenticated } from '@/lib/auth-helpers';

// GET - Fetch all testimonials (public)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return NextResponse.json(
        { error: 'Failed to fetch testimonials' },
        { status: 500 }
      );
    }

    // Transform data to match frontend format
    const testimonials = data.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      text: {
        lt: item.text_lt,
        en: item.text_en,
      },
    }));

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error in GET /api/testimonials:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new testimonial (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, role, text } = body;

    if (!name || !role || !text || !text.lt || !text.en) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate ID
    const id = `testimonial-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .insert({
        id,
        name,
        role,
        text_lt: text.lt,
        text_en: text.en,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating testimonial:', error);
      return NextResponse.json(
        { error: 'Failed to create testimonial' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      name: data.name,
      role: data.role,
      text: {
        lt: data.text_lt,
        en: data.text_en,
      },
    });
  } catch (error) {
    console.error('Error in POST /api/testimonials:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

