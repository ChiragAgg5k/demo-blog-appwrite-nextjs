import CTA from "@/components/landing/cta";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
