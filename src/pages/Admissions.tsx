import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, FileText, ArrowRight, GraduationCap } from "lucide-react";

const Admissions = () => {
  const requirements = [
    { text: "Completed secondary school education (or equivalent)", optional: true },
    { text: "Basic English proficiency", optional: false },
    { text: "Valid national ID or passport", optional: false },
    { text: "Commitment to attend classes and complete coursework", optional: false },
    { text: "Motivation letter", optional: true },
  ];

  const steps = [
    { step: 1, title: "Choose Your Program", desc: "Browse our 10 certificate programs and select one that fits your goals." },
    { step: 2, title: "Complete Application", desc: "Fill out the online application form with your personal and educational details." },
    { step: 3, title: "Submit Documents", desc: "Upload required documents including ID and educational certificates." },
    { step: 4, title: "Receive Confirmation", desc: "We'll review your application and send confirmation within 5 business days." },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-800 to-slate-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
            <span className="text-amber-400">Admissions</span>
          </h1>
          <p className="text-lg text-amber-50/80 max-w-3xl mx-auto">
            Join Promised Land College and start your journey towards a successful career.
          </p>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-md">
              <Calendar className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Programs Start</p>
                <p className="font-serif text-xl font-bold text-foreground">January 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-md">
              <FileText className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Application Deadline</p>
                <p className="font-serif text-xl font-bold text-foreground">December 31, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">
              Admission <span className="text-amber-500">Requirements</span>
            </h2>
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <ul className="space-y-4">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className={`h-6 w-6 shrink-0 ${req.optional ? "text-amber-500" : "text-green-600"}`} />
                    <span className="text-foreground">
                      {req.text}
                      {req.optional && <span className="text-muted-foreground text-sm ml-2">(optional)</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
            Application <span className="text-amber-500">Process</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((item) => (
              <div key={item.step} className="relative bg-card rounded-2xl p-6 shadow-lg border border-border text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-slate-900 font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="h-12 w-12 text-amber-400 mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-amber-50 mb-4">Ready to Apply?</h2>
          <p className="text-amber-50/80 mb-8 max-w-xl mx-auto">
            Take the first step towards your future. Our online application takes just a few minutes.
          </p>
          <Link to="/apply">
            <Button variant="hero" size="xl">
              Start Your Application <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Admissions;
