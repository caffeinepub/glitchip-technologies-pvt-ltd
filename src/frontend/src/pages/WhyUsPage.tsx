import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SectionReveal from '../components/SectionReveal';
import { Award, Clock, Shield, Users, Wrench, Zap, CheckCircle2 } from 'lucide-react';

const differentiators = [
  {
    icon: Award,
    title: 'Quality & Signoff Rigor',
    description:
      'We follow industry-standard signoff methodologies ensuring first-time-right silicon. Our rigorous quality processes minimize respins and accelerate time-to-market.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description:
      'Optimized workflows and experienced teams enable rapid project delivery without compromising quality. We understand the competitive semiconductor landscape.',
  },
  {
    icon: Shield,
    title: 'Security & IP Protection',
    description:
      'Stringent NDAs, secure infrastructure, and compartmentalized workflows protect your valuable IP. Your designs remain confidential and secure.',
  },
  {
    icon: Users,
    title: 'Domain Expertise',
    description:
      'Our engineers bring deep expertise across multiple technology nodes, design flows, and application domains from consumer to automotive.',
  },
  {
    icon: Zap,
    title: 'Scalable Teams',
    description:
      'Flexible engagement models allow you to scale resources up or down based on project phases. From single engineers to full design teams.',
  },
  {
    icon: Wrench,
    title: 'Tool Proficiency',
    description:
      'Extensive experience with industry-leading EDA tools from Synopsys, Cadence, Mentor, and Siemens. We adapt to your tool ecosystem.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'Understanding your requirements, constraints, and success criteria',
  },
  {
    step: '02',
    title: 'Team Assembly',
    description: 'Matching the right experts to your project needs',
  },
  {
    step: '03',
    title: 'Execution & Delivery',
    description: 'Agile development with regular checkpoints and reviews',
  },
  {
    step: '04',
    title: 'Support & Optimization',
    description: 'Post-delivery support and continuous improvement',
  },
];

export default function WhyUsPage() {
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
                Why Choose Us
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your Trusted VLSI Partner
              </h1>
              <p className="text-xl text-muted-foreground">
                Combining technical excellence, proven processes, and flexible engagement
                models to deliver exceptional semiconductor design services.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Differentiators Grid */}
      <section className="py-24 md:py-32">
        <div className="container">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Sets Us Apart</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Six core pillars that make Glitchip Technologies the preferred choice for
                semiconductor companies worldwide
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, index) => (
              <SectionReveal key={index}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <SectionReveal>
        <section className="py-24 md:py-32 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Proven Process</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  A structured approach that ensures project success from kickoff to delivery
                  and beyond.
                </p>
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="/assets/generated/glitchip-whyus-illustration.dim_1600x900.png"
                  alt="Our Process"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Quality Commitment */}
      <SectionReveal>
        <section className="py-24 md:py-32">
          <div className="container">
            <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/20">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Our Quality Commitment</h2>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">ISO-Compliant Processes</h3>
                          <p className="text-muted-foreground">
                            Standardized workflows ensuring consistent quality across all
                            projects
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Continuous Training</h3>
                          <p className="text-muted-foreground">
                            Regular upskilling on latest tools, technologies, and methodologies
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Peer Reviews</h3>
                          <p className="text-muted-foreground">
                            Multi-level design reviews catching issues early in the flow
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Automated Checks</h3>
                          <p className="text-muted-foreground">
                            CI/CD integration with automated quality gates and regression
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                      <Award className="h-32 w-32 text-cyan-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </SectionReveal>
    </div>
  );
}
