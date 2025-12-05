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
import { ArrowLeft, Check, ArrowRight, Loader2 } from 'lucide-react';
import { Palette, Facebook, Search, MessageCircle, Lightbulb, LucideIcon } from 'lucide-react';
import type { Service } from '@/data/services';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Palette,
  Facebook,
  Search,
  MessageCircle,
  Lightbulb,
};

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
  'Social Media Content',
  'Email Marketing',
  'Content Strategy',
  'Analytics',
];

export default function ServicesPage() {
  const { t, language } = useLanguage();
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

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 sm:mb-8"
            >
              <Button
                asChild
                variant="ghost"
                className="mb-4 sm:mb-8 text-sm sm:text-base min-h-[44px]"
              >
                <Link href="/">
                  <ArrowLeft size={16} className="mr-2" />
                  {t('cta.backToHome')}
                </Link>
              </Button>
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-border text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                ✦ {t('services.badge')}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
                {t('services.title')}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl">
                {t('services.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">{t('services.loading') || 'Loading...'}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
                {services.map((service, index) => {
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
                  transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
                >
                  <Card className="h-full bg-card/50 border-border/50 hover-glow transition-all duration-300 hover:border-primary/50 group">
                    <CardContent className="p-4 sm:p-6 md:p-8">
                      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="p-3 sm:p-4 rounded-lg bg-muted flex-shrink-0">
                          <ServiceIcon size={24} className="sm:w-8 sm:h-8 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                            {t(service.titleKey)}
                          </h3>
                          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                            {t(service.descKey)}
                          </p>
                          <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                            <p className="text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">Features:</p>
                            {service.features[language].map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                                <Check size={14} className="sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                          <Button
                            asChild
                            variant="ghost"
                            className="p-0 h-auto text-muted-foreground hover:text-primary group/btn text-sm sm:text-base min-h-[44px]"
                          >
                            <Link href={`/services/${service.id}`}>
                              {language === 'lt' ? 'Sužinoti daugiau' : 'Learn More'}
                              <ArrowRight size={14} className="sm:w-4 sm:h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
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
            )}

            {/* Tags Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mb-20"
            >
              <h2 className="font-display text-3xl font-bold mb-8">Related Services</h2>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tags Marquee */}
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                className="flex gap-6 whitespace-nowrap"
              >
                {[...tags, ...tags].map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground px-4 py-2 rounded-full border border-border/50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
