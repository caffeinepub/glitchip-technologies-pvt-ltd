import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SectionReveal from '../components/SectionReveal';
import { Cpu, CheckCircle2, Shield, Zap, Code } from 'lucide-react';

const services = [
  {
    icon: Cpu,
    title: 'Physical Design',
    summary:
      'Complete physical design services from RTL to GDSII, ensuring optimal PPA and manufacturability.',
    capabilities: [
      'Floorplanning and power planning',
      'Placement and clock tree synthesis',
      'Routing and timing closure',
      'Physical verification (DRC/LVS)',
      'Signoff timing and power analysis',
    ],
    deliverables: [
      'GDSII layout database',
      'Timing and power reports',
      'Physical verification clean reports',
      'Design documentation',
    ],
    engagement:
      'Flexible team augmentation or turnkey project delivery with dedicated engineers.',
  },
  {
    icon: CheckCircle2,
    title: 'Design Verification',
    summary:
      'Comprehensive verification solutions using industry-standard methodologies to ensure functional correctness.',
    capabilities: [
      'UVM-based testbench development',
      'Functional and code coverage analysis',
      'Assertion-based verification',
      'Formal verification',
      'Regression and CI/CD integration',
    ],
    deliverables: [
      'Complete verification environment',
      'Coverage reports and closure',
      'Bug tracking and resolution',
      'Verification plan and reports',
    ],
    engagement:
      'Dedicated verification teams with expertise in complex SoC and IP verification.',
  },
  {
    icon: Shield,
    title: 'DFT (Design for Testability)',
    summary:
      'Design for testability solutions maximizing test coverage, yield, and reducing test costs.',
    capabilities: [
      'Scan insertion and ATPG',
      'MBIST and memory test solutions',
      'Boundary scan (JTAG) implementation',
      'Fault simulation and coverage',
      'Test pattern generation and validation',
    ],
    deliverables: [
      'DFT-ready netlist',
      'Test patterns and vectors',
      'Fault coverage reports',
      'Test architecture documentation',
    ],
    engagement:
      'End-to-end DFT implementation or consultation for existing design flows.',
  },
  {
    icon: Zap,
    title: 'AI Automation for Semiconductors',
    summary:
      'Cutting-edge AI and ML solutions to accelerate design cycles and improve design quality.',
    capabilities: [
      'ML-based design optimization',
      'Automated design space exploration',
      'Predictive analytics for timing/power',
      'Intelligent test pattern generation',
      'Design anomaly detection',
    ],
    deliverables: [
      'Custom AI/ML models',
      'Automation scripts and tools',
      'Performance improvement reports',
      'Integration with existing flows',
    ],
    engagement:
      'Collaborative development of AI-powered tools tailored to your design challenges.',
  },
  {
    icon: Code,
    title: 'RTL Engineering',
    summary:
      'Expert RTL design and optimization services for complex digital systems and IP blocks.',
    capabilities: [
      'RTL architecture and micro-architecture',
      'Verilog/SystemVerilog coding',
      'Synthesis and timing optimization',
      'Low-power design techniques',
      'IP integration and customization',
    ],
    deliverables: [
      'Synthesizable RTL code',
      'Design specifications',
      'Synthesis scripts and constraints',
      'Timing and area reports',
    ],
    engagement:
      'Full RTL development or augmentation of your existing design teams.',
  },
];

export default function ServicesPage() {
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
                Our Services
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Comprehensive VLSI Solutions
              </h1>
              <p className="text-xl text-muted-foreground">
                From concept to silicon, we deliver end-to-end semiconductor design services
                with proven expertise and cutting-edge technology.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <SectionReveal key={index}>
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-start ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="sticky top-24">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                      <p className="text-lg text-muted-foreground mb-6">{service.summary}</p>
                      <div className="relative h-64 rounded-lg overflow-hidden">
                        <img
                          src="/assets/generated/glitchip-service-icons.dim_512x512.png"
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Key Capabilities</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {service.capabilities.map((capability, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{capability}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Typical Deliverables</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {service.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/20">
                        <CardHeader>
                          <CardTitle>Engagement Model</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{service.engagement}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
