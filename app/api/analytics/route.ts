import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth-helpers';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const propertyId = process.env.GA_PROPERTY_ID;
    const serviceAccountEmail = process.env.GA_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');

    // If credentials are not set, return demo data with a note
    if (!propertyId || !serviceAccountEmail || !privateKey) {
      return NextResponse.json({
        visitors: {
          total: 1234,
          change: 12,
        },
        pageViews: {
          total: 5678,
          change: 8,
        },
        clicks: {
          total: 2345,
          change: 15,
        },
        growth: {
          value: '+23%',
          change: '+5%',
        },
        popularPages: [
          { page: '/', views: 1234 },
          { page: '/services', views: 856 },
          { page: '/case-studies', views: 642 },
          { page: '/story', views: 421 },
        ],
        recentActivity: [],
        note: 'Demo data. To see real data, set up GA_PROPERTY_ID, GA_SERVICE_ACCOUNT_EMAIL, and GA_PRIVATE_KEY. See GOOGLE_ANALYTICS_ADMIN_SETUP.md',
      });
    }

    try {
      // Initialize Analytics Data API client
      const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: {
          client_email: serviceAccountEmail,
          private_key: privateKey,
        },
      });

      const property = `properties/${propertyId}`;

      // Get last 30 days vs previous 30 days for comparison
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      const sixtyDaysAgo = new Date(today);
      sixtyDaysAgo.setDate(today.getDate() - 60);

      // Format dates as YYYY-MM-DD
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      // Fetch active users (visitors) - using separate reports for current and previous
      const [currentVisitorsResponse] = await analyticsDataClient.runReport({
        property,
        dateRanges: [
          {
            startDate: formatDate(thirtyDaysAgo),
            endDate: 'today',
          },
        ],
        metrics: [{ name: 'activeUsers' }],
      });

      const [previousVisitorsResponse] = await analyticsDataClient.runReport({
        property,
        dateRanges: [
          {
            startDate: formatDate(sixtyDaysAgo),
            endDate: formatDate(thirtyDaysAgo),
          },
        ],
        metrics: [{ name: 'activeUsers' }],
      });

      // Fetch page views
      const [currentPageViewsResponse] = await analyticsDataClient.runReport({
        property,
        dateRanges: [
          {
            startDate: formatDate(thirtyDaysAgo),
            endDate: 'today',
          },
        ],
        metrics: [{ name: 'screenPageViews' }],
      });

      const [previousPageViewsResponse] = await analyticsDataClient.runReport({
        property,
        dateRanges: [
          {
            startDate: formatDate(sixtyDaysAgo),
            endDate: formatDate(thirtyDaysAgo),
          },
        ],
        metrics: [{ name: 'screenPageViews' }],
      });

      // Fetch popular pages
      const [popularPagesResponse] = await analyticsDataClient.runReport({
        property,
        dateRanges: [
          {
            startDate: formatDate(thirtyDaysAgo),
            endDate: 'today',
          },
        ],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [
          {
            metric: { metricName: 'screenPageViews' },
            desc: true,
          },
        ],
        limit: 10,
      });

      // Calculate visitors
      const currentVisitors = parseInt(
        currentVisitorsResponse.rows?.[0]?.metricValues?.[0]?.value || '0'
      );
      const previousVisitors = parseInt(
        previousVisitorsResponse.rows?.[0]?.metricValues?.[0]?.value || '0'
      );
      const visitorsChange =
        previousVisitors > 0
          ? Math.round(((currentVisitors - previousVisitors) / previousVisitors) * 100)
          : 0;

      // Calculate page views
      const currentPageViews = parseInt(
        currentPageViewsResponse.rows?.[0]?.metricValues?.[0]?.value || '0'
      );
      const previousPageViews = parseInt(
        previousPageViewsResponse.rows?.[0]?.metricValues?.[0]?.value || '0'
      );
      const pageViewsChange =
        previousPageViews > 0
          ? Math.round(((currentPageViews - previousPageViews) / previousPageViews) * 100)
          : 0;

      // Get popular pages
      const popularPages =
        popularPagesResponse.rows?.map((row) => ({
          page: row.dimensionValues?.[0]?.value || '/',
          views: parseInt(row.metricValues?.[0]?.value || '0'),
        })) || [];

      return NextResponse.json({
        visitors: {
          total: currentVisitors,
          change: visitorsChange,
        },
        pageViews: {
          total: currentPageViews,
          change: pageViewsChange,
        },
        clicks: {
          total: 0, // Not directly available in GA4
          change: 0,
        },
        growth: {
          value: `${visitorsChange > 0 ? '+' : ''}${visitorsChange}%`,
          change: '+5%',
        },
        popularPages,
        recentActivity: [],
      });
    } catch (apiError: any) {
      console.error('Google Analytics API error:', apiError);
      console.error('Error details:', {
        message: apiError.message,
        code: apiError.code,
        status: apiError.status,
        details: apiError.details,
      });
      // Return demo data if API fails
      return NextResponse.json({
        visitors: {
          total: 1234,
          change: 12,
        },
        pageViews: {
          total: 5678,
          change: 8,
        },
        clicks: {
          total: 2345,
          change: 15,
        },
        growth: {
          value: '+23%',
          change: '+5%',
        },
        popularPages: [
          { page: '/', views: 1234 },
          { page: '/services', views: 856 },
          { page: '/case-studies', views: 642 },
          { page: '/story', views: 421 },
        ],
        recentActivity: [],
        error: 'Failed to fetch from Google Analytics API. Showing demo data.',
        apiError: apiError.message || String(apiError),
        apiErrorCode: apiError.code,
        apiErrorStatus: apiError.status,
      });
    }
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

