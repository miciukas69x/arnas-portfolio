"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Image, Archive, File, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { DownloadableResource } from '@/data/resources';

const getFileIcon = (fileType: string) => {
  const type = fileType.toLowerCase();
  if (type === 'pdf') return FileText;
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(type)) return Image;
  if (['zip', 'rar', '7z'].includes(type)) return Archive;
  return File;
};

export default function ResourcesSection() {
  const { language, t } = useLanguage();
  const isMobile = useIsMobile();
  const [resources, setResources] = useState<DownloadableResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/resources');
        if (response.ok) {
          const data = await response.json();
          setResources(data);
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  // Show only first 2 resources on mobile, first 3 on desktop
  const displayedResources = isMobile ? resources.slice(0, 2) : resources.slice(0, 3);

  if (loading || displayedResources.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-border text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            ✦ {language === 'lt' ? 'Nemokami Ištekliai' : 'Free Resources'}
          </span>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-end">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                {t('resources.title')}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                {t('resources.subtitle')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedResources.map((resource, index) => {
            const FileIcon = getFileIcon(resource.fileType);
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.3, ease: 'easeOut' }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-all bg-card/50 border-border/50 hover:border-primary/50 group">
                  {resource.thumbnail && (
                    <div className="relative w-full h-32 sm:h-40 overflow-hidden rounded-t-lg">
                      <img
                        src={resource.thumbnail}
                        alt={resource.title[language]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20 flex-shrink-0">
                        <FileIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {resource.title[language]}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{resource.category[language]}</span>
                          <span>•</span>
                          <span>{resource.fileSize}</span>
                          <span>•</span>
                          <span>{resource.fileType}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pt-0">
                    <CardDescription className="text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      {resource.description[language]}
                    </CardDescription>
                    {resource.tags && resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                        {resource.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-auto group/btn"
                      onClick={() => {
                        const isExternalUrl = resource.fileUrl.startsWith('http://') || resource.fileUrl.startsWith('https://');
                        if (isExternalUrl) {
                          // Use download API route for external URLs (Supabase Storage)
                          const downloadUrl = `/api/download?url=${encodeURIComponent(resource.fileUrl)}&filename=${encodeURIComponent(resource.fileName)}`;
                          window.location.href = downloadUrl;
                        } else {
                          // Local file - direct download
                          const link = document.createElement('a');
                          link.href = resource.fileUrl;
                          link.download = resource.fileName;
                          link.click();
                        }
                      }}
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      {t('resources.download')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.3, duration: 0.3, ease: 'easeOut' }}
          className="mt-8 sm:mt-12 md:mt-16 text-center"
        >
          <Button
            asChild
            className="rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-border text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-3 min-h-[48px]"
          >
            <Link href="/resources">
              {t('cta.viewAll')}
              <ArrowRight size={14} className="sm:w-4 sm:h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

