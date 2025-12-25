import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";

const Apply = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    program_id: "",
    education_background: "",
    additional_info: "",
  });

  const { data: programs } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("programs").select("id, name");
      if (error) throw error;
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("applications").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({ title: "Application Submitted!", description: "We'll review your application and get back to you soon." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit application. Please try again.", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="pt-32 pb-20 min-h-screen bg-background flex items-center">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto bg-card rounded-2xl p-8 shadow-lg border border-border">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Application Submitted!</h1>
              <p className="text-muted-foreground">Thank you for applying to Promised Land College. We'll review your application and contact you within 5 business days.</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-800 to-slate-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-amber-50 mb-6">
            <span className="text-amber-400">Apply</span> Online
          </h1>
          <p className="text-lg text-amber-50/80 max-w-2xl mx-auto">
            Complete the form below to apply for January 2026 intake.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card rounded-2xl p-8 shadow-lg border border-border space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input id="full_name" required value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input id="dob" type="date" required value={formData.date_of_birth} onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="program">Program *</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, program_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                  <SelectContent>
                    {programs?.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="education">Education Background *</Label>
              <Textarea id="education" required placeholder="Describe your educational background..." value={formData.education_background} onChange={(e) => setFormData({ ...formData, education_background: e.target.value })} />
            </div>

            <div>
              <Label htmlFor="additional">Additional Information (Optional)</Label>
              <Textarea id="additional" placeholder="Anything else you'd like us to know?" value={formData.additional_info} onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })} />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : "Submit Application"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
