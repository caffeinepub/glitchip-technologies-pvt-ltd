import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SectionReveal from '../components/SectionReveal';
import { useGetAllJobs, useSubmitJobApplication } from '../hooks/useQueries';
import { Loader2, Plus, X, AlertCircle, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';
import type { JobPosting, EducationEntry, WorkExperience } from '../backend';
import { ExternalBlob } from '../backend';
import { isValidJobId } from '../utils/jobId';

interface EducationFormEntry {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
}

interface WorkExperienceFormEntry {
  companyName: string;
  position: string;
  startYear: string;
  endYear: string;
  description: string;
}

export default function CareersPage() {
  const { data: jobs, isLoading, isError, error } = useGetAllJobs();
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const submitApplication = useSubmitJobApplication();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    currentLocation: '',
    expectedPay: '',
    collegeUniversityName: '',
    passoutYear: '',
    totalWorkExperience: '',
    message: '',
    termsAccepted: false,
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [education, setEducation] = useState<EducationFormEntry[]>([
    {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
    },
  ]);

  const [workExperience, setWorkExperience] = useState<WorkExperienceFormEntry[]>([
    {
      companyName: '',
      position: '',
      startYear: '',
      endYear: '',
      description: '',
    },
  ]);

  const handleApply = (job: JobPosting) => {
    setSelectedJob(job);
    setIsApplyDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsApplyDialogOpen(open);
    if (!open) {
      setSelectedJob(null);
    }
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startYear: '',
        endYear: '',
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const handleEducationChange = (index: number, field: keyof EducationFormEntry, value: string) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        companyName: '',
        position: '',
        startYear: '',
        endYear: '',
        description: '',
      },
    ]);
  };

  const handleRemoveWorkExperience = (index: number) => {
    if (workExperience.length > 1) {
      setWorkExperience(workExperience.filter((_, i) => i !== index));
    }
  };

  const handleWorkExperienceChange = (
    index: number,
    field: keyof WorkExperienceFormEntry,
    value: string
  ) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index][field] = value;
    setWorkExperience(newWorkExperience);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      address: '',
      currentLocation: '',
      expectedPay: '',
      collegeUniversityName: '',
      passoutYear: '',
      totalWorkExperience: '',
      message: '',
      termsAccepted: false,
    });
    setResumeFile(null);
    setUploadProgress(0);
    setEducation([
      {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startYear: '',
        endYear: '',
      },
    ]);
    setWorkExperience([
      {
        companyName: '',
        position: '',
        startYear: '',
        endYear: '',
        description: '',
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    // Validate job ID
    if (!isValidJobId(selectedJob.jobId)) {
      toast.error('Invalid Job ID', {
        description: 'The job ID format is invalid. Please contact support.',
      });
      return;
    }

    // Validate resume file
    if (!resumeFile) {
      toast.error('Resume Required', {
        description: 'Please upload your resume to continue.',
      });
      return;
    }

    // Validate terms acceptance
    if (!formData.termsAccepted) {
      toast.error('Terms and Conditions', {
        description: 'Please accept the terms and conditions to continue.',
      });
      return;
    }

    try {
      // Convert resume file to bytes
      const resumeBytes = await resumeFile.arrayBuffer();
      const resumeBlob = ExternalBlob.fromBytes(new Uint8Array(resumeBytes)).withUploadProgress(
        (percentage) => {
          setUploadProgress(percentage);
        }
      );

      // Convert education entries
      const educationEntries: EducationEntry[] = education
        .filter((edu) => edu.institution && edu.degree && edu.startYear)
        .map((edu) => ({
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          startYear: BigInt(parseInt(edu.startYear) || 0),
          endYear: edu.endYear ? BigInt(parseInt(edu.endYear)) : undefined,
        }));

      // Convert work experience entries
      const workExperienceEntries: WorkExperience[] = workExperience
        .filter((work) => work.companyName && work.position && work.startYear)
        .map((work) => ({
          companyName: work.companyName,
          position: work.position,
          startYear: BigInt(parseInt(work.startYear) || 0),
          endYear: work.endYear ? BigInt(parseInt(work.endYear)) : undefined,
          description: work.description,
        }));

      await submitApplication.mutateAsync({
        jobId: selectedJob.jobId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        address: formData.address,
        currentLocation: formData.currentLocation,
        expectedPay: formData.expectedPay,
        collegeUniversityName: formData.collegeUniversityName,
        passoutYear: BigInt(parseInt(formData.passoutYear) || 0),
        totalWorkExperience: formData.totalWorkExperience,
        education: educationEntries,
        previousWorkplaces: workExperienceEntries,
        resume: resumeBlob,
        message: formData.message || undefined,
        termsAccepted: formData.termsAccepted,
      });

      toast.success('Application submitted successfully!', {
        description: 'We will review your application and get back to you soon.',
      });

      setIsApplyDialogOpen(false);
      setSelectedJob(null);
      resetForm();
    } catch (error) {
      console.error('Application submission error:', error);
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
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
              <p className="text-muted-foreground">Loading job openings...</p>
            </div>
          ) : isError ? (
            <div className="max-w-2xl mx-auto">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Loading Jobs</AlertTitle>
                <AlertDescription>
                  We couldn't load the job listings at this time. Please try refreshing the page or
                  contact us directly at contact@glitchip.in.
                  {error && (
                    <div className="mt-2 text-xs opacity-75">
                      Error details: {error instanceof Error ? error.message : 'Unknown error'}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            </div>
          ) : !jobs || jobs.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <Alert>
                <Briefcase className="h-4 w-4" />
                <AlertTitle>No Open Positions</AlertTitle>
                <AlertDescription>
                  We don't have any open positions at the moment. Please check back soon or reach
                  out to us at contact@glitchip.in to express your interest in future
                  opportunities.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {jobs.map((job) => (
                <SectionReveal key={job.jobId}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <CardTitle className="text-2xl">{job.title}</CardTitle>
                        <Badge
                          variant="default"
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 text-base font-bold px-3 py-1"
                        >
                          {job.jobId}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {job.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">
                              Experience
                            </p>
                            <p className="text-base font-medium">
                              {Number(job.experienceRange.minYears)}–
                              {Number(job.experienceRange.maxYears)} years
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">
                              Salary Range
                            </p>
                            <p className="text-base font-medium">{job.salaryRange}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-muted-foreground mb-1">
                            Key Responsibilities
                          </p>
                          <p className="text-sm text-muted-foreground">
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
      <Dialog open={isApplyDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription className="text-base space-y-1">
              <div>
                <span className="font-semibold">Job ID: {selectedJob?.jobId}</span>
              </div>
              {selectedJob && (
                <div className="flex gap-4 text-sm">
                  <span>
                    Experience: {Number(selectedJob.experienceRange.minYears)}–
                    {Number(selectedJob.experienceRange.maxYears)} years
                  </span>
                  <span>•</span>
                  <span>Salary: {selectedJob.salaryRange}</span>
                </div>
              )}
              <div className="pt-1">Fill out the form below to submit your application</div>
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-180px)] pr-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="India"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main Street"
                  />
                </div>

                <div>
                  <Label htmlFor="currentLocation">Current Location *</Label>
                  <Input
                    id="currentLocation"
                    required
                    value={formData.currentLocation}
                    onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                    placeholder="Bengaluru, India"
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Professional Information</h3>

                <div>
                  <Label htmlFor="expectedPay">Expected Pay (LPA) *</Label>
                  <Input
                    id="expectedPay"
                    required
                    value={formData.expectedPay}
                    onChange={(e) => setFormData({ ...formData, expectedPay: e.target.value })}
                    placeholder="8 LPA"
                  />
                </div>

                <div>
                  <Label htmlFor="totalWorkExperience">Total Work Experience *</Label>
                  <Input
                    id="totalWorkExperience"
                    required
                    value={formData.totalWorkExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, totalWorkExperience: e.target.value })
                    }
                    placeholder="3 years"
                  />
                </div>

                <div>
                  <Label htmlFor="resume">Resume (PDF) *</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf"
                    required
                    onChange={handleResumeChange}
                  />
                  {resumeFile && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Selected: {resumeFile.name}
                    </p>
                  )}
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <p className="text-sm text-cyan-600 mt-1">Uploading: {uploadProgress}%</p>
                  )}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="text-lg font-semibold">Education</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddEducation}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Education
                  </Button>
                </div>

                {education.map((edu, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Education {index + 1}</h4>
                        {education.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveEducation(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div>
                        <Label htmlFor={`institution-${index}`}>Institution *</Label>
                        <Input
                          id={`institution-${index}`}
                          required
                          value={edu.institution}
                          onChange={(e) =>
                            handleEducationChange(index, 'institution', e.target.value)
                          }
                          placeholder="University Name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`degree-${index}`}>Degree *</Label>
                          <Input
                            id={`degree-${index}`}
                            required
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                            placeholder="B.Tech"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study *</Label>
                          <Input
                            id={`fieldOfStudy-${index}`}
                            required
                            value={edu.fieldOfStudy}
                            onChange={(e) =>
                              handleEducationChange(index, 'fieldOfStudy', e.target.value)
                            }
                            placeholder="Electronics"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`startYear-${index}`}>Start Year *</Label>
                          <Input
                            id={`startYear-${index}`}
                            type="number"
                            required
                            value={edu.startYear}
                            onChange={(e) =>
                              handleEducationChange(index, 'startYear', e.target.value)
                            }
                            placeholder="2018"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`endYear-${index}`}>End Year</Label>
                          <Input
                            id={`endYear-${index}`}
                            type="number"
                            value={edu.endYear}
                            onChange={(e) =>
                              handleEducationChange(index, 'endYear', e.target.value)
                            }
                            placeholder="2022"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="collegeUniversityName">College/University Name *</Label>
                    <Input
                      id="collegeUniversityName"
                      required
                      value={formData.collegeUniversityName}
                      onChange={(e) =>
                        setFormData({ ...formData, collegeUniversityName: e.target.value })
                      }
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passoutYear">Passout Year *</Label>
                    <Input
                      id="passoutYear"
                      type="number"
                      required
                      value={formData.passoutYear}
                      onChange={(e) => setFormData({ ...formData, passoutYear: e.target.value })}
                      placeholder="2022"
                    />
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="text-lg font-semibold">Work Experience</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddWorkExperience}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Experience
                  </Button>
                </div>

                {workExperience.map((work, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        {workExperience.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveWorkExperience(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`companyName-${index}`}>Company Name *</Label>
                          <Input
                            id={`companyName-${index}`}
                            required
                            value={work.companyName}
                            onChange={(e) =>
                              handleWorkExperienceChange(index, 'companyName', e.target.value)
                            }
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`position-${index}`}>Position *</Label>
                          <Input
                            id={`position-${index}`}
                            required
                            value={work.position}
                            onChange={(e) =>
                              handleWorkExperienceChange(index, 'position', e.target.value)
                            }
                            placeholder="Software Engineer"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`workStartYear-${index}`}>Start Year *</Label>
                          <Input
                            id={`workStartYear-${index}`}
                            type="number"
                            required
                            value={work.startYear}
                            onChange={(e) =>
                              handleWorkExperienceChange(index, 'startYear', e.target.value)
                            }
                            placeholder="2020"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`workEndYear-${index}`}>End Year</Label>
                          <Input
                            id={`workEndYear-${index}`}
                            type="number"
                            value={work.endYear}
                            onChange={(e) =>
                              handleWorkExperienceChange(index, 'endYear', e.target.value)
                            }
                            placeholder="2023"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`description-${index}`}>Description *</Label>
                        <Textarea
                          id={`description-${index}`}
                          required
                          value={work.description}
                          onChange={(e) =>
                            handleWorkExperienceChange(index, 'description', e.target.value)
                          }
                          placeholder="Describe your role and responsibilities"
                          rows={3}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
                <div>
                  <Label htmlFor="message">Cover Letter / Additional Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us why you're interested in this position..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, termsAccepted: checked as boolean })
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the terms and conditions *
                  </label>
                  <p className="text-sm text-muted-foreground">
                    By submitting this application, you agree to our{' '}
                    <Link to="/terms-and-conditions" className="text-cyan-600 hover:underline">
                      Terms and Conditions
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                disabled={submitApplication.isPending}
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
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
