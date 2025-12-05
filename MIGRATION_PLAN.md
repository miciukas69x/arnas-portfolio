# Data Migration Plan: Static Files → Supabase

## Overview

This plan migrates all existing data from static TypeScript files (`/data/*.ts`) to Supabase database, allowing the admin to edit content through the CMS.

## Current State

- **Resources**: 2 items in `/data/resources.ts`
- **Projects**: 3 items in `/data/projects.ts`
- **Services**: 6 items in `/data/services.ts`

## Migration Steps

### Step 1: Run Migration Script

1. **Install tsx** (if not already installed):
   ```bash
   npm install -D tsx
   ```

2. **Run the migration script**:
   ```bash
   npx tsx scripts/migrate-to-supabase.ts
   ```

   The script will:
   - ✅ Read all data from `/data/*.ts` files
   - ✅ Check if items already exist (by ID) to avoid duplicates
   - ✅ Import new items to Supabase
   - ✅ Show progress and summary

### Step 2: Verify Migration

1. **Check Supabase Dashboard**:
   - Go to Table Editor
   - Verify all tables have data:
     - `resources` - should have 2 items
     - `projects` - should have 3 items
     - `services` - should have 6 items

2. **Test Admin Panel**:
   - Go to `/admin/resources` - should see 2 resources
   - Go to `/admin/projects` - should see 3 projects
   - Go to `/admin/services` - should see 6 services

3. **Test Public Pages**:
   - Go to `/resources` - should display resources from Supabase
   - Go to `/case-studies` - should display projects from Supabase
   - Go to `/services` - should display services from Supabase

### Step 3: Update Public Pages (If Needed)

Some pages might still be using static imports. Update them to fetch from API:

#### Pages to Update:
- [ ] `/components/sections/CaseStudiesSection.tsx` - Fetch from `/api/projects`
- [ ] `/components/sections/ServicesSection.tsx` - Fetch from `/api/services`
- [ ] `/components/sections/ResourcesSection.tsx` - Fetch from `/api/resources`
- [ ] `/app/case-studies/page.tsx` - Fetch from `/api/projects`
- [ ] `/app/services/page.tsx` - Fetch from `/api/services`
- [ ] Individual project pages - Fetch from `/api/projects`
- [ ] Individual service pages - Fetch from `/api/services`

### Step 4: Keep Static Files as Fallback (Optional)

You can keep the static files for:
- **Type definitions** (interfaces/types)
- **Fallback data** if API fails
- **Development/testing**

But remove the actual data arrays or mark them as deprecated.

## Migration Script Features

The migration script (`scripts/migrate-to-supabase.ts`):

✅ **Idempotent**: Safe to run multiple times (skips existing items)
✅ **Error Handling**: Continues even if one item fails
✅ **Progress Reporting**: Shows what's being imported
✅ **Summary**: Reports total imported/skipped items

## After Migration

### What Changes:
- ✅ Admin can edit all content through CMS
- ✅ Changes persist in database
- ✅ No need to redeploy for content changes
- ✅ Can add/edit/delete items via admin panel

### What Stays the Same:
- ✅ Public-facing URLs remain the same
- ✅ Page structure and design unchanged
- ✅ TypeScript types/interfaces still in `/data/*.ts`

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` has:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

### "Item already exists" (skipped)
- This is normal if you run the script multiple times
- To re-import, delete the item from Supabase first

### "Error importing..."
- Check Supabase dashboard for table structure
- Verify all required fields are present
- Check console for detailed error messages

## Next Steps After Migration

1. ✅ Test all CRUD operations in admin panel
2. ✅ Update remaining pages to use API
3. ✅ Remove or deprecate static data arrays
4. ✅ Document the new CMS workflow for the admin

## Rollback Plan

If something goes wrong:

1. **Data is safe**: Static files still exist
2. **Can revert**: Update pages back to use static imports
3. **Database backup**: Supabase has automatic backups

---

**Ready to migrate?** Run: `npx tsx scripts/migrate-to-supabase.ts`

