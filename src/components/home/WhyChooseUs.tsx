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
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Education That{" "}
            <span className="text-gradient-gold">Transforms</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            At Promised Land College, we believe education should be practical, inclusive, and transformative.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-border/50 hover:border-primary/20 animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="mb-6">
                <div className="inline-flex p-4 rounded-2xl bg-gold-gradient shadow-gold group-hover:shadow-glow transition-all">
                  <feature.icon className="h-7 w-7 text-navy-dark" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
