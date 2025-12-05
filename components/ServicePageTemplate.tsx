"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, TrendingUp, Award, DollarSign } from 'lucide-react';
import { Service } from '@/data/services';

interface ServicePageTemplateProps {
  service: Service;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const { language, t } = useLanguage();

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
                <Link href="/services">
                  <ArrowLeft size={16} className="mr-2" />
                  {t('cta.backToHome')}
                </Link>
              </Button>
              <div className="flex items-center gap-2 sm:gap-4 mb-4">
                <div className="p-2 sm:p-3 rounded-lg bg-muted">
                  <service.icon size={24} className="sm:w-8 sm:h-8 text-primary" />
                </div>
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-border text-xs sm:text-sm text-muted-foreground">
                  {t('services.badge')}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
                {t(service.titleKey)}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mb-6 sm:mb-8">
                {t(service.descKey)}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`aspect-video bg-gradient-to-br ${service.gradient} rounded-xl sm:rounded-2xl overflow-hidden relative`}
            >
              <div className="absolute inset-0 bg-card/30 flex items-center justify-center">
                <service.icon size={60} className="sm:w-20 sm:h-20 opacity-40" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                {language === 'lt' ? 'Apie paslaugą' : 'About This Service'}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
                {service.overview[language]}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <TrendingUp className="text-primary w-6 h-6 sm:w-8 sm:h-8" />
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
                  {language === 'lt' ? 'Nauda' : 'Benefits'}
                </h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                {language === 'lt'
                  ? 'Ką gausite pasirinkę šią paslaugą'
                  : 'What you\'ll get from choosing this service'}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {service.benefits[language].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card className="bg-card/50 border-border/50 h-full">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0 w-4.5 h-4.5 sm:w-5 sm:h-5" />
                        <p className="text-foreground text-sm sm:text-base leading-relaxed">{benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {language === 'lt' ? 'Proceso etapai' : 'Process Steps'}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {language === 'lt' 
                  ? 'Kaip dirbame su jumis'
                  : 'How we work with you'}
              </p>
            </motion.div>

            <div className="space-y-6">
              {service.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-bold mb-2">
                            {step.title[language]}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description[language]}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-primary" size={32} />
                <h2 className="font-display text-3xl font-bold">
                  {language === 'lt' ? 'Ką gausite' : 'What You\'ll Get'}
                </h2>
              </div>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-8">
                  <ul className="grid md:grid-cols-2 gap-4">
                    {service.deliverables[language].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        {service.pricing && (
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-card/50 border-border/50 border-primary/40">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <DollarSign className="text-primary flex-shrink-0" size={32} />
                      <div className="flex-1">
                        <h2 className="font-display text-3xl font-bold mb-4">
                          {language === 'lt' ? 'Kainos' : 'Pricing'}
                        </h2>
                        <p className="text-2xl font-semibold text-primary mb-2">
                          {service.pricing[language]}
                        </p>
                        <p className="text-muted-foreground">
                          {language === 'lt'
                            ? 'Kainos gali skirtis priklausomai nuo projekto apimties ir sudėtingumo'
                            : 'Prices may vary depending on project scope and complexity'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {language === 'lt' ? 'Pradėkime dirbti kartu' : 'Let\'s Work Together'}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {language === 'lt'
                  ? 'Susisiekite su manimi ir aptarkime jūsų projektą'
                  : 'Get in touch and let\'s discuss your project'}
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-border"
              >
                <Link href="/book-call">
                  {language === 'lt' ? 'Susitikti' : 'Book a Call'}
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

