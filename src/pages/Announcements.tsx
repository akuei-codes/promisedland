import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

const Announcements = () => {
  const { data: announcements, isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data, error } = await supabase.from("announcements").select("*").eq("is_published", true).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-800 to-slate-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-amber-50 mb-6">
            <span className="text-amber-400">Announcements</span>
          </h1>
          <p className="text-lg text-amber-50/80 max-w-2xl mx-auto">
            Stay updated with the latest news and events from Promised Land College.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {isLoading ? (
            <div className="text-center py-12">Loading announcements...</div>
          ) : announcements?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No announcements yet. Check back soon!</div>
          ) : (
            <div className="space-y-6">
              {announcements?.map((item) => (
                <article key={item.id} className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(item.created_at), "MMMM d, yyyy")}
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">{item.title}</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{item.content}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Announcements;
