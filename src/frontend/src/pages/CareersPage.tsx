import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionReveal from '../components/SectionReveal';
import { useGetAllJobs, useSubmitJobApplication } from '../hooks/useQueries';
import { Briefcase, MapPin, DollarSign, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { JobPosting } from '../backend';

export default function CareersPage() {
  const { data: jobs, isLoading } = useGetAllJobs();
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const submitApplication = useSubmitJobApplication();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    message: '',
  });

  const handleApply = (job: JobPosting) => {
    setSelectedJob(job);
    setIsApplyDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    try {
      await submitApplication.mutateAsync({
        jobId: selectedJob.jobId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        resumeLink: formData.resumeLink,
        message: formData.message || undefined,
      });

      toast.success('Application submitted successfully!', {
        description: 'We will review your application and get back to you soon.',
      });

      setIsApplyDialogOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        resumeLink: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit application', {
        description: 'Please try again or contact us directly.',
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 mb-4">
                  Join Our Team
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Build Your Career in VLSI
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Join a team of passionate engineers working on cutting-edge semiconductor
                  projects. We offer competitive compensation, growth opportunities, and a
                  collaborative work environment.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/assets/generated/glitchip-careers-illustration.dim_1600x900.png"
                  alt="Careers"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our current openings and find the perfect role for your skills and
                aspirations
              </p>
            </div>
          </SectionReveal>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {jobs?.map((job) => (
                <SectionReveal key={job.jobId}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-2xl">{job.title}</CardTitle>
                        <Badge variant="secondary">Job ID: {job.jobId}</Badge>
                      </div>
                      <CardDescription className="text-base">
                        {job.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <DollarSign className="h-4 w-4 mr-2" />
                            <span className="font-semibold">Salary:</span>
                          </div>
                          <p className="text-sm ml-6">{job.salary}</p>
                        </div>

                        <div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <FileText className="h-4 w-4 mr-2" />
                            <span className="font-semibold">Key Responsibilities:</span>
                          </div>
                          <p className="text-sm ml-6 text-muted-foreground">
                            {job.responsibilities}
                          </p>
                        </div>

                        <Button
                          onClick={() => handleApply(job)}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Job ID: {selectedJob?.jobId} | Fill out the form below to submit your
              application
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
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
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 99999 99999"
                />
              </div>

              <div>
                <Label htmlFor="resumeLink">Resume Link *</Label>
                <Input
                  id="resumeLink"
                  type="url"
                  required
                  value={formData.resumeLink}
                  onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                  placeholder="https://drive.google.com/..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Please provide a link to your resume (Google Drive, Dropbox, etc.)
                </p>
              </div>

              <div>
                <Label htmlFor="message">Cover Letter / Additional Information</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us why you're a great fit for this role..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsApplyDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitApplication.isPending}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  {submitApplication.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
