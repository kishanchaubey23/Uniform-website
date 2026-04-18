import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-uniforms.jpg"
          alt="Premium school uniforms displayed on hangers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className="animate-fade-up mb-6 text-sm uppercase tracking-[0.3em] text-primary-foreground/70"
          style={{ animationDelay: "0.1s" }}
        >
          Trusted by schools across the region
        </p>
        <h1
          className="animate-fade-up font-serif text-5xl leading-tight text-primary-foreground md:text-7xl lg:text-8xl text-balance"
          style={{ animationDelay: "0.25s" }}
        >
          Quality uniforms for every institution
        </h1>
        <p
          className="animate-fade-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg"
          style={{ animationDelay: "0.4s" }}
        >
          We partner with schools to provide premium, durable uniforms that
          students wear with pride. Find your school and order today.
        </p>
        <div
          className="animate-fade-up mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ animationDelay: "0.55s" }}
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary-foreground px-8 text-foreground hover:bg-primary-foreground/90"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="/#categories">Browse Categories</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1s" }}>
        <Link
          href="#about"
          className="flex flex-col items-center gap-2 text-primary-foreground/50 transition-colors hover:text-primary-foreground/80"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
