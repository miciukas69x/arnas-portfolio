"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Image, Archive, File, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import type { DownloadableResource } from '@/data/resources';

const getFileIcon = (fileType: string) => {
  const type = fileType.toLowerCase();
  if (type === 'pdf') return FileText;
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(type)) return Image;
  if (['zip', 'rar', '7z'].includes(type)) return Archive;
  return File;
};

const formatFileSize = (size: string) => size;

export default function ResourcesPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState<DownloadableResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/resources');
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources.filter((resource) => {
    const query = searchQuery.toLowerCase();
    return (
      resource.title[language].toLowerCase().includes(query) ||
      resource.description[language].toLowerCase().includes(query) ||
      resource.category[language].toLowerCase().includes(query) ||
      resource.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const handleDownload = async (resource: typeof resources[0]) => {
    try {
      // Check if it's a Supabase Storage URL (full URL) or local path
      const isExternalUrl = resource.fileUrl.startsWith('http://') || resource.fileUrl.startsWith('https://');
      
      if (isExternalUrl) {
        // Use download API route for external URLs (Supabase Storage)
        const downloadUrl = `/api/download?url=${encodeURIComponent(resource.fileUrl)}&filename=${encodeURIComponent(resource.fileName)}`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = resource.fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);
      } else {
        // Local file - use direct download
        const link = document.createElement('a');
        link.href = resource.fileUrl;
        link.download = resource.fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);
      }
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: try to open the file in a new tab
      window.open(resource.fileUrl, '_blank');
    }
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('resources.title')}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t('resources.subtitle')}
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 sm:mb-12 max-w-md mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
            <Input
              type="text"
              placeholder={t('resources.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 sm:pl-12 h-10 sm:h-12"
            />
          </div>
        </motion.div>

        {/* Resources Grid */}
        {loading ? (
          <div className="text-center py-12 sm:py-16">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">{t('resources.loading') || 'Loading...'}</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <p className="text-muted-foreground text-base sm:text-lg">
              {searchQuery ? t('resources.noResults') : t('resources.empty')}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredResources.map((resource, index) => {
              const FileIcon = getFileIcon(resource.fileType);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow bg-card/50 border-border/50">
                    {resource.thumbnail && (
                      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={resource.thumbnail}
                          alt={resource.title[language]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <FileIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg sm:text-xl mb-1 line-clamp-2">
                            {resource.title[language]}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <span>{resource.category[language]}</span>
                            <span>•</span>
                            <span>{formatFileSize(resource.fileSize)}</span>
                            <span>•</span>
                            <span>{resource.fileType}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <CardDescription className="text-sm sm:text-base mb-4 line-clamp-3">
                        {resource.description[language]}
                      </CardDescription>
                      {resource.tags && resource.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {resource.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <Button
                        onClick={() => handleDownload(resource)}
                        className="w-full mt-auto"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {t('resources.download')}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

