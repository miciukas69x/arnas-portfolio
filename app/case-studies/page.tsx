"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import type { Project } from '@/data/projects';

export default function CaseStudiesPage() {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Button
                asChild
                variant="ghost"
                className="mb-8"
              >
                <Link href="/">
                  <ArrowLeft size={16} className="mr-2" />
                  {t('cta.backToHome')}
                </Link>
              </Button>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
                {t('caseStudies.title')}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {t('caseStudies.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">{t('caseStudies.loading') || 'Loading...'}</p>
              </div>
            ) : (
              <div className="space-y-12">
                {projects.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.3, ease: 'easeOut' }}
                >
                  <Card className="group h-full bg-card/50 border-border/50 hover-glow transition-all duration-500 hover:border-primary/50 overflow-hidden">
                    <div className={`aspect-video bg-gradient-to-br ${study.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-card/50 flex items-center justify-center">
                        <div className="text-4xl opacity-30">📊</div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-background/80 text-xs">
                          {study.category[language]}
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <h3 className="text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        {study.description[language]}
                      </p>
                      <p className="text-muted-foreground mb-8 leading-relaxed">
                        {study.fullDescription[language]}
                      </p>

                      <div className="grid grid-cols-3 gap-6 mb-8">
                        {study.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </div>
                        ))}
                      </div>

                      <Button
                        asChild
                        className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-border"
                      >
                        <Link href={`/projects/${study.id}`}>
                          {t('caseStudies.viewProject')}
                          <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
