# Row Level Security (RLS) Setup Instructions

## Current Setup

You've already created the tables and enabled RLS. The basic policies for public read access are in place.

## Recommended Approach

Since you're using **Next.js API routes with HTTP-only cookies** for authentication, here's the best setup:

### 1. RLS Policies (Already Done ✅)

The schema already includes:
- ✅ RLS enabled on all tables
- ✅ Public read access policies (anyone can read)

### 2. Write Operations (Using Service Role Key)

For write operations (INSERT/UPDATE/DELETE), we use the **service_role key** which bypasses RLS, but we check authentication in the API routes first.

**Why this approach?**
- ✅ Public can read (via anon key + RLS)
- ✅ Admin can write (via service_role key, but only after auth check)
- ✅ Authentication is handled in Next.js API routes (your existing system)
- ✅ No need to set up Supabase Auth

### 3. Get Your Service Role Key

1. Go to Supabase Dashboard → **Settings** → **API**
2. Find **service_role key** (NOT the anon key!)
3. Copy it (keep it secret - never expose to client)

### 4. Add to Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Important**: 
- `SUPABASE_SERVICE_ROLE_KEY` should **NOT** have `NEXT_PUBLIC_` prefix
- This keeps it server-side only
- Never commit this to git (already in `.gitignore`)

### 5. How It Works

**Read Operations** (Public):
```typescript
// Uses anon key + RLS
const { data } = await supabase.from('resources').select('*');
// ✅ Public can read (RLS allows it)
```

**Write Operations** (Admin Only):
```typescript
// 1. Check authentication in API route
const authenticated = await isAdminAuthenticated();
if (!authenticated) return 401;

// 2. Use service_role key (bypasses RLS)
const { data } = await supabaseAdmin.from('resources').insert(...);
// ✅ Only runs if admin is authenticated
```

### 6. Security Flow

```
User Request → API Route → Check Auth Cookie → If Authenticated → Use service_role → Write to DB
                                                      ↓
                                                 If Not Auth → Return 401
```

## Alternative: Supabase Auth (More Complex)

If you want to use Supabase's built-in authentication instead:

1. Set up Supabase Auth
2. Create policies that check `auth.role() = 'authenticated'`
3. Sign in users via Supabase Auth
4. Use Supabase session tokens

But your current approach (HTTP-only cookies) is simpler and works well!

## Summary

✅ **You're all set!** The RLS policies are already configured:
- Public read access ✅
- Write operations use service_role (with auth check) ✅

Just add the `SUPABASE_SERVICE_ROLE_KEY` to your `.env.local` and you're good to go!

