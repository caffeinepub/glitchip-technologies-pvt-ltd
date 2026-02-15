import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SectionReveal from '../components/SectionReveal';
import { useSubmitContactForm, useGetCompanyContacts } from '../hooks/useQueries';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const submitContactForm = useSubmitContactForm();
  const { data: companyContacts } = useGetCompanyContacts();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitContactForm.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        message: formData.message,
      });

      toast.success('Message sent successfully!', {
        description: 'We will get back to you within 24 hours.',
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again or contact us directly via email.',
      });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-24 md:py-32">
        <div className="absolute inset-0 opacity-5">
          <img
            src="/assets/generated/glitchip-circuit-pattern.dim_2048x2048.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 mb-4">
                Get in Touch
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Start a Conversation</h1>
              <p className="text-xl text-muted-foreground">
                Have a project in mind? Want to learn more about our services? We'd love to hear
                from you.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <SectionReveal>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your Company Name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project or inquiry..."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitContactForm.isPending}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      {submitContactForm.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </SectionReveal>

            {/* Contact Information */}
            <SectionReveal>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Reach out to us directly through any of these channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href={`mailto:${companyContacts?.email || 'hr@glitchip.in'}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {companyContacts?.email || 'hr@glitchip.in'}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a
                          href={`tel:${companyContacts?.phone || '+919999999999'}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {companyContacts?.phone || '+91 99 9999 9999'}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-muted-foreground">
                          {companyContacts?.address || 'Bengaluru, India'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Business Hours</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Monday - Friday: 9:00 AM - 6:00 PM IST
                      <br />
                      Saturday: 10:00 AM - 2:00 PM IST
                      <br />
                      Sunday: Closed
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
