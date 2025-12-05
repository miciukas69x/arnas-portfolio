"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Palette, Facebook, Search, MessageCircle, Lightbulb, LucideIcon } from 'lucide-react';
import type { Service } from '@/data/services';

const tags = [
  'Product Design',
  'Brand Identity Design',
  'Branding',
  'Packaging Design',
  'Mockup Design',
  'Copywriting',
  'Brand Graphics',
  'Brand Migration',
  'Package Design',
  'Slide Decks',
];

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Palette,
  Facebook,
  Search,
  MessageCircle,
  Lightbulb,
};

export default function ServicesSection() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Show only first 2 services on mobile, first 4 on desktop
  const displayedServices = isMobile ? services.slice(0, 2) : services.slice(0, 4);

  if (loading || displayedServices.length === 0) {
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
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-border text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            ✦ {t('services.badge')}
          </span>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-end">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                {t('services.title')}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                {t('services.subtitle')}
              </p>
            </div>
            <div className="hidden md:flex flex-wrap gap-2">
              {tags.slice(0, 5).map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {displayedServices.map((service, index) => {
            // Map icon name to component
            const ServiceIcon = (service as any).iconName 
              ? iconMap[(service as any).iconName] || Palette
              : service.icon || Palette;
            
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.03, duration: 0.3, ease: 'easeOut' }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover-glow transition-all duration-300 hover:border-primary/50 group">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-lg bg-muted flex-shrink-0">
                      <ServiceIcon size={20} className="sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {t(service.titleKey)}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                        {t(service.descKey)}
                      </p>
                      <Button
                        asChild
                        variant="ghost"
                        className="p-0 h-auto text-muted-foreground hover:text-primary group/btn text-xs sm:text-sm min-h-[44px]"
                      >
                        <Link href={`/services/${service.id}`}>
                          {t('caseStudies.viewProject')}
                          <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            );
          })}
        </div>

        {/* Tags Marquee */}
        <div className="mt-12 sm:mt-16 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            className="flex gap-4 sm:gap-6 whitespace-nowrap"
          >
            {[...tags, ...tags].map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/50"
              >
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/70" />
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.3, duration: 0.3, ease: 'easeOut' }}
          className="mt-8 sm:mt-12 md:mt-16 text-center"
        >
          <Button
            asChild
            className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-border text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-3 min-h-[48px]"
          >
            <Link href="/services">
              {t('cta.viewAll')}
              <ArrowRight size={14} className="sm:w-4 sm:h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}