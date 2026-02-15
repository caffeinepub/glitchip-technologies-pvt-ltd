import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SectionReveal from '../components/SectionReveal';
import { Sparkles } from 'lucide-react';

export default function ProductsPage() {
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
                Products
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Innovation in Development
              </h1>
              <p className="text-xl text-muted-foreground">
                We're working on exciting new products to revolutionize semiconductor design
                workflows
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <SectionReveal>
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/20">
              <CardContent className="p-16 text-center">
                <div className="inline-flex h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 items-center justify-center mb-8">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Stay Tuned for the product
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  We're developing innovative tools and IP solutions that will transform how
                  semiconductor companies approach design challenges. Check back soon for
                  updates.
                </p>
              </CardContent>
            </Card>
          </SectionReveal>

          {/* Future Product Grid Placeholder */}
          <SectionReveal>
            <div className="mt-16 grid md:grid-cols-3 gap-6 opacity-40">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-64">
                  <CardContent className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-lg bg-muted mx-auto mb-4" />
                      <div className="h-4 w-32 bg-muted rounded mx-auto mb-2" />
                      <div className="h-3 w-48 bg-muted rounded mx-auto" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
