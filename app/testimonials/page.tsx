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
import { Star, ArrowLeft, Quote, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: {
    lt: string;
    en: string;
  };
}

export default function TestimonialsPage() {
  const { language, t } = useLanguage();
  const isMobile = useIsMobile();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Limit testimonials: 2 on mobile, 6 on desktop
  const displayedTestimonials = isMobile ? testimonials.slice(0, 2) : testimonials.slice(0, 6);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
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
                <Link href="/">
                  <ArrowLeft size={16} className="mr-2" />
                  {t('cta.backToHome')}
                </Link>
              </Button>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
                {t('testimonials.title')}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {t('testimonials.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
                >
                  <Card className="h-full bg-card/50 border-border/50 hover-glow transition-all duration-300 hover:border-primary/50">
                    <CardContent className="p-6">
                      <Quote size={24} className="text-primary/70 mb-4" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-foreground mb-6 leading-relaxed">
                        &ldquo;{testimonial.text[language]}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
