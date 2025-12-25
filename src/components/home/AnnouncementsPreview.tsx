import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export function AnnouncementsPreview() {
  const { data: announcements } = useQuery({
    queryKey: ["announcements-preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  if (!announcements?.length) {
    return null;
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <div className="sticky top-32">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium mb-4">
                <Bell className="h-4 w-4" />
                Latest News
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Stay Updated with{" "}
                <span className="text-gradient-gold">Announcements</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get the latest news, events, and important updates from Promised Land College.
              </p>
              <Link to="/announcements">
                <Button variant="navyOutline" size="lg">
                  View All News
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Announcements List */}
          <div className="lg:col-span-3 space-y-6">
            {announcements.map((announcement, idx) => (
              <article
                key={announcement.id}
                className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border/50 hover:border-accent/30 animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 p-3 rounded-xl bg-primary/5 group-hover:bg-accent/10 transition-colors">
                    <Calendar className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <time className="text-sm text-muted-foreground">
                      {format(new Date(announcement.created_at), "MMMM d, yyyy")}
                    </time>
                    <h3 className="font-serif text-xl font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                      {announcement.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {announcement.content}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
