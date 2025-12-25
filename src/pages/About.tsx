import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Heart, Users, Award, BookOpen } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-800 to-slate-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-amber-50 mb-6">
            About <span className="text-amber-400">Promised Land</span> College
          </h1>
          <p className="text-lg text-amber-50/80 max-w-3xl mx-auto">
            A forward-looking tertiary training institution committed to equipping young people and working professionals with practical, market-ready skills.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 mb-6">
                <Target className="h-8 w-8 text-slate-900" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide practical, inclusive, and transformative education that empowers students to transition confidently into employment, self-employment, or further education. We emphasize hands-on learning, digital literacy, entrepreneurial thinking, and personal development.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 mb-6">
                <Eye className="h-8 w-8 text-slate-900" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be South Sudan's leading provider of practical vocational training, producing skilled graduates who drive economic growth and community development across the region and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Our Core <span className="text-amber-500">Values</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Excellence", desc: "We strive for the highest standards in everything we do." },
              { icon: Users, title: "Inclusivity", desc: "Education for everyone, regardless of background." },
              { icon: Award, title: "Integrity", desc: "Honesty and ethical conduct guide our actions." },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex p-4 rounded-2xl bg-slate-800 text-amber-400 mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliation */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <BookOpen className="h-12 w-12 text-amber-500 mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            Affiliated with Promised Land Secondary School
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Promised Land College–Juba builds on the strong foundation of academic excellence, discipline, and community impact established by Promised Land Secondary School. This affiliation ensures our programs meet the highest educational standards.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
