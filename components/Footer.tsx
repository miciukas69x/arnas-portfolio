"use client";

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();

  const navItems = [
    { href: '/story', label: t('nav.story') },
    { href: '/testimonials', label: t('nav.testimonials') },
    { href: '/case-studies', label: t('nav.caseStudies') },
    { href: '/services', label: t('nav.services') },
    { href: '/resources', label: t('nav.resources') },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h2 className="font-display text-2xl font-bold text-foreground">
                A<span className="text-primary">rnas</span>
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'lt'
                ? 'Skaitmeninė rinkodara ir prekės ženklo dizainas, kuris veikia.'
                : 'Digital marketing and brand design that works.'}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href="mailto:info@arnas.lt"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                info@arnas.lt
              </a>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              {language === 'lt' ? 'Navigacija' : 'Navigation'}
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              {language === 'lt' ? 'Paslaugos' : 'Services'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/branding"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('services.branding.title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/meta-ads"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('services.metaAds.title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/google-ads"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('services.googleAds.title')}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/consulting"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('services.consulting.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              {language === 'lt' ? 'Susisiekite' : 'Get In Touch'}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {language === 'lt'
                ? 'Pasiruošęs pradėti? Rezervuok nemokamą skambutį ir aptarkime jūsų projektą.'
                : 'Ready to get started? Book a free call and let\'s discuss your project.'}
            </p>
            <Button
              asChild
              className="rounded-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-border w-full sm:w-auto"
            >
              <Link href="/book-call">{t('nav.bookCall')}</Link>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} Arnas. {t('footer.rights')}.
            </p>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}