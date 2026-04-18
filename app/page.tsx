import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { BentoCategories } from "@/components/bento-categories";
import { Stats } from "@/components/stats";
import { Schools } from "@/components/schools";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <BentoCategories />
      <Stats />
      <Schools />
      <Contact />
      <Footer />
    </main>
  );
}
