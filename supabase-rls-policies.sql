-- Row Level Security Policies for Supabase
-- Run this in your Supabase SQL Editor after creating the tables

-- ============================================
-- RESOURCES TABLE POLICIES
-- ============================================

-- Public read access (already created, but here for reference)
-- CREATE POLICY "Public read access for resources" ON resources
--   FOR SELECT USING (true);

-- For INSERT/UPDATE/DELETE, we'll use service_role key in API routes
-- which bypasses RLS. Alternatively, you can create policies that check
-- for authenticated users if you want to use Supabase Auth:

-- Option 1: Allow authenticated users (if using Supabase Auth)
-- CREATE POLICY "Authenticated users can insert resources" ON resources
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- 
-- CREATE POLICY "Authenticated users can update resources" ON resources
--   FOR UPDATE USING (auth.role() = 'authenticated');
-- 
-- CREATE POLICY "Authenticated users can delete resources" ON resources
--   FOR DELETE USING (auth.role() = 'authenticated');

-- Option 2: Use service_role key in API routes (Recommended)
-- This bypasses RLS, but you check authentication in your Next.js API routes
-- No additional policies needed - just use service_role key in server-side code

-- ============================================
-- PROJECTS TABLE POLICIES
-- ============================================

-- Public read access (already created)
-- CREATE POLICY "Public read access for projects" ON projects
--   FOR SELECT USING (true);

-- For write operations, same as resources - use service_role in API routes

-- ============================================
-- SERVICES TABLE POLICIES
-- ============================================

-- Public read access (already created)
-- CREATE POLICY "Public read access for services" ON services
--   FOR SELECT USING (true);

-- For write operations, same as resources - use service_role in API routes

-- ============================================
-- RECOMMENDED APPROACH
-- ============================================
-- Since you're using Next.js API routes with HTTP-only cookies for authentication,
-- the best approach is:
-- 
-- 1. Keep public read access (already set up)
-- 2. Use service_role key in your API routes for admin operations
-- 3. Check authentication in your Next.js API routes before allowing writes
--
-- This way:
-- - Public users can read (via anon key + RLS)
-- - Admin operations use service_role (bypasses RLS)
-- - Your Next.js API routes verify admin authentication before allowing writes
--
-- To implement:
-- 1. Get your service_role key from Supabase Settings → API
-- 2. Add it to .env.local as SUPABASE_SERVICE_ROLE_KEY (NOT NEXT_PUBLIC_)
-- 3. Update API routes to use service_role key for write operations

