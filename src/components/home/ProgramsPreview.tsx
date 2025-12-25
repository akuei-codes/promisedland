import { Link } from "react-router-dom";
import { ArrowRight, Monitor, Languages, Code, Lightbulb, Users, ClipboardList, GraduationCap, ShoppingCart, TrendingUp, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Languages,
  Code,
  Lightbulb,
  Users,
  ClipboardList,
  GraduationCap,
  ShoppingCart,
  TrendingUp,
  Briefcase,
};

export function ProgramsPreview() {
  const { data: programs } = useQuery({
    queryKey: ["programs-preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-foreground text-sm font-medium mb-4 animate-fade-up">
            Our Programs
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up delay-100">
            Practical Skills for the{" "}
            <span className="text-gradient-gold">Modern World</span>
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-up delay-200">
            Choose from 10 certificate programs designed to meet local, regional, and global workforce demands.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {programs?.map((program, idx) => {
            const IconComponent = iconMap[program.icon || "BookOpen"] || Monitor;
            return (
              <div
                key={program.id}
                className="group relative bg-card rounded-2xl p-6 shadow-soft border border-border hover:border-accent/40 card-hover animate-fade-up overflow-hidden"
                style={{ animationDelay: `${300 + idx * 100}ms` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                    <IconComponent className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {program.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-accent-foreground bg-accent/20 px-3 py-1.5 rounded-full">
                        {program.duration}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-up delay-700">
          <Link to="/programs">
            <Button variant="navy" size="lg" className="group">
              View All Programs
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
