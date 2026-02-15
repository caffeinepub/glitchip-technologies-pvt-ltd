import SectionReveal from '../components/SectionReveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-24 md:py-32">
        <div className="container relative">
          <SectionReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Terms and Conditions
              </h1>
              <p className="text-xl text-muted-foreground">
                Please read these terms carefully before submitting your application
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <SectionReveal>
              <Card>
                <CardHeader>
                  <CardTitle>Application Terms and Conditions</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                  <h3>1. Application Submission</h3>
                  <p>
                    By submitting an application through this portal, you confirm that all
                    information provided is accurate, complete, and truthful to the best of your
                    knowledge. Any false or misleading information may result in disqualification
                    from the application process or termination of employment if discovered after
                    hiring.
                  </p>

                  <h3>2. Data Collection and Privacy</h3>
                  <p>
                    We collect and process your personal information solely for recruitment
                    purposes. Your data will be stored securely and will only be accessed by
                    authorized personnel involved in the hiring process. We will not share your
                    information with third parties without your explicit consent, except as
                    required by law.
                  </p>

                  <h3>3. Resume and Document Submission</h3>
                  <p>
                    You grant us permission to review and retain your resume and any other
                    documents submitted as part of your application. These documents will be kept
                    on file for a reasonable period and may be considered for future opportunities
                    unless you request their removal.
                  </p>

                  <h3>4. Communication</h3>
                  <p>
                    By providing your contact information, you consent to receive communications
                    from us regarding your application status and potential employment
                    opportunities. You may opt out of future communications at any time by
                    contacting us directly.
                  </p>

                  <h3>5. Equal Opportunity</h3>
                  <p>
                    We are an equal opportunity employer and do not discriminate on the basis of
                    race, color, religion, gender, sexual orientation, national origin, age,
                    disability, or any other protected characteristic. All applications are
                    evaluated based on qualifications and merit.
                  </p>

                  <h3>6. Application Review</h3>
                  <p>
                    We will review all applications carefully, but submission does not guarantee an
                    interview or employment offer. We reserve the right to reject any application
                    at our discretion and are not obligated to provide specific reasons for
                    rejection.
                  </p>

                  <h3>7. Background Verification</h3>
                  <p>
                    If you progress in the hiring process, we may conduct background checks,
                    reference checks, and verification of your educational and employment history.
                    By submitting your application, you authorize us to conduct such verifications.
                  </p>

                  <h3>8. Intellectual Property</h3>
                  <p>
                    Any work samples, portfolios, or other materials you submit remain your
                    intellectual property. However, you grant us a non-exclusive license to review
                    and evaluate these materials for recruitment purposes.
                  </p>

                  <h3>9. Changes to Terms</h3>
                  <p>
                    We reserve the right to modify these terms and conditions at any time. Any
                    changes will be posted on this page with an updated effective date.
                  </p>

                  <h3>10. Contact Information</h3>
                  <p>
                    If you have any questions about these terms or your application, please contact
                    us at contact@glitchip.in.
                  </p>

                  <p className="text-sm text-muted-foreground mt-8">
                    <strong>Last Updated:</strong> February 15, 2026
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
