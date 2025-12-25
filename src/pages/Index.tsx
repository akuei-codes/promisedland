import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { AnnouncementsPreview } from "@/components/home/AnnouncementsPreview";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProgramsPreview />
      <WhyChooseUs />
      <AnnouncementsPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
