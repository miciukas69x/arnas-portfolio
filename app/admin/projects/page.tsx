"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { type Project } from '@/data/projects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ArrowLeft, Plus, X, Edit, ExternalLink, Save, Trash2, Loader2 } from 'lucide-react';

function AdminProjectsPage() {
  const { language } = useLanguage();
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    id: '',
    title: '',
    category: { lt: '', en: '' },
    description: { lt: '', en: '' },
    fullDescription: { lt: '', en: '' },
    challenge: { lt: '', en: '' },
    solution: { lt: '', en: '' },
    process: [],
    deliverables: { lt: [], en: [] },
    technologies: { lt: [], en: [] },
    timeline: { lt: '', en: '' },
    client: { name: '' },
    stats: [],
    gradient: 'from-blue-500 to-purple-600',
  });
  const [processStep, setProcessStep] = useState({ title: { lt: '', en: '' }, description: { lt: '', en: '' } });
  const [deliverableInput, setDeliverableInput] = useState({ lt: '', en: '' });
  const [techInput, setTechInput] = useState({ lt: '', en: '' });
  const [statInput, setStatInput] = useState({ label: '', value: '', description: { lt: '', en: '' } });

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setLocalProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        alert(language === 'lt' ? 'Klaida įkeliant projektus' : 'Error loading projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [language]);

  const handleAddProject = async () => {
    if (!formData.id || !formData.title) {
      alert(language === 'lt' ? 'Užpildykite visus privalomus laukus' : 'Please fill all required fields');
      return;
    }

    const newProject: Project = {
      id: formData.id,
      title: formData.title,
      category: formData.category || { lt: '', en: '' },
      description: formData.description || { lt: '', en: '' },
      fullDescription: formData.fullDescription || { lt: '', en: '' },
      challenge: formData.challenge || { lt: '', en: '' },
      solution: formData.solution || { lt: '', en: '' },
      process: formData.process || [],
      deliverables: formData.deliverables || { lt: [], en: [] },
      technologies: formData.technologies,
      timeline: formData.timeline || { lt: '', en: '' },
      client: formData.client,
      stats: formData.stats || [],
      gradient: formData.gradient || 'from-blue-500 to-purple-600',
    };

    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save project');
      }

      // Refresh projects from API
      const fetchResponse = await fetch('/api/projects');
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        setLocalProjects(data);
      }

      resetForm();
      alert(language === 'lt' ? 'Projektas išsaugotas!' : 'Project saved!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert(language === 'lt' ? 'Klaida išsaugant projektą' : 'Error saving project');
    }
  };

  const handleEditProject = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleRemoveProject = async (id: string) => {
    if (!confirm(language === 'lt' ? 'Ar tikrai norite pašalinti šį projektą?' : 'Are you sure you want to remove this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Failed to delete project: ${response.status}`);
      }

      // Refresh projects from API
      const fetchResponse = await fetch('/api/projects');
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        setLocalProjects(data);
        alert(language === 'lt' ? 'Projektas pašalintas!' : 'Project removed!');
      } else {
        throw new Error('Failed to refresh projects list');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert(language === 'lt' 
        ? `Klaida šalinant projektą: ${error instanceof Error ? error.message : 'Nežinoma klaida'}` 
        : `Error deleting project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      category: { lt: '', en: '' },
      description: { lt: '', en: '' },
      fullDescription: { lt: '', en: '' },
      challenge: { lt: '', en: '' },
      solution: { lt: '', en: '' },
      process: [],
      deliverables: { lt: [], en: [] },
      technologies: { lt: [], en: [] },
      timeline: { lt: '', en: '' },
      client: { name: '' },
      stats: [],
      gradient: 'from-blue-500 to-purple-600',
    });
    setProcessStep({ title: { lt: '', en: '' }, description: { lt: '', en: '' } });
    setDeliverableInput({ lt: '', en: '' });
    setTechInput({ lt: '', en: '' });
    setStatInput({ label: '', value: '', description: { lt: '', en: '' } });
    setIsAdding(false);
    setEditingId(null);
  };

  const addProcessStep = () => {
    if (processStep.title.lt || processStep.title.en) {
      setFormData({
        ...formData,
        process: [...(formData.process || []), processStep],
      });
      setProcessStep({ title: { lt: '', en: '' }, description: { lt: '', en: '' } });
    }
  };

  const removeProcessStep = (index: number) => {
    setFormData({
      ...formData,
      process: formData.process?.filter((_, i) => i !== index) || [],
    });
  };

  const addDeliverable = () => {
    if (deliverableInput.lt || deliverableInput.en) {
      setFormData({
        ...formData,
        deliverables: {
          lt: [...(formData.deliverables?.lt || []), deliverableInput.lt],
          en: [...(formData.deliverables?.en || []), deliverableInput.en],
        },
      });
      setDeliverableInput({ lt: '', en: '' });
    }
  };

  const removeDeliverable = (index: number) => {
    setFormData({
      ...formData,
      deliverables: {
        lt: formData.deliverables?.lt.filter((_, i) => i !== index) || [],
        en: formData.deliverables?.en.filter((_, i) => i !== index) || [],
      },
    });
  };

  const addTechnology = () => {
    if (techInput.lt || techInput.en) {
      setFormData({
        ...formData,
        technologies: {
          lt: [...(formData.technologies?.lt || []), techInput.lt],
          en: [...(formData.technologies?.en || []), techInput.en],
        },
      });
      setTechInput({ lt: '', en: '' });
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: {
        lt: formData.technologies?.lt.filter((_, i) => i !== index) || [],
        en: formData.technologies?.en.filter((_, i) => i !== index) || [],
      },
    });
  };

  const addStat = () => {
    if (statInput.label && statInput.value) {
      setFormData({
        ...formData,
        stats: [...(formData.stats || []), statInput],
      });
      setStatInput({ label: '', value: '', description: { lt: '', en: '' } });
    }
  };

  const removeStat = (index: number) => {
    setFormData({
      ...formData,
      stats: formData.stats?.filter((_, i) => i !== index) || [],
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
                {language === 'lt' ? 'Projektų Valdymas' : 'Projects Management'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'lt'
                  ? 'Valdykite projektus ir case studies'
                  : 'Manage projects and case studies'}
              </p>
            </div>
            <Button onClick={() => setIsAdding(!isAdding)}>
              <Plus className="h-4 w-4 mr-2" />
              {language === 'lt' ? 'Pridėti' : 'Add'}
            </Button>
          </div>

          {/* Add/Edit Form */}
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8"
            >
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>
                    {editingId
                      ? language === 'lt' ? 'Redaguoti Projektą' : 'Edit Project'
                      : language === 'lt' ? 'Pridėti Naują Projektą' : 'Add New Project'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>ID *</Label>
                      <Input
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        placeholder="techstart-rebrand"
                        disabled={!!editingId}
                      />
                    </div>
                    <div>
                      <Label>Title *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="TechStart Rebrand"
                      />
                    </div>
                    <div>
                      <Label>Category (LT)</Label>
                      <Input
                        value={formData.category?.lt || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: { ...formData.category, lt: e.target.value } as { lt: string; en: string },
                          })
                        }
                        placeholder="Prekės Ženklas"
                      />
                    </div>
                    <div>
                      <Label>Category (EN)</Label>
                      <Input
                        value={formData.category?.en || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: { ...formData.category, en: e.target.value } as { lt: string; en: string },
                          })
                        }
                        placeholder="Branding"
                      />
                    </div>
                    <div>
                      <Label>Gradient</Label>
                      <Input
                        value={formData.gradient}
                        onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                        placeholder="from-blue-500 to-purple-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description (LT)</Label>
                    <Textarea
                      value={formData.description?.lt || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: { ...formData.description, lt: e.target.value } as { lt: string; en: string },
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Description (EN)</Label>
                    <Textarea
                      value={formData.description?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: { ...formData.description, en: e.target.value } as { lt: string; en: string },
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Full Description (LT)</Label>
                    <Textarea
                      value={formData.fullDescription?.lt || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullDescription: { ...formData.fullDescription, lt: e.target.value } as { lt: string; en: string },
                        })
                      }
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Full Description (EN)</Label>
                    <Textarea
                      value={formData.fullDescription?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullDescription: { ...formData.fullDescription, en: e.target.value } as { lt: string; en: string },
                        })
                      }
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Challenge (LT)</Label>
                    <Textarea
                      value={formData.challenge?.lt || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          challenge: { ...formData.challenge, lt: e.target.value } as { lt: string; en: string },
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Challenge (EN)</Label>
                    <Textarea
                      value={formData.challenge?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          challenge: { ...formData.challenge, en: e.target.value } as { lt: string; en: string },
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Solution (LT)</Label>
                    <Textarea
                      value={formData.solution?.lt || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          solution: { ...formData.solution, lt: e.target.value } as { lt: string; en: string },
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Solution (EN)</Label>
                    <Textarea
                      value={formData.solution?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          solution: { ...formData.solution, en: e.target.value } as { lt: string; en: string },
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Timeline (LT)</Label>
                    <Input
                      value={formData.timeline?.lt || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timeline: { ...formData.timeline, lt: e.target.value } as { lt: string; en: string },
                        })
                      }
                      placeholder="6 mėnesiai"
                    />
                  </div>
                  <div>
                    <Label>Timeline (EN)</Label>
                    <Input
                      value={formData.timeline?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timeline: { ...formData.timeline, en: e.target.value } as { lt: string; en: string },
                        })
                      }
                      placeholder="6 months"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Client Name</Label>
                      <Input
                        value={formData.client?.name || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            client: { ...formData.client, name: e.target.value },
                          })
                        }
                        placeholder="TechStart Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Client Testimonial (LT)</Label>
                    <Textarea
                      value={formData.client?.testimonial?.lt || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          client: {
                            ...formData.client,
                            testimonial: { ...formData.client?.testimonial, lt: e.target.value } as { lt: string; en: string },
                          },
                        })
                      }
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Client Testimonial (EN)</Label>
                    <Textarea
                      value={formData.client?.testimonial?.en || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          client: {
                            ...formData.client,
                            testimonial: { ...formData.client?.testimonial, en: e.target.value } as { lt: string; en: string },
                          },
                        })
                      }
                      rows={2}
                    />
                  </div>

                  {/* Process Steps */}
                  <div>
                    <Label>Process Steps</Label>
                    <div className="space-y-2 mb-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Input
                          placeholder="Step title (LT)"
                          value={processStep.title.lt}
                          onChange={(e) => setProcessStep({ ...processStep, title: { ...processStep.title, lt: e.target.value } })}
                        />
                        <Input
                          placeholder="Step title (EN)"
                          value={processStep.title.en}
                          onChange={(e) => setProcessStep({ ...processStep, title: { ...processStep.title, en: e.target.value } })}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Textarea
                          placeholder="Step description (LT)"
                          value={processStep.description.lt}
                          onChange={(e) => setProcessStep({ ...processStep, description: { ...processStep.description, lt: e.target.value } })}
                          rows={2}
                        />
                        <Textarea
                          placeholder="Step description (EN)"
                          value={processStep.description.en}
                          onChange={(e) => setProcessStep({ ...processStep, description: { ...processStep.description, en: e.target.value } })}
                          rows={2}
                        />
                      </div>
                      <Button type="button" onClick={addProcessStep} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Step
                      </Button>
                    </div>
                    {formData.process && formData.process.length > 0 && (
                      <div className="space-y-2">
                        {formData.process.map((step, index) => (
                          <div key={index} className="p-3 bg-muted rounded-lg flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{step.title[language]}</p>
                              <p className="text-xs text-muted-foreground">{step.description[language]}</p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProcessStep(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Deliverables */}
                  <div>
                    <Label>Deliverables</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                      <Input
                        placeholder="Deliverable (LT)"
                        value={deliverableInput.lt}
                        onChange={(e) => setDeliverableInput({ ...deliverableInput, lt: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <Input
                          placeholder="Deliverable (EN)"
                          value={deliverableInput.en}
                          onChange={(e) => setDeliverableInput({ ...deliverableInput, en: e.target.value })}
                        />
                        <Button type="button" onClick={addDeliverable} variant="outline" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {formData.deliverables && (formData.deliverables.lt.length > 0 || formData.deliverables.en.length > 0) && (
                      <div className="space-y-2">
                        {formData.deliverables[language].map((item, index) => (
                          <div key={index} className="p-2 bg-muted rounded flex items-center justify-between">
                            <span className="text-sm">{item}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDeliverable(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Technologies */}
                  <div>
                    <Label>Technologies (Optional)</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                      <Input
                        placeholder="Technology (LT)"
                        value={techInput.lt}
                        onChange={(e) => setTechInput({ ...techInput, lt: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <Input
                          placeholder="Technology (EN)"
                          value={techInput.en}
                          onChange={(e) => setTechInput({ ...techInput, en: e.target.value })}
                        />
                        <Button type="button" onClick={addTechnology} variant="outline" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {formData.technologies && (formData.technologies.lt.length > 0 || formData.technologies.en.length > 0) && (
                      <div className="space-y-2">
                        {formData.technologies[language].map((item, index) => (
                          <div key={index} className="p-2 bg-muted rounded flex items-center justify-between">
                            <span className="text-sm">{item}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTechnology(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div>
                    <Label>Stats</Label>
                    <div className="space-y-2 mb-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Input
                          placeholder="Stat label"
                          value={statInput.label}
                          onChange={(e) => setStatInput({ ...statInput, label: e.target.value })}
                        />
                        <Input
                          placeholder="Stat value"
                          value={statInput.value}
                          onChange={(e) => setStatInput({ ...statInput, value: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Input
                          placeholder="Description (LT)"
                          value={statInput.description.lt}
                          onChange={(e) => setStatInput({ ...statInput, description: { ...statInput.description, lt: e.target.value } })}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Description (EN)"
                            value={statInput.description.en}
                            onChange={(e) => setStatInput({ ...statInput, description: { ...statInput.description, en: e.target.value } })}
                          />
                          <Button type="button" onClick={addStat} variant="outline" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {formData.stats && formData.stats.length > 0 && (
                      <div className="space-y-2">
                        {formData.stats.map((stat, index) => (
                          <div key={index} className="p-2 bg-muted rounded flex items-center justify-between">
                            <div>
                              <span className="text-sm font-medium">{stat.label}: {stat.value}</span>
                              {stat.description && (
                                <p className="text-xs text-muted-foreground">{stat.description[language]}</p>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStat(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddProject} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      {language === 'lt' ? 'Išsaugoti' : 'Save'}
                    </Button>
                    <Button onClick={resetForm} variant="outline">
                      {language === 'lt' ? 'Atšaukti' : 'Cancel'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Projects List */}
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
            ) : localProjects.length === 0 ? (
              <Card className="bg-card/50 border-border/50">
                <CardContent className="py-12 text-center text-muted-foreground">
                  {language === 'lt' ? 'Projektų nėra' : 'No projects'}
                </CardContent>
              </Card>
            ) : (
              localProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 border-border/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg sm:text-xl">
                              {project.title}
                            </CardTitle>
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                              {project.category[language]}
                            </span>
                          </div>
                          <CardDescription className="text-sm sm:text-base">
                            {project.description[language]}
                          </CardDescription>
                          <div className="flex items-center gap-4 mt-3 text-xs sm:text-sm text-muted-foreground">
                            <span>{project.timeline[language]}</span>
                            {project.client && (
                              <>
                                <span>•</span>
                                <span>{project.client.name}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/projects/${project.id}`} target="_blank">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {language === 'lt' ? 'Peržiūrėti' : 'View'}
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProject(project)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            {language === 'lt' ? 'Redaguoti' : 'Edit'}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveProject(project.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default function AdminProjectsPageWrapper() {
  return (
    <ProtectedRoute>
      <AdminProjectsPage />
    </ProtectedRoute>
  );
}
