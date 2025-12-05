-- Supabase Database Schema for Portfolio CMS
-- Run this SQL in your Supabase SQL Editor

-- Resources Table
CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  title_lt TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_lt TEXT,
  description_en TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size TEXT,
  file_type TEXT,
  category_lt TEXT,
  category_en TEXT,
  thumbnail TEXT,
  download_count INTEGER DEFAULT 0,
  tags TEXT[], -- Array of tags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category_lt TEXT NOT NULL,
  category_en TEXT NOT NULL,
  description_lt TEXT NOT NULL,
  description_en TEXT NOT NULL,
  full_description_lt TEXT,
  full_description_en TEXT,
  challenge_lt TEXT,
  challenge_en TEXT,
  solution_lt TEXT,
  solution_en TEXT,
  timeline_lt TEXT,
  timeline_en TEXT,
  client_name TEXT,
  client_testimonial_lt TEXT,
  client_testimonial_en TEXT,
  gradient TEXT,
  stats JSONB, -- Array of {label, value, description: {lt, en}}
  process JSONB, -- Array of {title: {lt, en}, description: {lt, en}}
  deliverables_lt TEXT[],
  deliverables_en TEXT[],
  technologies_lt TEXT[],
  technologies_en TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  icon TEXT NOT NULL, -- Icon name (e.g., "Palette", "Facebook")
  title_key TEXT NOT NULL, -- Translation key
  desc_key TEXT NOT NULL, -- Translation key
  overview_lt TEXT,
  overview_en TEXT,
  pricing_lt TEXT,
  pricing_en TEXT,
  gradient TEXT,
  features_lt TEXT[],
  features_en TEXT[],
  benefits_lt TEXT[],
  benefits_en TEXT[],
  process JSONB, -- Array of {title: {lt, en}, description: {lt, en}}
  deliverables_lt TEXT[],
  deliverables_en TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  text_lt TEXT NOT NULL,
  text_en TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON resources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);

-- Enable Row Level Security (RLS) - Public read, Admin write
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policies: Allow public read access
CREATE POLICY "Public read access for resources" ON resources
  FOR SELECT USING (true);

CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access for services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Public read access for testimonials" ON testimonials
  FOR SELECT USING (true);

-- Note: For write operations, you'll need to implement authentication
-- in your API routes. RLS policies for INSERT/UPDATE/DELETE should
-- be added based on your authentication setup.

