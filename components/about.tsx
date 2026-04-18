import { GraduationCap, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Premium Quality",
    description:
      "Every garment is crafted from durable, breathable fabrics designed to withstand the rigors of school life while keeping students comfortable.",
  },
  {
    icon: GraduationCap,
    number: "02",
    title: "School Partnerships",
    description:
      "We work directly with schools to ensure every uniform meets their exact specifications, colors, and emblem requirements.",
  },
  {
    icon: Truck,
    number: "03",
    title: "Easy Ordering",
    description:
      "Simple ordering process with delivery straight to your door. Bulk orders for schools and individual orders for parents.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Why choose us
          </p>
          <h2 className="font-serif text-4xl text-foreground md:text-5xl text-balance">
            Dressing students for success since 2010
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-foreground/20 hover:shadow-lg"
            >
              <span className="mb-6 block font-serif text-4xl text-muted-foreground/30">
                {feature.number}
              </span>
              <div className="mb-4 flex items-center gap-3">
                <feature.icon className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-medium text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
