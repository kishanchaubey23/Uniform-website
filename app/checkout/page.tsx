import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata = {
  title: "Checkout | UniForm",
  description: "Complete your school uniform order.",
};

export default function CheckoutPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Checkout
            </p>
            <h1 className="font-serif text-4xl text-foreground md:text-5xl text-balance">
              Complete Your Order
            </h1>
          </div>
          <CheckoutForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
