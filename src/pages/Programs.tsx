import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Monitor, Languages, Code, Lightbulb, Users, ClipboardList, GraduationCap, ShoppingCart, TrendingUp, Briefcase, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor, Languages, Code, Lightbulb, Users, ClipboardList, GraduationCap, ShoppingCart, TrendingUp, Briefcase,
};

const Programs = () => {
  const { data: programs, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("programs").select("*");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-800 to-slate-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
            Our <span className="text-amber-400">Programs</span>
          </h1>
          <p className="text-lg text-amber-50/80 max-w-3xl mx-auto">
            10 professional certificate programs designed to meet local, regional, and global workforce demands.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">Loading programs...</div>
          ) : (
            <div className="space-y-8">
              {programs?.map((program) => {
                const IconComponent = iconMap[program.icon || "Monitor"] || Monitor;
                return (
                  <div key={program.id} className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="shrink-0">
                        <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300">
                          <IconComponent className="h-10 w-10 text-slate-900" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <h2 className="font-serif text-2xl font-bold text-foreground">{program.name}</h2>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                            <Clock className="h-4 w-4" /> {program.duration}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-6">{program.description}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {program.learning_outcomes?.slice(0, 4).map((outcome: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/apply">
              <Button variant="gold" size="xl">
                Apply Now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
