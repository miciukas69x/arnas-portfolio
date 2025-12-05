"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Project } from '@/data/projects';

export default function CaseStudiesSection() {
  const { language, t } = useLanguage();
  const isMobile = useIsMobile();
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

  // Show only first 1 project on mobile, first 2 on desktop
  const caseStudies = isMobile ? projects.slice(0, 1) : projects.slice(0, 2);

  if (loading || caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-border text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            {t('caseStudies.title')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            {t('caseStudies.title')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            {t('caseStudies.subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.03, duration: 0.3, ease: 'easeOut' }}
            >
              <Card className="group h-full bg-card/50 border-border/50 hover-glow transition-all duration-500 hover:border-primary/50 overflow-hidden">
                {/* Image Placeholder */}
                <div className={`aspect-video bg-gradient-to-br ${study.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-card/50 flex items-center justify-center">
                    <div className="text-3xl sm:text-4xl opacity-30">📊</div>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-background/80 text-[10px] sm:text-xs">
                      {study.category[language]}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
                    {study.description[language]}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 sm:gap-6 mb-3 sm:mb-4">
                    {study.stats.slice(0, 2).map((stat, i) => (
                      <div key={i}>
                        <p className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Link */}
                  <Button
                    asChild
                    variant="ghost"
                    className="p-0 h-auto text-muted-foreground hover:text-primary group/btn text-sm sm:text-base min-h-[44px]"
                  >
                    <Link href={`/projects/${study.id}`}>
                      {t('caseStudies.viewProject')}
                      <ArrowRight size={14} className="sm:w-4 sm:h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Button
            asChild
            className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-border text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-3 min-h-[48px]"
          >
            <Link href="/case-studies">
              {t('cta.viewAll')}
              <ArrowRight size={14} className="sm:w-4 sm:h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}