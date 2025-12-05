/**
 * Migration Script: Import existing data from static files to Supabase
 * 
 * This script reads data from /data/*.ts files and imports them into Supabase.
 * 
 * Usage:
 * 1. Make sure your .env or .env.local has SUPABASE_SERVICE_ROLE_KEY set
 * 2. Run: npx tsx scripts/migrate-to-supabase.ts
 * 
 * Note: This will skip items that already exist (by ID) to avoid duplicates.
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import { resources } from '../data/resources';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import { Palette, Facebook, Search, MessageCircle, Lightbulb } from 'lucide-react';

// Load environment variables from .env.local or .env
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase environment variables!');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env or .env.local');
  console.error('\nCurrent values:');
  console.error(`  NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✓ Set' : '✗ Missing'}`);
  console.error(`  SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceRoleKey ? '✓ Set' : '✗ Missing'}`);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Icon name mapping
const iconNameMap: Record<string, string> = {
  'Palette': 'Palette',
  'Facebook': 'Facebook',
  'Search': 'Search',
  'MessageCircle': 'MessageCircle',
  'Lightbulb': 'Lightbulb',
};

function getIconName(icon: any): string {
  // Try to get name from icon component
  if (icon?.name) return icon.name;
  if (typeof icon === 'string') return icon;
  
  // Check if it's one of our known icons
  for (const [name, component] of Object.entries({ Palette, Facebook, Search, MessageCircle, Lightbulb })) {
    if (icon === component) return name;
  }
  
  return 'Palette'; // Default
}

async function migrateResources() {
  console.log('\n📦 Migrating Resources...');
  let imported = 0;
  let skipped = 0;

  for (const resource of resources) {
    try {
      // Check if already exists
      const { data: existing } = await supabase
        .from('resources')
        .select('id')
        .eq('id', resource.id)
        .single();

      if (existing) {
        console.log(`  ⏭️  Skipped ${resource.id} (already exists)`);
        skipped++;
        continue;
      }

      // Insert new resource
      const { error } = await supabase
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
        });

      if (error) {
        console.error(`  ❌ Error importing ${resource.id}:`, error.message);
      } else {
        console.log(`  ✅ Imported ${resource.id}`);
        imported++;
      }
    } catch (error) {
      console.error(`  ❌ Error importing ${resource.id}:`, error);
    }
  }

  console.log(`\n  Summary: ${imported} imported, ${skipped} skipped`);
  return { imported, skipped };
}

async function migrateProjects() {
  console.log('\n📁 Migrating Projects...');
  let imported = 0;
  let skipped = 0;

  for (const project of projects) {
    try {
      // Check if already exists
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('id', project.id)
        .single();

      if (existing) {
        console.log(`  ⏭️  Skipped ${project.id} (already exists)`);
        skipped++;
        continue;
      }

      // Insert new project
      const { error } = await supabase
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
        });

      if (error) {
        console.error(`  ❌ Error importing ${project.id}:`, error.message);
      } else {
        console.log(`  ✅ Imported ${project.id}`);
        imported++;
      }
    } catch (error) {
      console.error(`  ❌ Error importing ${project.id}:`, error);
    }
  }

  console.log(`\n  Summary: ${imported} imported, ${skipped} skipped`);
  return { imported, skipped };
}

async function migrateServices() {
  console.log('\n🔧 Migrating Services...');
  let imported = 0;
  let skipped = 0;

  for (const service of services) {
    try {
      // Check if already exists
      const { data: existing } = await supabase
        .from('services')
        .select('id')
        .eq('id', service.id)
        .single();

      if (existing) {
        console.log(`  ⏭️  Skipped ${service.id} (already exists)`);
        skipped++;
        continue;
      }

      const iconName = getIconName(service.icon);

      // Insert new service
      const { error } = await supabase
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
        });

      if (error) {
        console.error(`  ❌ Error importing ${service.id}:`, error.message);
      } else {
        console.log(`  ✅ Imported ${service.id}`);
        imported++;
      }
    } catch (error) {
      console.error(`  ❌ Error importing ${service.id}:`, error);
    }
  }

  console.log(`\n  Summary: ${imported} imported, ${skipped} skipped`);
  return { imported, skipped };
}

async function migrateTestimonials() {
  console.log('\n💬 Migrating Testimonials...');
  let imported = 0;
  let skipped = 0;

  for (const testimonial of testimonials) {
    try {
      // Check if already exists
      const { data: existing } = await supabase
        .from('testimonials')
        .select('id')
        .eq('id', testimonial.id)
        .single();

      if (existing) {
        console.log(`  ⏭️  Skipped ${testimonial.id} (already exists)`);
        skipped++;
        continue;
      }

      // Insert new testimonial
      const { error } = await supabase
        .from('testimonials')
        .insert({
          id: testimonial.id,
          name: testimonial.name,
          role: testimonial.role,
          text_lt: testimonial.text.lt,
          text_en: testimonial.text.en,
        });

      if (error) {
        console.error(`  ❌ Error importing ${testimonial.id}:`, error.message);
      } else {
        console.log(`  ✅ Imported ${testimonial.id}`);
        imported++;
      }
    } catch (error) {
      console.error(`  ❌ Error importing ${testimonial.id}:`, error);
    }
  }

  console.log(`\n  Summary: ${imported} imported, ${skipped} skipped`);
  return { imported, skipped };
}

async function main() {
  console.log('🚀 Starting migration to Supabase...\n');
  console.log(`📡 Connecting to: ${supabaseUrl}\n`);

  try {
    const resourcesResult = await migrateResources();
    const projectsResult = await migrateProjects();
    const servicesResult = await migrateServices();
    const testimonialsResult = await migrateTestimonials();

    console.log('\n✨ Migration Complete!');
    console.log('\n📊 Summary:');
    console.log(`  Resources: ${resourcesResult.imported} imported, ${resourcesResult.skipped} skipped`);
    console.log(`  Projects: ${projectsResult.imported} imported, ${projectsResult.skipped} skipped`);
    console.log(`  Services: ${servicesResult.imported} imported, ${servicesResult.skipped} skipped`);
    console.log(`  Testimonials: ${testimonialsResult.imported} imported, ${testimonialsResult.skipped} skipped`);
    console.log(`\n  Total: ${resourcesResult.imported + projectsResult.imported + servicesResult.imported + testimonialsResult.imported} items imported`);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();

