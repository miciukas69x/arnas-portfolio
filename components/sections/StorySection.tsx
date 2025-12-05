"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function StorySection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Image - Always visible, appears second */}
          <div className="relative w-[280px] sm:w-[320px] md:w-full mx-auto md:mx-0 mb-8 md:mb-0 order-2 flex flex-col">
            <div className="aspect-[3/4] rounded-xl sm:rounded-2xl glass overflow-hidden relative w-full">
              <Image
                src="/arnas.png"
                alt="Arnas"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 50vw"
                priority
                unoptimized
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 border border-primary/50 rounded-xl sm:rounded-2xl -z-10" />
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
              className="mt-6 sm:mt-8"
            >
              <Button
                asChild
                className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-border text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-3 min-h-[48px] w-full sm:w-auto"
              >
                <Link href="/story">
                  {t('cta.readMore')}
                  <ArrowRight size={14} className="sm:w-4 sm:h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="min-w-0 order-1"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 break-words">
              {t('story.title')}
              <span className="text-primary animate-pulse">|</span>
            </h2>

            <div className="space-y-4 sm:space-y-6 text-muted-foreground">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed break-words overflow-wrap-anywhere line-clamp-3 sm:line-clamp-none">{t('story.p1')}</p>
              <p className="hidden sm:block text-sm sm:text-base md:text-lg leading-relaxed break-words overflow-wrap-anywhere">{t('story.p2')}</p>
              <p className="hidden sm:block text-sm sm:text-base md:text-lg leading-relaxed break-words overflow-wrap-anywhere">{t('story.p3')}</p>
            </div>

            {/* Skills Marquee */}
            <div className="mt-8 sm:mt-12 overflow-hidden">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                className="flex gap-4 sm:gap-6 md:gap-8 whitespace-nowrap"
                style={{ willChange: 'transform' }}
              >
                {[
                  'Branding',
                  'Brand Identity Design',
                  'After Effects',
                  'UX/UI Design',
                  'Photoshop',
                  'Canva',
                  'Framer',
                  'Davinci Resolve',
                  'Product Design',
                  'Branding',
                  'Brand Identity Design',
                  'After Effects',
                ].map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground"
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary" />
                    {skill}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}