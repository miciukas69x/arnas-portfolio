"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Zap, TrendingUp } from 'lucide-react';

export default function StoryPage() {
  const { t, language } = useLanguage();

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
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
                {t('story.title')}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Main Story Content */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start mb-12 sm:mb-16 md:mb-20">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative max-w-[200px] sm:max-w-[280px] md:max-w-none mx-auto md:mx-0"
              >
                <div className="aspect-[3/4] rounded-xl sm:rounded-2xl glass overflow-hidden relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-none">
                  <Image
                    src="/arnas.png"
                    alt="Arnas"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, 50vw"
                  />
                </div>
                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 border border-primary/50 rounded-xl sm:rounded-2xl -z-10" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
                className="min-w-0"
              >
                <div className="space-y-4 sm:space-y-6 text-muted-foreground mb-6 sm:mb-8">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed break-words overflow-wrap-anywhere">{t('story.p1')}</p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed break-words overflow-wrap-anywhere">{t('story.p2')}</p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed break-words overflow-wrap-anywhere">{t('story.p3')}</p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed break-words overflow-wrap-anywhere">{t('story.p4')}</p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed break-words overflow-wrap-anywhere">{t('story.p5')}</p>
                </div>
              </motion.div>
            </div>

            {/* Approach Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mb-20"
            >
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 break-words">
                {t('story.approach.title')}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl break-words overflow-wrap-anywhere">
                {t('story.approach.desc')}
              </p>
            </motion.div>

            {/* Values/Principles Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
              {[
                { icon: Target, title: { lt: 'Tikslai', en: 'Goals' }, desc: { lt: 'Kiekvienas projektas prasideda nuo aiškių tikslų ir matomų rezultatų.', en: 'Every project starts with clear goals and measurable outcomes.' } },
                { icon: Zap, title: { lt: 'Greitis', en: 'Speed' }, desc: { lt: 'Greitai reaguoju į pokyčius ir pritaikau strategijas realiu laiku.', en: 'I quickly adapt to changes and adjust strategies in real-time.' } },
                { icon: TrendingUp, title: { lt: 'Rezultatai', en: 'Results' }, desc: { lt: 'Fokusuojuosi į ilgalaikį augimą, ne trumpalaikius sprogimus.', en: 'I focus on long-term growth, not short-term spikes.' } },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.3, ease: 'easeOut' }}
                  className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6"
                >
                  <item.icon size={24} className="sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title[language]}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{item.desc[language]}</p>
                </motion.div>
              ))}
            </div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mb-20"
            >
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
                {t('story.experience.title')}
              </h2>
              <div className="overflow-hidden">
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
                    'Meta Ads',
                    'Google Ads',
                    'Content Strategy',
                    'Social Media Marketing',
                    'Email Marketing',
                    'Analytics',
                    'Branding',
                    'Brand Identity Design',
                    'After Effects',
                  ].map((skill, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/50"
                    >
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary" />
                      {skill}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
