import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-20 text-center md:px-16 md:py-28">
          {/* Decorative lines */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent" />
          </div>

          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-primary-foreground/50">
            Get started today
          </p>
          <h2 className="mx-auto max-w-2xl font-serif text-4xl text-primary-foreground md:text-5xl lg:text-6xl text-balance">
            Ready to outfit your students?
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-primary-foreground/70">
            Whether you are a parent looking for your child&apos;s uniform or a
            school administrator seeking a trusted supplier, we are here to help.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary-foreground px-8 text-foreground hover:bg-primary-foreground/90"
            >
              <Link href="mailto:hello@uniformstore.com">
                Contact Us
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="tel:+91764657xxxx">Call +91 764657xxxx</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
