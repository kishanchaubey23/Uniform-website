import { ProductsGrid } from "@/components/products-grid";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Shop All Uniforms | MK Creations",
  description: "Browse our complete range of school uniforms, from blazers to sportswear.",
};

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Shop
            </p>
            <h1 className="font-serif text-4xl text-foreground md:text-5xl text-balance">
              All Uniforms
            </h1>
            <p className="mt-4 max-w-lg text-muted-foreground leading-relaxed">
              Browse our complete collection of premium school uniforms. Filter
              by category to find exactly what you need.
            </p>
          </div>
          <ProductsGrid />
        </div>
      </section>
      <Footer />
    </main>
  );
}
