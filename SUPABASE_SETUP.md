# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: Your project name
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Wait for the project to be created (~2 minutes)

## 2. Get Your API Keys

1. In your Supabase project, go to **Settings** → **API**
2. Copy:
   - **Project URL** (this is `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## 3. Set Up Environment Variables

Create or update `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Important**: Never commit `.env.local` to git (it's already in `.gitignore`)

## 4. Create Database Tables

### Step-by-Step Instructions:

1. **Open SQL Editor in Supabase:**
   - In your Supabase project dashboard, look at the left sidebar
   - Click on **"SQL Editor"** (it has a database icon)
   - You should see a blank query editor

2. **Open the Schema File:**
   - In your project, open the file `supabase-schema.sql`
   - Select all the content (Ctrl+A / Cmd+A)
   - Copy it (Ctrl+C / Cmd+C)

3. **Paste and Run the Query:**
   - Go back to Supabase SQL Editor
   - Click in the query editor area (the big text box)
   - Paste the SQL code (Ctrl+V / Cmd+V)
   - You should see all the SQL statements (CREATE TABLE, CREATE INDEX, etc.)
   - Click the **"Run"** button (green button at the bottom right, or press Ctrl+Enter)
   - Wait for it to complete (you'll see "Success" message)

4. **Verify Tables Were Created:**
   - In the left sidebar, click **"Table Editor"**
   - You should see these tables:
     - `resources`
     - `projects`
     - `services`
     - `testimonials`
   - If you see all 4 tables, you're good to go!

**Note:** If you get any errors, make sure you're running the entire file at once, not just parts of it.

## 5. Set Up Storage Bucket

1. **Option A: Using SQL (Recommended)**
   - Go to **SQL Editor** (same place as step 4)
   - Open the file `supabase-storage-setup.sql` in your project
   - Copy all the SQL code
   - Paste it into the SQL Editor
   - Click **"Run"** (or press Ctrl+Enter)
   - Wait for success message
   - This creates the `downloads` bucket and sets up policies

2. **Option B: Using Dashboard**
   - Go to Supabase Dashboard → **Storage**
   - Click **New bucket**
   - Name: `downloads`
   - Make it **Public** (so files can be downloaded)
   - Click **Create bucket**
   - Then go to **Policies** tab and add:
     - Public read access (SELECT)
     - Authenticated uploads (INSERT) - for admin

The storage bucket is used for file uploads (resources, etc.) and ensures files persist in production.

## 5. Set Up Row Level Security (Optional but Recommended)

The schema includes basic RLS policies for public read access. For production:

1. Create a service role key (Settings → API → service_role key)
2. Use it in server-side API routes for admin operations
3. Add RLS policies for INSERT/UPDATE/DELETE that check authentication

## 6. Migrate Existing Data (Optional)

If you have existing data in `/data/*.ts` files, you can:

1. Use the admin panel to manually add items (they'll be saved to Supabase)
2. Or create a migration script to import existing data

## 7. Test the Connection

1. Start your dev server: `npm run dev`
2. Go to `/admin/resources`
3. Try adding a resource - it should save to Supabase!

## Troubleshooting

- **"Missing Supabase environment variables"**: Make sure `.env.local` exists and has the correct variables
- **"Invalid API key"**: Double-check you copied the anon key (not service_role)
- **RLS errors**: Check that your policies allow the operations you're trying to perform

