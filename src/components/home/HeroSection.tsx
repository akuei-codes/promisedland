import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient hero-pattern">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float delay-500" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 border border-cream/20 text-cream/90 text-sm font-medium mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Now Accepting Applications for January 2026
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-tight mb-6 animate-fade-up delay-100">
              Your Future Begins at{" "}
              <span className="text-gradient-gold">Promised Land</span>
            </h1>

            <p className="text-lg md:text-xl text-cream/80 max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up delay-200">
              Equipping young people and professionals with practical, market-ready skills for a modern, competitive world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up delay-300">
              <Link to="/apply">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  Apply Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/programs">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  Explore Programs
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-cream/10 animate-fade-up delay-400">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <span className="font-serif text-3xl font-bold text-cream">10</span>
                </div>
                <span className="text-cream/60 text-sm">Certificate Programs</span>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="font-serif text-3xl font-bold text-cream">Expert</span>
                </div>
                <span className="text-cream/60 text-sm">Instructors</span>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="font-serif text-3xl font-bold text-cream">100%</span>
                </div>
                <span className="text-cream/60 text-sm">Hands-on Learning</span>
              </div>
            </div>
          </div>

          {/* Right Content - Decorative Card Stack */}
          <div className="hidden lg:block relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Background Cards */}
              <div className="absolute top-4 left-4 right-4 bottom-0 bg-cream/5 rounded-3xl border border-cream/10 transform rotate-3" />
              <div className="absolute top-2 left-2 right-2 bottom-2 bg-cream/5 rounded-3xl border border-cream/10 transform -rotate-2" />
              
              {/* Main Card */}
              <div className="relative glass-card rounded-3xl p-8 bg-cream/10 backdrop-blur-xl border border-cream/20 animate-scale-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-gold-gradient shadow-gold">
                    <BookOpen className="h-8 w-8 text-navy-dark" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-cream">Start Learning</h3>
                    <p className="text-cream/70">January 2026</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Web Development", duration: "6 months" },
                    { name: "Digital Marketing", duration: "4 months" },
                    { name: "Entrepreneurship", duration: "4 months" },
                  ].map((course, idx) => (
                    <div
                      key={course.name}
                      className="flex items-center justify-between p-4 rounded-xl bg-cream/5 border border-cream/10 animate-slide-in-right"
                      style={{ animationDelay: `${400 + idx * 100}ms` }}
                    >
                      <span className="text-cream font-medium">{course.name}</span>
                      <span className="text-cream/60 text-sm">{course.duration}</span>
                    </div>
                  ))}
                </div>

                <Link to="/programs" className="block mt-6">
                  <Button variant="hero" className="w-full">
                    View All Programs
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(210 33% 98%)"
          />
        </svg>
      </div>
    </section>
  );
}
