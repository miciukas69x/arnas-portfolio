"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ArrowLeft, Users, Eye, MousePointerClick, TrendingUp, FileText, Calendar, Loader2, ExternalLink } from 'lucide-react';

function AdminAnalyticsPage() {
  const { language } = useLanguage();
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        const data = await response.json();
        console.log('Analytics API response:', data);
        console.log('Response status:', response.status);
        console.log('Has real data?', !data.error && !data.note && data.visitors?.total !== undefined);
        if (response.ok) {
          setAnalyticsData(data);
        } else {
          console.error('Analytics API error:', data);
          // Still set data so we can show error message
          setAnalyticsData(data);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setAnalyticsData({ error: String(error) });
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  // Use real data if available and valid (even if 0 - that's valid data!)
  // Only use demo data if there's an error or note saying it's demo
  const hasRealData = analyticsData && !analyticsData.error && !analyticsData.note && !analyticsData.apiError && analyticsData.visitors?.total !== undefined;
  
  const stats = hasRealData ? [
    {
      label: language === 'lt' ? 'Lankytojai' : 'Visitors',
      value: (analyticsData.visitors?.total || 0).toLocaleString(),
      change: analyticsData.visitors?.change !== undefined ? `${analyticsData.visitors.change > 0 ? '+' : ''}${analyticsData.visitors.change}%` : 'N/A',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: language === 'lt' ? 'Puslapių Peržiūros' : 'Page Views',
      value: (analyticsData.pageViews?.total || 0).toLocaleString(),
      change: analyticsData.pageViews?.change !== undefined ? `${analyticsData.pageViews.change > 0 ? '+' : ''}${analyticsData.pageViews.change}%` : 'N/A',
      icon: Eye,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: language === 'lt' ? 'Paspaudimai' : 'Clicks',
      value: (analyticsData.clicks?.total || 0).toLocaleString(),
      change: analyticsData.clicks?.change !== undefined ? `${analyticsData.clicks.change > 0 ? '+' : ''}${analyticsData.clicks.change}%` : 'N/A',
      icon: MousePointerClick,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: language === 'lt' ? 'Augimas' : 'Growth',
      value: analyticsData.growth?.value || `${analyticsData.visitors?.change > 0 ? '+' : ''}${analyticsData.visitors?.change || 0}%`,
      change: analyticsData.growth?.change || 'N/A',
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ] : [
    {
      label: language === 'lt' ? 'Lankytojai' : 'Visitors',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: language === 'lt' ? 'Puslapių Peržiūros' : 'Page Views',
      value: '5,678',
      change: '+8%',
      icon: Eye,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: language === 'lt' ? 'Paspaudimai' : 'Clicks',
      value: '2,345',
      change: '+15%',
      icon: MousePointerClick,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: language === 'lt' ? 'Augimas' : 'Growth',
      value: '+23%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  // Use real recent activity if we have real data and activity exists, otherwise show empty state or demo
  const recentActivity = hasRealData
    ? (analyticsData?.recentActivity && analyticsData.recentActivity.length > 0
        ? analyticsData.recentActivity
        : []) // Empty array if no activity yet
    : [
        {
          type: language === 'lt' ? 'Naujas projekto peržiūrėjimas' : 'New project view',
          item: 'TechStart Rebrand',
          time: '2 minutes ago',
          icon: FileText,
        },
        {
          type: language === 'lt' ? 'Paslaugos peržiūrėjimas' : 'Service view',
          item: 'Branding',
          time: '15 minutes ago',
          icon: FileText,
        },
        {
          type: language === 'lt' ? 'Skambučio rezervacija' : 'Call booking',
          item: 'New booking',
          time: '1 hour ago',
          icon: Calendar,
        },
      ];

  // Use real popular pages if we have real data, otherwise show demo
  const popularPages = hasRealData 
    ? (analyticsData?.popularPages && analyticsData.popularPages.length > 0
        ? analyticsData.popularPages
        : []) // Empty array if no pages yet
    : [
        { page: '/', views: 1234 },
        { page: '/services', views: 856 },
        { page: '/case-studies', views: 642 },
        { page: '/story', views: 421 },
      ];

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-6">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {language === 'lt' ? 'Atgal į Valdymo Skydelį' : 'Back to Dashboard'}
              </Button>
            </Link>
          </div>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                  {language === 'lt' ? 'Analitika' : 'Analytics'}
                </h1>
                <p className="text-muted-foreground">
                  {language === 'lt'
                    ? 'Peržiūrėkite svetainės statistiką ir veiklos duomenis'
                    : 'View website statistics and activity data'}
                </p>
              </div>
              {gaId && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <a
                    href={`https://analytics.google.com/analytics/web/#/p${gaId.replace('G-', '')}/realtime/overview`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {language === 'lt' ? 'Atidaryti GA' : 'Open GA'}
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="flex items-center justify-center min-h-[200px] mb-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : stats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-card/50 border-border/50">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                            <Icon className={`h-5 w-5 ${stat.color}`} />
                          </div>
                          <span className={`text-xs font-medium ${stat.change && stat.change.startsWith('+') ? 'text-green-500' : stat.change && stat.change.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'}`}>
                            {stat.change || 'N/A'}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <p className="text-2xl sm:text-3xl font-bold">{stat.value || '0'}</p>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[200px] mb-8">
              <p className="text-muted-foreground">No stats available</p>
            </div>
          )}

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>
                  {language === 'lt' ? 'Paskutinė Veikla' : 'Recent Activity'}
                </CardTitle>
                <CardDescription>
                  {language === 'lt'
                    ? 'Naujausi svetainės įvykiai'
                    : 'Latest website events'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{activity.type}</p>
                            <p className="text-xs text-muted-foreground">{activity.item}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    {hasRealData
                      ? (language === 'lt'
                          ? 'Dar nėra veiklos. Kai kas nors aplankys svetainę arba atliks veiksmą, čia bus rodomi įvykiai.'
                          : 'No activity yet. Once someone visits your site or performs an action, events will appear here.')
                      : (language === 'lt'
                          ? 'Rodyti demonstraciniai duomenys. Norėdami matyti tikrus duomenis, nustatykite Google Analytics Data API.'
                          : 'Showing demo data. To see real data, set up Google Analytics Data API.')}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>
                  {language === 'lt' ? 'Populiariausi Puslapiai' : 'Popular Pages'}
                </CardTitle>
                <CardDescription>
                  {language === 'lt'
                    ? 'Dažniausiai lankomi puslapiai'
                    : 'Most visited pages'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {popularPages.length > 0 ? (
                  <div className="space-y-4">
                    {popularPages.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                        <div>
                          <p className="text-sm font-medium">{item.page}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.views} {language === 'lt' ? 'peržiūrų' : 'views'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    {language === 'lt' 
                      ? 'Dar nėra puslapių peržiūrų. Kai kas nors aplankys svetainę, čia bus rodomi puslapiai.'
                      : 'No page views yet. Once someone visits your site, pages will appear here.'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {analyticsData && (analyticsData.error || analyticsData.apiError || analyticsData.note) && (
            <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm text-muted-foreground text-center mb-2">
                {analyticsData?.error 
                  ? (language === 'lt' 
                      ? `Klaida: ${analyticsData.error}. Patikrinkite konsolę dėl daugiau informacijos.`
                      : `Error: ${analyticsData.error}. Check console for more details.`)
                  : analyticsData?.apiError
                  ? (language === 'lt'
                      ? `API klaida: ${analyticsData.apiError}. Rodyti demonstraciniai duomenys.`
                      : `API error: ${analyticsData.apiError}. Showing demo data.`)
                  : (language === 'lt'
                      ? 'Pastaba: Rodyti demonstraciniai duomenys. Norėdami matyti tikrus duomenis, nustatykite Google Analytics Data API. Arba spustelėkite "Atidaryti GA" mygtuką, kad peržiūrėtumėte duomenis tiesiogiai Google Analytics.'
                      : 'Note: Showing demo data. To see real data, set up Google Analytics Data API. Or click "Open GA" button to view data directly in Google Analytics.')}
              </p>
              {gaId && (
                <p className="text-xs text-muted-foreground text-center">
                  {language === 'lt'
                    ? 'Google Analytics ID: ' + gaId
                    : 'Google Analytics ID: ' + gaId}
                </p>
              )}
            </div>
          )}
          
          {hasRealData && analyticsData.visitors?.total === 0 && (
            <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm text-blue-400 text-center">
                {language === 'lt'
                  ? '✅ Prisijungta prie Google Analytics! Duomenys rodo 0, nes svetainė dar neturi lankytojų. Kai kas nors aplankys svetainę, čia bus rodomi tikri duomenys.'
                  : '✅ Connected to Google Analytics! Data shows 0 because the site has no visitors yet. Once someone visits, real data will appear here.'}
              </p>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default function AdminAnalyticsPageWrapper() {
  return (
    <ProtectedRoute>
      <AdminAnalyticsPage />
    </ProtectedRoute>
  );
}

