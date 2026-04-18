import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartContent } from "@/components/cart-content";

export const metadata = {
  title: "Your Cart | MK Creations",
  description: "Review your selected school uniform items.",
};

export default function CartPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Cart
            </p>
            <h1 className="font-serif text-4xl text-foreground md:text-5xl text-balance">
              Your Bag
            </h1>
          </div>
          <CartContent />
        </div>
      </section>
      <Footer />
    </main>
  );
}
