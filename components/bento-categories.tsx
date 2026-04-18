import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    title: "Blazers & Jackets",
    description: "Tailored blazers with school crests and colors",
    image: "/images/blazers.jpg",
    span: "md:col-span-2 md:row-span-2",
    large: true,
  },
  {
    title: "Shirts & Blouses",
    description: "Crisp, comfortable everyday wear",
    image: "/images/shirts.jpg",
    span: "md:col-span-1 md:row-span-1",
    large: false,
  },
  {
    title: "Accessories",
    description: "Ties, badges, belts and more",
    image: "/images/accessories.jpg",
    span: "md:col-span-1 md:row-span-1",
    large: false,
  },
  {
    title: "Trousers & Skirts",
    description: "Durable bottoms for daily wear",
    image: "/images/trousers.jpg",
    span: "md:col-span-1 md:row-span-1",
    large: false,
  },
  {
    title: "Sportswear",
    description: "PE kits and athletic wear",
    image: "/images/sportswear.jpg",
    span: "md:col-span-1 md:row-span-1",
    large: false,
  },
];

export function BentoCategories() {
  return (
    <section id="categories" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Our collection
            </p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl text-balance">
              Everything your student needs
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground leading-relaxed">
            From blazers to sportswear, we carry a complete range of school
            uniform essentials for every institution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
          {categories.map((category) => (
            <Link
              href="/products"
              key={category.title}
              className={`group relative block overflow-hidden rounded-2xl ${category.span}`}
            >
              <div className={`relative ${category.large ? "h-[500px]" : "h-[240px]"} w-full`}>
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <h3 className={`font-serif text-primary-foreground ${category.large ? "text-2xl md:text-3xl" : "text-lg"}`}>
                    {category.title}
                  </h3>
                  <p className={`mt-1 text-primary-foreground/70 ${category.large ? "text-sm" : "text-xs"}`}>
                    {category.description}
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-all duration-300 group-hover:bg-primary-foreground group-hover:text-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
