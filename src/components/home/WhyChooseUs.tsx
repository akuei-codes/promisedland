import { Lightbulb, Target, Users, Award, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Hands-on Learning",
    description: "Practical, project-based courses that prepare you for real-world challenges.",
  },
  {
    icon: Target,
    title: "Career-Focused",
    description: "Programs designed to meet local and global workforce demands.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience.",
  },
  {
    icon: Award,
    title: "Recognized Certificates",
    description: "Earn certificates valued by employers across the region.",
  },
  {
    icon: Clock,
    title: "Flexible Schedules",
    description: "Programs designed for both full-time students and working professionals.",
  },
  {
    icon: Heart,
    title: "Supportive Community",
    description: "Join a welcoming environment that fosters growth and success.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-up">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up delay-100">
            Education That{" "}
            <span className="text-gradient-gold">Transforms</span>
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-up delay-200">
            At Promised Land College, we believe education should be practical, inclusive, and transformative.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:border-accent/30 card-hover animate-fade-up"
              style={{ animationDelay: `${300 + idx * 100}ms` }}
            >
              <div className="mb-6">
                <div className="inline-flex p-4 rounded-2xl bg-gold-gradient shadow-gold group-hover:animate-glow transition-all">
                  <feature.icon className="h-7 w-7 text-navy-dark" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
