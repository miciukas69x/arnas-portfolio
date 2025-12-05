# Google Analytics Setup

## Quick Setup

1. **Get your Google Analytics Measurement ID:**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create a new property (or use existing)
   - Get your Measurement ID (looks like `G-XXXXXXXXXX`)

2. **Add to Environment Variables:**
   
   In your `.env.local` file (for development):
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   
   In your hosting platform (Vercel/Netlify) for production:
   - Add the same variable in your platform's environment variables settings

3. **That's it!** Google Analytics will start tracking automatically.

## What Gets Tracked

- ✅ Page views (automatic)
- ✅ User sessions
- ✅ Traffic sources
- ✅ Device/browser info
- ✅ Geographic data

## View Your Data

- Go to [Google Analytics Dashboard](https://analytics.google.com)
- Select your property
- View real-time and historical data

## Privacy Note

The implementation uses Google Analytics 4 (GA4) which is privacy-focused. You may want to add a cookie consent banner for GDPR compliance if you have EU visitors.

## Disable Analytics

If you want to disable analytics temporarily:
- Remove or comment out the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable
- The component will automatically skip loading if the ID is not set

