"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Calendar, Users, Target, TrendingUp, Award } from 'lucide-react';
import { getProjectById } from '@/data/projects';

export default function GreenLifeGrowthPage() {
  const { language, t } = useLanguage();
  const project = getProjectById('greenlife-growth');

  if (!project) {
    return null;
  }

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
              className="mb-8"
            >
              <Button
                asChild
                variant="ghost"
                className="mb-8"
              >
                <Link href="/case-studies">
                  <ArrowLeft size={16} className="mr-2" />
                  {t('cta.backToHome')}
                </Link>
              </Button>
              <span className="inline-block px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground mb-4">
                {project.category[language]}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
                {project.title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mb-8">
                {project.description[language]}
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={18} />
                  <span className="text-sm">{project.timeline[language]}</span>
                </div>
                {project.client && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={18} />
                    <span className="text-sm">{project.client.name}</span>
                  </div>
                )}
              </div>
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
              className={`aspect-video bg-gradient-to-br ${project.gradient} rounded-2xl overflow-hidden relative`}
            >
              <div className="absolute inset-0 bg-card/30 flex items-center justify-center">
                <div className="text-6xl opacity-40">📊</div>
              </div>
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium">
                  {project.category[language]}
                </span>
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
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                {language === 'lt' ? 'Projekto apžvalga' : 'Project Overview'}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                {project.fullDescription[language]}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="text-destructive" size={24} />
                      <h3 className="font-display text-2xl font-bold">
                        {language === 'lt' ? 'Iššūkis' : 'Challenge'}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.challenge[language]}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle2 className="text-primary" size={24} />
                      <h3 className="font-display text-2xl font-bold">
                        {language === 'lt' ? 'Sprendimas' : 'Solution'}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.solution[language]}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {language === 'lt' ? 'Proceso etapai' : 'Process Steps'}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {language === 'lt' 
                  ? 'Struktūrizuotas metodas, kaip pasiekėme rezultatus'
                  : 'A structured approach to achieving results'}
              </p>
            </motion.div>

            <div className="space-y-6">
              {project.process.map((step, index) => (
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

        {/* Deliverables & Technologies */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Deliverables */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-display text-3xl font-bold mb-6">
                  {language === 'lt' ? 'Pristatyti produktai' : 'Deliverables'}
                </h2>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {project.deliverables[language].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={18} />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Technologies */}
              {project.technologies && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-3xl font-bold mb-6">
                    {language === 'lt' ? 'Naudotos technologijos' : 'Technologies Used'}
                  </h2>
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies[language].map((tech, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-primary" size={32} />
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
                  {language === 'lt' ? 'Rezultatai' : 'Results'}
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                {language === 'lt'
                  ? 'Konkrečūs matomi rezultatai ir metrikos'
                  : 'Concrete visible results and metrics'}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {project.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all h-full">
                    <CardContent className="p-6 text-center">
                      <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                      <p className="text-sm font-semibold mb-1">{stat.label}</p>
                      {stat.description && (
                        <p className="text-xs text-muted-foreground">{stat.description[language]}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {project.client?.testimonial && (
          <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <Award className="text-primary flex-shrink-0" size={32} />
                      <div>
                        <h3 className="font-display text-2xl font-bold mb-2">
                          {language === 'lt' ? 'Kliento atsiliepimas' : 'Client Testimonial'}
                        </h3>
                        <p className="text-muted-foreground font-medium">
                          {project.client.name}
                        </p>
                      </div>
                    </div>
                    <blockquote className="text-lg leading-relaxed text-foreground italic">
                      &ldquo;{project.client.testimonial[language]}&rdquo;
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {language === 'lt' ? 'Norite panašių rezultatų?' : 'Want Similar Results?'}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {language === 'lt'
                  ? 'Susisiekite su manimi ir aptarkime, kaip galiu padėti jūsų verslui augti'
                  : 'Get in touch and let\'s discuss how I can help your business grow'}
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
