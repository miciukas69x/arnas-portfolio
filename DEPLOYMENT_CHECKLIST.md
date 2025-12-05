# Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Variables (CRITICAL)
Make sure these are set in your hosting platform (Vercel, Netlify, etc.):

**Required Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX (for Google Analytics tracking)
GA_PROPERTY_ID=123456789 (for admin dashboard - get from GA Admin → Property Settings)
GA_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com (from Google Cloud)
GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n" (from service account JSON)
```

**How to set in Vercel:**
1. Go to your project → Settings → Environment Variables
2. Add each variable
3. Make sure to add them for **Production**, **Preview**, and **Development**
4. Redeploy after adding variables

### 2. Supabase Setup
- ✅ Tables created (`resources`, `projects`, `services`, `testimonials`)
- ✅ Storage bucket created (`downloads`)
- ✅ RLS policies set up
- ✅ Data migrated (or will be added via admin panel)

### 3. Test Before Deploying
- [ ] Test admin login works
- [ ] Test adding/editing/deleting resources
- [ ] Test adding/editing/deleting projects
- [ ] Test adding/editing/deleting services
- [ ] Test adding/editing/deleting testimonials
- [ ] Test file uploads (resources)
- [ ] Test public pages load correctly

## 🚀 Deployment Steps

### For Vercel:
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables (see above)
4. Deploy
5. Test the live site

### For Other Platforms:
- Follow platform-specific instructions
- Make sure to set all environment variables
- Ensure Node.js version is compatible (check `package.json`)

## ✅ Post-Deployment Verification

1. **Public Pages:**
   - Homepage loads
   - Services page shows services
   - Projects page shows projects
   - Testimonials page shows testimonials
   - Resources page shows resources

2. **Admin Panel:**
   - Can log in at `/login`
   - Can access `/admin` dashboard
   - Can manage all content types
   - File uploads work

3. **Database:**
   - Data persists (check Supabase dashboard)
   - New items appear in database
   - File uploads go to Supabase Storage

## 🔒 Security Notes

- ✅ `SUPABASE_SERVICE_ROLE_KEY` is **NOT** prefixed with `NEXT_PUBLIC_` (server-side only)
- ✅ Admin credentials are server-side only
- ✅ RLS policies protect database
- ✅ File uploads require admin authentication

## 📝 What Will Work in Production

✅ **Everything will work!** Here's why:

1. **Database:** Supabase is cloud-hosted, so it works the same in production
2. **File Storage:** Supabase Storage is cloud-hosted, files persist
3. **Authentication:** Server-side API routes work the same
4. **Environment Variables:** Set them in your hosting platform

## ⚠️ Common Issues

1. **"Missing environment variables"**
   - Solution: Make sure all env vars are set in hosting platform

2. **"Failed to fetch" errors**
   - Solution: Check Supabase URL and keys are correct

3. **File uploads don't work**
   - Solution: Verify storage bucket exists and policies are set

4. **Admin login doesn't work**
   - Solution: Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set

