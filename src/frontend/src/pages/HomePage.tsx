import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SectionReveal from '../components/SectionReveal';
import SafeImage from '../components/SafeImage';
import { Cpu, Zap, Shield, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Cpu,
    title: 'Physical Design',
    description: 'End-to-end physical design services from floorplanning to signoff.',
  },
  {
    icon: CheckCircle2,
    title: 'Design Verification',
    description: 'Comprehensive verification solutions ensuring first-time-right silicon.',
  },
  {
    icon: Shield,
    title: 'DFT',
    description: 'Design for testability solutions maximizing test coverage and yield.',
  },
  {
    icon: Zap,
    title: 'AI Automation',
    description: 'AI-powered automation accelerating semiconductor design workflows.',
  },
  {
    icon: Users,
    title: 'RTL Engineering',
    description: 'Expert RTL design and optimization for complex digital systems.',
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '15+', label: 'Expert Engineers' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 opacity-10">
          <SafeImage
            src="/assets/generated/glitchip-hero-bg-replacement.dim_2048x2048.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="container relative py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <SectionReveal>
              <div className="space-y-6 max-w-2xl">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                  Leading VLSI Services Provider
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Accelerating Semiconductor Innovation
                </h1>
                <p className="text-xl text-muted-foreground">
                  Glitchip Technologies delivers world-class VLSI design, verification, and AI
                  automation services. Partner with us to bring your silicon vision to reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 w-full sm:w-auto"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Explore Services
                    </Button>
                  </Link>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal>
              <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-2xl">
                  <SafeImage
                    src="/assets/generated/glitchip-hero-chip-replacement.dim_1600x1200.jpg"
                    alt="Semiconductor Design - Close-up of CPU microchip"
                    className="w-full h-full object-cover object-center hero-chip-blend"
                  />
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <SectionReveal>
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Services Overview */}
      <SectionReveal>
        <section className="py-24 md:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive VLSI solutions tailored to your semiconductor design needs
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/services">
                <Button size="lg" variant="outline">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Why Choose Us Teaser */}
      <SectionReveal>
        <section className="py-24 md:py-32 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Glitchip?</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Proven Expertise</h3>
                      <p className="text-muted-foreground">
                        Deep domain knowledge across all major VLSI design flows and tools
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Quality First</h3>
                      <p className="text-muted-foreground">
                        Rigorous signoff processes ensuring first-time-right silicon success
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Scalable Teams</h3>
                      <p className="text-muted-foreground">
                        Flexible engagement models that scale with your project needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Fast Turnaround</h3>
                      <p className="text-muted-foreground">
                        Accelerated delivery without compromising on quality or reliability
                      </p>
                    </div>
                  </div>
                </div>
                <Link to="/why-us">
                  <Button size="lg" className="mt-8">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <SafeImage
                  src="/assets/generated/glitchip-whyus-illustration.dim_1600x900.png"
                  alt="Why Choose Us - Glitchip Technologies advantages"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* CTA Section */}
      <SectionReveal>
        <section className="py-24 md:py-32">
          <div className="container">
            <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Start Your Next Project?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's discuss how Glitchip Technologies can accelerate your semiconductor
                  design journey
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/careers">
                    <Button size="lg" variant="outline">
                      Join Our Team
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </SectionReveal>
    </div>
  );
}
