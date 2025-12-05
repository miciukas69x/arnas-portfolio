"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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
import { ArrowLeft, Plus, X, Edit, Save, Trash2, Loader2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: {
    lt: string;
    en: string;
  };
}

function AdminTestimonialsPage() {
  const { language } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: { lt: '', en: '' },
  });
  const [saving, setSaving] = useState(false);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/testimonials');
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        alert(language === 'lt' ? 'Klaida įkeliant atsiliepimus' : 'Error loading testimonials');
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [language]);

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      text: { lt: '', en: '' },
    });
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setIsAdding(false);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      text: testimonial.text,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      text: { lt: '', en: '' },
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role || !formData.text.lt || !formData.text.en) {
      alert(language === 'lt' ? 'Užpildykite visus laukus' : 'Please fill all fields');
      return;
    }

    setSaving(true);
    try {
      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save testimonial');
      }

      // Refresh list
      const fetchResponse = await fetch('/api/testimonials');
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        setTestimonials(data);
      }

      handleCancel();
      alert(language === 'lt' ? 'Atsiliepimas išsaugotas' : 'Testimonial saved');
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert(language === 'lt' ? 'Klaida išsaugant atsiliepimą' : 'Error saving testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(language === 'lt' ? 'Ar tikrai norite ištrinti šį atsiliepimą?' : 'Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete testimonial');
      }

      // Refresh list
      const fetchResponse = await fetch('/api/testimonials');
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        setTestimonials(data);
      }

      alert(language === 'lt' ? 'Atsiliepimas ištrintas' : 'Testimonial deleted');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert(language === 'lt' ? 'Klaida trinant atsiliepimą' : 'Error deleting testimonial');
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="relative min-h-screen">
          <AnimatedBackground />
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="mb-6">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2 mb-4">
                <ArrowLeft className="h-4 w-4" />
                {language === 'lt' ? 'Atgal į valdymo skydą' : 'Back to Dashboard'}
              </Button>
            </Link>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                {language === 'lt' ? 'Atsiliepimų valdymas' : 'Manage Testimonials'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'lt' ? 'Tvarkykite klientų atsiliepimus' : 'Manage client testimonials'}
              </p>
            </div>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="h-4 w-4" />
              {language === 'lt' ? 'Pridėti atsiliepimą' : 'Add Testimonial'}
            </Button>
          </div>

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>
                    {editingId
                      ? language === 'lt' ? 'Redaguoti atsiliepimą' : 'Edit Testimonial'
                      : language === 'lt' ? 'Naujas atsiliepimas' : 'New Testimonial'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">
                      {language === 'lt' ? 'Vardas' : 'Name'} *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'lt' ? 'Jonas Kazlauskas' : 'John Doe'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">
                      {language === 'lt' ? 'Pareigos' : 'Role'} *
                    </Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder={language === 'lt' ? 'CEO, TechStart' : 'CEO, Company Name'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="text-lt">
                      {language === 'lt' ? 'Atsiliepimas (Lietuvių)' : 'Testimonial (Lithuanian)'} *
                    </Label>
                    <Textarea
                      id="text-lt"
                      value={formData.text.lt}
                      onChange={(e) => setFormData({ ...formData, text: { ...formData.text, lt: e.target.value } })}
                      placeholder={language === 'lt' ? 'Atsiliepimo tekstas lietuvių kalba...' : 'Testimonial text in Lithuanian...'}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="text-en">
                      {language === 'lt' ? 'Atsiliepimas (Anglų)' : 'Testimonial (English)'} *
                    </Label>
                    <Textarea
                      id="text-en"
                      value={formData.text.en}
                      onChange={(e) => setFormData({ ...formData, text: { ...formData.text, en: e.target.value } })}
                      placeholder={language === 'lt' ? 'Atsiliepimo tekstas anglų kalba...' : 'Testimonial text in English...'}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={saving} className="gap-2">
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {language === 'lt' ? 'Išsaugoma...' : 'Saving...'}
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          {language === 'lt' ? 'Išsaugoti' : 'Save'}
                        </>
                      )}
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="gap-2">
                      <X className="h-4 w-4" />
                      {language === 'lt' ? 'Atšaukti' : 'Cancel'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Testimonials List */}
          <div className="grid gap-4 sm:gap-6">
            {testimonials.length === 0 ? (
              <Card className="bg-card/50 border-border/50">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {language === 'lt' ? 'Nėra atsiliepimų' : 'No testimonials yet'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                          <CardDescription>{testimonial.role}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(testimonial)}
                            className="gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            {language === 'lt' ? 'Redaguoti' : 'Edit'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(testimonial.id)}
                            className="gap-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            {language === 'lt' ? 'Ištrinti' : 'Delete'}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {language === 'lt' ? 'Lietuvių kalba:' : 'Lithuanian:'}
                          </p>
                          <p className="text-sm">&ldquo;{testimonial.text.lt}&rdquo;</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {language === 'lt' ? 'Anglų kalba:' : 'English:'}
                          </p>
                          <p className="text-sm">&ldquo;{testimonial.text.en}&rdquo;</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

export default AdminTestimonialsPage;

