"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import CalendlyWidget from '@/components/CalendlyWidget';

export default function BookCallSection() {
  const { t } = useLanguage();

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-primary">{t('bookCall.badge')}</span>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
          className="font-display text-4xl md:text-6xl font-bold text-center mb-6"
        >
          <span className="italic">{t('bookCall.title').split('.')[0]}.</span>
          <br />
          <span className="text-gradient-gold">{t('bookCall.title').split('.')[1]}.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-10"
        >
          {t('bookCall.subtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
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
          transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
          className="flex justify-center gap-4"
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
          className="mt-8 sm:mt-12 md:mt-16"
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
  );
}