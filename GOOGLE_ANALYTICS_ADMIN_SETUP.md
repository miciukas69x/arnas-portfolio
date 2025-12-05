# Google Analytics Admin Dashboard Setup

## ✅ Real Data Integration (IMPLEMENTED)

The admin dashboard now fetches **real data** from Google Analytics Data API!

## Setup Instructions (5 minutes, 100% FREE)

### Step 1: Get Your Property ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (gear icon, bottom left)
3. In the **Property** column, click **Property Settings**
4. Copy the **Property ID** (looks like `123456789` - just numbers)
5. This is your `GA_PROPERTY_ID`

### Step 2: Enable Google Analytics Data API (FREE)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing) - **FREE, no credit card needed**
3. Go to **APIs & Services** → **Library**
4. Search for "Google Analytics Data API"
5. Click **Enable** (it's free!)

### Step 3: Create Service Account (FREE)

1. In Google Cloud Console, go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Name it: `analytics-reader` (or any name)
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Click **Done**

### Step 4: Create and Download Key

1. Click on your new service account
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON**
5. Download the file (keep it safe!)

### Step 5: Grant Access to Google Analytics

1. Go back to [Google Analytics](https://analytics.google.com)
2. Click **Admin** → **Property Access Management**
3. Click **+** → **Add users**
4. Enter the **service account email** (from the JSON file, looks like `analytics-reader@project-id.iam.gserviceaccount.com`)
5. Role: **Viewer**
6. Click **Add**

### Step 6: Add Environment Variables

Open the downloaded JSON file and add these to your `.env`:

```env
GA_PROPERTY_ID=123456789
GA_SERVICE_ACCOUNT_EMAIL=analytics-reader@your-project.iam.gserviceaccount.com
GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
```

**Important:** 
- Copy the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Keep the quotes around the private key
- The `\n` characters are important - they represent newlines

### Step 7: Test It!

1. Restart your dev server
2. Go to `/admin/analytics`
3. You should see **real data** from Google Analytics!

## What You Get

✅ **Real visitor counts** (last 30 days vs previous 30 days)
✅ **Real page views** with percentage change
✅ **Popular pages** from your actual data
✅ **All FREE** - no payment required

## Troubleshooting

**"Failed to fetch from Google Analytics API"**
- Check that all 3 environment variables are set correctly
- Verify the service account has "Viewer" access in GA
- Make sure the Data API is enabled in Google Cloud Console

**"Property not found"**
- Double-check your Property ID (just numbers, no `G-` prefix)

**Still showing demo data?**
- Check browser console for errors
- Verify environment variables are loaded (restart server)
- Check that the service account email matches in GA access management

To show real data in the admin dashboard, you need to set up Google Analytics Data API.

### Steps:

1. **Enable Google Analytics Data API:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Select your project (or create one)
   - Enable "Google Analytics Data API"

2. **Create Service Account:**
   - Go to IAM & Admin → Service Accounts
   - Create a new service account
   - Download the JSON key file

3. **Grant Access:**
   - In Google Analytics, go to Admin → Property Access Management
   - Add the service account email with "Viewer" role

4. **Install Package:**
   ```bash
   npm install @google-analytics/data
   ```

5. **Set Environment Variables:**
   ```env
   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
   # OR
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY=your-private-key
   ```

6. **Update API Route:**
   - The `/app/api/analytics/route.ts` file has placeholder code
   - Replace it with real Google Analytics Data API calls

### Example API Implementation:

```typescript
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Fetch real-time visitors
const [response] = await analyticsDataClient.runRealtimeReport({
  property: `properties/${propertyId}`,
  dimensions: [{ name: 'country' }],
  metrics: [{ name: 'activeUsers' }],
});
```

## Recommendation

**For now:** Use Option 1 (current setup)
- Simple and works immediately
- Click "Open GA" to see real data
- No complex setup required

**Later:** Implement Option 2 if you want data embedded in your dashboard
- More complex setup
- Requires Google Cloud Console access
- Better for custom dashboards

## Current Features

✅ Demo data display
✅ Link to Google Analytics dashboard
✅ Loading states
✅ Error handling
✅ Responsive design

The dashboard is fully functional with demo data and a direct link to your real Google Analytics!

