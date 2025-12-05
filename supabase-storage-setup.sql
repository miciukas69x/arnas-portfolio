-- Supabase Storage Setup for File Uploads
-- Run this SQL in your Supabase SQL Editor

-- Create downloads storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('downloads', 'downloads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access (so files can be downloaded)
-- Drop policy if it exists first
DROP POLICY IF EXISTS "Public read access for downloads" ON storage.objects;
CREATE POLICY "Public read access for downloads"
ON storage.objects FOR SELECT
USING (bucket_id = 'downloads');

-- Allow authenticated uploads (admin only - authentication checked in API route)
-- Note: We use service_role key in API, so this policy allows uploads
-- The actual auth check happens in the Next.js API route
-- Drop policy if it exists first
DROP POLICY IF EXISTS "Authenticated uploads for downloads" ON storage.objects;
CREATE POLICY "Authenticated uploads for downloads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'downloads');

-- Optional: Allow updates (for replacing files)
-- Drop policy if it exists first
DROP POLICY IF EXISTS "Authenticated updates for downloads" ON storage.objects;
CREATE POLICY "Authenticated updates for downloads"
ON storage.objects FOR UPDATE
USING (bucket_id = 'downloads');

-- Optional: Allow deletes (for removing files)
-- Drop policy if it exists first
DROP POLICY IF EXISTS "Authenticated deletes for downloads" ON storage.objects;
CREATE POLICY "Authenticated deletes for downloads"
ON storage.objects FOR DELETE
USING (bucket_id = 'downloads');

