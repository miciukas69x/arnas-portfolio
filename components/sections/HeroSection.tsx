"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

// Removed letterVariants - now animating by word for better performance

function AnimatedText({ text, className }: { text: string; className?: string }) {
  // Animate by word instead of letter for much better performance
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: wordIndex * 0.08, duration: 0.25, ease: 'easeOut' }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col items-center justify-start px-4 sm:px-6 pt-24 sm:pt-24 md:pt-32 pb-4 sm:pb-20">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
        className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass mb-6 sm:mb-8"
      >
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs sm:text-sm text-white">
          <span className="text-primary">4/15</span>
          {' '}
          {t('hero.badge').replace(/^4\/15\s+/i, '')}
        </span>
      </motion.div>

      {/* Title */}
      <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-4 sm:mb-6 px-2">
        <AnimatedText text={t('hero.title')} />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="text-primary animate-pulse"
        >
          |
        </motion.span>
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3, ease: 'easeOut' }}
        className="text-muted-foreground text-center max-w-2xl mb-6 sm:mb-10 text-sm sm:text-base md:text-lg px-4"
      >
        {t('hero.subtitle')}
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3, ease: 'easeOut' }}
        className="w-full sm:w-auto"
      >
        <Button
          asChild
          size="lg"
          className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-border text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-3 w-full sm:w-auto min-h-[48px]"
        >
          <Link href="/book-call">{t('hero.cta')}</Link>
        </Button>
      </motion.div>

      {/* Video Block Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3, ease: 'easeOut' }}
        className="mt-8 sm:mt-12 md:mt-16 w-full max-w-4xl aspect-video rounded-xl sm:rounded-2xl glass overflow-hidden hover-glow mx-4"
      >
        <div className="w-full h-full bg-gradient-to-br from-muted/50 to-card flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/30 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <div className="w-0 h-0 border-t-6 sm:border-t-8 border-t-transparent border-l-10 sm:border-l-12 border-l-primary border-b-6 sm:border-b-8 border-b-transparent ml-1" />
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm">Video Coming Soon</p>
          </div>
        </div>
      </motion.div>

      {/* Stats - Hidden on mobile, visible on sm and up */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.3, ease: 'easeOut' }}
        className="hidden sm:flex mt-8 sm:mt-12 md:mt-16 w-full max-w-4xl glass rounded-full py-6 sm:py-8 px-4 sm:px-6 mx-4"
      >
        <div className="flex flex-row items-center justify-around gap-4 w-full">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">50+</p>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1">{t('stats.projects')}</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">97%</p>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1">{t('stats.satisfaction')}</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">5+</p>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1">{t('stats.experience')}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}