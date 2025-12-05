"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, ArrowLeft, Clock, Video, Calendar, Check } from 'lucide-react';
import CalendlyWidget from '@/components/CalendlyWidget';

export default function BookCallPage() {
  const { t, language } = useLanguage();

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-primary">{t('bookCall.badge')}</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="font-display text-4xl md:text-6xl font-bold text-center mb-6"
            >
              <span className="italic">{t('bookCall.title').split('.')[0]}.</span>
              <br />
              <span className="text-gradient-gold">{t('bookCall.title').split('.')[1]}.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 text-lg"
            >
              {t('bookCall.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">
                What to Expect
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Clock, title: { lt: '30 Minučių', en: '30 Minutes' }, desc: { lt: 'Trumpas, bet informatyvus skambutis', en: 'Short but informative call' } },
                  { icon: Video, title: { lt: 'Video Skambutis', en: 'Video Call' }, desc: { lt: 'Asmeninis susitikimas per internetą', en: 'Personal meeting online' } },
                  { icon: Calendar, title: { lt: 'Lankstus Laikas', en: 'Flexible Time' }, desc: { lt: 'Pasirinkite jums patogų laiką', en: 'Choose a time that works for you' } },
                ].map((item, i) => (
                  <div key={i} className="text-center glass rounded-2xl p-6">
                    <item.icon size={32} className="text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">{item.title[language]}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc[language]}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What We'll Discuss */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mb-16"
            >
              <h2 className="font-display text-3xl font-bold mb-6">What We&apos;ll Discuss</h2>
              <div className="glass rounded-2xl p-8">
                <div className="space-y-4">
                  {[
                    { lt: 'Jūsų verslo tikslai ir iššūkiai', en: 'Your business goals and challenges' },
                    { lt: 'Dabartinė rinkodaros situacija', en: 'Current marketing situation' },
                    { lt: 'Galimos sprendimų kryptys', en: 'Possible solution directions' },
                    { lt: 'Tinkamiausias būdas dirbti kartu', en: 'Best way to work together' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{item[language]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
              className="text-center mb-12"
            >
              <Button
                size="lg"
                className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-border text-base px-8"
              >
                {t('bookCall.cta')}
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.3, duration: 0.3, ease: 'easeOut' }}
              className="flex justify-center gap-4 mb-16"
            >
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted transition-all duration-300"
                >
                  <social.icon size={20} className="text-muted-foreground" />
                </a>
              ))}
            </motion.div>

            {/* Calendly Widget */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.4, duration: 0.3, ease: 'easeOut' }}
            >
              <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl mx-auto overflow-hidden">
                <CalendlyWidget
                  url="https://calendly.com/michailinasmatas/30min?background_color=000000&text_color=ffffff&primary_color=4a6fa5"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
