"use client";

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Save, Upload as UploadIcon, File, Loader2, ArrowLeft, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProtectedRoute from '@/components/ProtectedRoute';
import type { DownloadableResource } from '@/data/resources';

function AdminResourcesPage() {
  const { language } = useLanguage();
  const [localResources, setLocalResources] = useState<DownloadableResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<DownloadableResource>>({
    id: '',
    title: { lt: '', en: '' },
    description: { lt: '', en: '' },
    fileUrl: '',
    fileName: '',
    fileSize: '',
    fileType: '',
    category: { lt: '', en: '' },
    tags: [],
    createdAt: new Date().toISOString(),
  });
  const [tagInput, setTagInput] = useState('');

  // Fetch resources from API
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/resources');
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        setLocalResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
        alert(language === 'lt' ? 'Klaida įkeliant išteklius' : 'Error loading resources');
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [language]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toUpperCase() || 'FILE';
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      // Auto-fill form with uploaded file info
      setFormData({
        ...formData,
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        fileSize: formatFileSize(data.fileSize),
        fileType: getFileExtension(data.fileName),
      });

      alert(language === 'lt' ? 'Failas sėkmingai įkeltas!' : 'File uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert(language === 'lt' ? 'Klaida įkeliant failą' : 'Error uploading file');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddResource = async () => {
    if (
      !formData.id ||
      !formData.title?.lt ||
      !formData.title?.en ||
      !formData.fileUrl ||
      !formData.fileName
    ) {
      alert(language === 'lt' ? 'Užpildykite visus privalomus laukus' : 'Please fill all required fields');
      return;
    }

    const newResource: DownloadableResource = {
      id: formData.id,
      title: formData.title as { lt: string; en: string },
      description: formData.description || { lt: '', en: '' },
      fileUrl: formData.fileUrl,
      fileName: formData.fileName,
      fileSize: formData.fileSize || '0 MB',
      fileType: formData.fileType || 'PDF',
      category: formData.category || { lt: '', en: '' },
      thumbnail: formData.thumbnail,
      tags: formData.tags || [],
      createdAt: formData.createdAt || new Date().toISOString(),
    };

    try {
      const url = editingId ? `/api/resources/${editingId}` : '/api/resources';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResource),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save resource');
      }

      // Refresh resources from API
      const fetchResponse = await fetch('/api/resources');
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        setLocalResources(data);
      }

      resetForm();
      alert(language === 'lt' ? 'Išteklys išsaugotas!' : 'Resource saved!');
    } catch (error) {
      console.error('Error saving resource:', error);
      alert(language === 'lt' ? 'Klaida išsaugant ištekį' : 'Error saving resource');
    }
  };

  const handleEditResource = (resource: DownloadableResource) => {
    setFormData(resource);
    setEditingId(resource.id);
    setIsAdding(true);
  };

  const handleRemoveResource = async (id: string) => {
    if (!confirm(language === 'lt' ? 'Ar tikrai norite pašalinti šį ištekį?' : 'Are you sure you want to remove this resource?')) {
      return;
    }

    try {
      const response = await fetch(`/api/resources/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Delete error response:', errorData);
        throw new Error(errorData.error || `Failed to delete resource: ${response.status}`);
      }

      // Refresh resources from API
      const fetchResponse = await fetch('/api/resources');
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        setLocalResources(data);
        alert(language === 'lt' ? 'Išteklys pašalintas!' : 'Resource removed!');
      } else {
        throw new Error('Failed to refresh resources list');
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert(language === 'lt' 
        ? `Klaida šalinant ištekį: ${error instanceof Error ? error.message : 'Nežinoma klaida'}` 
        : `Error deleting resource: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: { lt: '', en: '' },
      description: { lt: '', en: '' },
      fileUrl: '',
      fileName: '',
      fileSize: '',
      fileType: '',
      category: { lt: '', en: '' },
      tags: [],
      createdAt: new Date().toISOString(),
    });
    setTagInput('');
    setIsAdding(false);
    setEditingId(null);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag),
    });
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-6">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {language === 'lt' ? 'Atgal į Valdymo Skydelį' : 'Back to Dashboard'}
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                {language === 'lt' ? 'Išteklių Valdymas' : 'Resource Management'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'lt'
                  ? 'Pridėkite ir valdykite nemokamus išteklius'
                  : 'Add and manage free resources'}
              </p>
            </div>
                    <Button onClick={() => {
              if (isAdding && editingId) {
                resetForm();
              } else {
                setIsAdding(!isAdding);
              }
            }}>
              <Plus className="h-4 w-4 mr-2" />
              {language === 'lt' ? 'Pridėti' : 'Add'}
            </Button>
          </div>

          {/* Add Resource Form */}
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>
                    {editingId
                      ? language === 'lt' ? 'Redaguoti Ištekį' : 'Edit Resource'
                      : language === 'lt' ? 'Pridėti Naują Ištekį' : 'Add New Resource'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'lt'
                      ? 'Užpildykite informaciją apie ištekį'
                      : 'Fill in the resource information'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="id">
                        {language === 'lt' ? 'ID' : 'ID'} *
                      </Label>
                      <Input
                        id="id"
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        placeholder="example-resource-1"
                        disabled={!!editingId}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fileUpload">
                        {language === 'lt' ? 'Įkelti Failą' : 'Upload File'} *
                      </Label>
                      <div className="space-y-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="fileUpload"
                          onChange={handleFileUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="w-full"
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              {language === 'lt' ? 'Įkeliama...' : 'Uploading...'} {uploadProgress}%
                            </>
                          ) : (
                            <>
                              <UploadIcon className="h-4 w-4 mr-2" />
                              {language === 'lt' ? 'Pasirinkti Failą' : 'Choose File'}
                            </>
                          )}
                        </Button>
                        {formData.fileName && (
                          <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                            <File className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{formData.fileName}</span>
                            {formData.fileSize && (
                              <span className="text-xs text-muted-foreground ml-auto">({formData.fileSize})</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {formData.fileUrl && (
                      <>
                        <div>
                          <Label>
                            {language === 'lt' ? 'Failo URL' : 'File URL'}
                          </Label>
                          <Input
                            value={formData.fileUrl}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                        <div>
                          <Label>
                            {language === 'lt' ? 'Failo Tipas' : 'File Type'}
                          </Label>
                          <Input
                            value={formData.fileType}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                      </>
                    )}
                    <div>
                      <Label htmlFor="thumbnail">
                        {language === 'lt' ? 'Miniatiūra (URL)' : 'Thumbnail (URL)'}
                      </Label>
                      <Input
                        id="thumbnail"
                        value={formData.thumbnail || ''}
                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        placeholder="/images/thumbnail.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title-lt">
                      {language === 'lt' ? 'Pavadinimas (LT)' : 'Title (LT)'} *
                    </Label>
                    <Input
                      id="title-lt"
                      value={formData.title?.lt || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: { ...formData.title, lt: e.target.value } as { lt: string; en: string },
                        })
                      }
                      placeholder="Pavyzdinis šablonas"
                    />
                  </div>

                  <div>
                    <Label htmlFor="title-en">
                      {language === 'lt' ? 'Pavadinimas (EN)' : 'Title (EN)'} *
                    </Label>
                    <Input
                      id="title-en"
                      value={formData.title?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: { ...formData.title, en: e.target.value } as { lt: string; en: string },
                        })
                      }
                      placeholder="Example Template"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description-lt">
                      {language === 'lt' ? 'Aprašymas (LT)' : 'Description (LT)'}
                    </Label>
                    <Textarea
                      id="description-lt"
                      value={formData.description?.lt || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: { ...formData.description, lt: e.target.value } as { lt: string; en: string },
                        })
                      }
                      placeholder="Nemokamas šablonas jūsų projektams"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description-en">
                      {language === 'lt' ? 'Aprašymas (EN)' : 'Description (EN)'}
                    </Label>
                    <Textarea
                      id="description-en"
                      value={formData.description?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: { ...formData.description, en: e.target.value } as { lt: string; en: string },
                        })
                      }
                      placeholder="Free template for your projects"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category-lt">
                        {language === 'lt' ? 'Kategorija (LT)' : 'Category (LT)'}
                      </Label>
                      <Input
                        id="category-lt"
                        value={formData.category?.lt || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: { ...formData.category, lt: e.target.value } as { lt: string; en: string },
                          })
                        }
                        placeholder="Šablonai"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-en">
                        {language === 'lt' ? 'Kategorija (EN)' : 'Category (EN)'}
                      </Label>
                      <Input
                        id="category-en"
                        value={formData.category?.en || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: { ...formData.category, en: e.target.value } as { lt: string; en: string },
                          })
                        }
                        placeholder="Templates"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tags">
                      {language === 'lt' ? 'Žymės' : 'Tags'}
                    </Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder={language === 'lt' ? 'Pridėti žymę' : 'Add tag'}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.tags && formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddResource} className="flex-1" disabled={uploading}>
                      <Save className="h-4 w-4 mr-2" />
                      {language === 'lt' ? 'Išsaugoti' : 'Save'}
                    </Button>
                    <Button onClick={resetForm} variant="outline" disabled={uploading}>
                      {language === 'lt' ? 'Atšaukti' : 'Cancel'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Resources List */}
          <div className="space-y-4">
            {loading ? (
              <Card className="bg-card/50 border-border/50">
                <CardContent className="py-12 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'lt' ? 'Įkeliama...' : 'Loading...'}
                  </p>
                </CardContent>
              </Card>
            ) : localResources.length === 0 ? (
              <Card className="bg-card/50 border-border/50">
                <CardContent className="py-12 text-center text-muted-foreground">
                  {language === 'lt' ? 'Išteklių nėra' : 'No resources'}
                </CardContent>
              </Card>
            ) : (
              localResources.map((resource) => (
                <Card key={resource.id} className="bg-card/50 border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl mb-2">
                          {resource.title[language]}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                          {resource.description[language]}
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-muted-foreground">
                          <span>{resource.category[language]}</span>
                          <span>•</span>
                          <span>{resource.fileSize}</span>
                          <span>•</span>
                          <span>{resource.fileType}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditResource(resource)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {language === 'lt' ? 'Redaguoti' : 'Edit'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveResource(resource.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default function AdminResourcesPageWrapper() {
  return (
    <ProtectedRoute>
      <AdminResourcesPage />
    </ProtectedRoute>
  );
}
