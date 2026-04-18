"use client";

import React from "react"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Banknote,
  Check,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

type PaymentMethod = "card" | "wallet" | "cash";

const paymentMethods: { value: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { value: "card", label: "Credit / Debit Card", icon: CreditCard },
  { value: "wallet", label: "Digital Wallet", icon: Wallet },
  { value: "cash", label: "Cash on Delivery", icon: Banknote },
];

export function CheckoutForm() {
  const { items, cartTotal, clearCart } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [submitted, setSubmitted] = useState(false);

  const shippingCost = cartTotal >= 50 ? 0 : 5.99;
  const total = cartTotal + shippingCost;

  const onOrderComplete = async (paymentId: string | null = null) => {
    try {
      const firstName = (document.getElementById("firstName") as HTMLInputElement)?.value || "";
      const lastName = (document.getElementById("lastName") as HTMLInputElement)?.value || "";
      const email = (document.getElementById("email") as HTMLInputElement)?.value || "";
      const phone = (document.getElementById("phone") as HTMLInputElement)?.value || "";
      const customerName = `${firstName} ${lastName}`.trim();

      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      
      let orderRecordId = "ORD-" + Math.floor(Math.random() * 1000000);
      
      try {
        const { data, error } = await supabase.from('orders').insert({
          user_email: email,
          customer_name: customerName,
          phone,
          total,
          status: 'CONFIRMED',
          razorpay_order_id: paymentId,
          items: items.map(i => ({ id: i.product.id, size: i.size, qty: i.quantity, price: i.product.price }))
        }).select();

        if (data && data[0]) orderRecordId = data[0].id;
        if (error) console.error("Could not save to DB (might not be initialized):", error);
      } catch (dbError) {
        console.error("DB Error:", dbError);
      }

      await fetch('/api/email/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          customerName,
          orderId: orderRecordId,
          status: 'CONFIRMED',
          total
        })
      });

      setSubmitted(true);
      clearCart();
    } catch (e) {
      console.error("Failed to complete order routine:", e);
      // Fallback
      setSubmitted(true);
      clearCart();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (payment === "cash") {
      await onOrderComplete();
      return;
    }

    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();

      const firstName = (document.getElementById("firstName") as HTMLInputElement)?.value || "";
      const lastName = (document.getElementById("lastName") as HTMLInputElement)?.value || "";
      const email = (document.getElementById("email") as HTMLInputElement)?.value || "";
      const phone = (document.getElementById("phone") as HTMLInputElement)?.value || "";

      const options = {
        key: order.key_id, 
        amount: order.amount,
        currency: order.currency,
        name: "MK Creations",
        description: "School Uniform Purchase",
        order_id: order.id,
        handler: async function (response: any) {
          console.log("Payment successful", response);
          await onOrderComplete(response.razorpay_payment_id || order.id);
        },
        prefill: {
          name: `${firstName} ${lastName}`.trim() || undefined,
          email: email || undefined,
          contact: phone || undefined,
        },
        theme: {
          color: "#1c1917",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed", response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initialize payment gateway. Please try again later.");
    }
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-serif text-2xl text-foreground">
          Nothing to check out
        </h2>
        <p className="mt-2 max-w-sm text-muted-foreground leading-relaxed">
          Your bag is empty. Add some items before proceeding to checkout.
        </p>
        <Button
          asChild
          className="mt-8 h-12 rounded-full bg-foreground px-8 text-background hover:bg-foreground/90"
        >
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-up">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="font-serif text-3xl text-foreground">
          Order Confirmed
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground leading-relaxed">
          Thank you for your order! We&apos;ll send you a confirmation email
          shortly with tracking details.
        </p>
        <p className="mt-2 text-sm font-medium text-foreground">
          Order Total: ${total.toFixed(2)}
        </p>
        <Button
          asChild
          className="mt-8 h-12 rounded-full bg-foreground px-8 text-background hover:bg-foreground/90"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/cart"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="mt-6 grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-6 font-serif text-xl text-foreground">
                Contact Information
              </h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    required
                    placeholder="John"
                    className="h-11 rounded-lg bg-background"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    required
                    placeholder="Doe"
                    className="h-11 rounded-lg bg-background"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="h-11 rounded-lg bg-background"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="h-11 rounded-lg bg-background"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-6 font-serif text-xl text-foreground">
                Shipping Address
              </h3>
              <div className="grid gap-5">
                <div>
                  <Label
                    htmlFor="address"
                    className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground"
                  >
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    required
                    placeholder="123 Main Street"
                    className="h-11 rounded-lg bg-background"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="address2"
                    className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground"
                  >
                    Apartment, Suite, etc. (Optional)
                  </Label>
                  <Input
                    id="address2"
                    placeholder="Apt 4B"
                    className="h-11 rounded-lg bg-background"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <Label
                      htmlFor="city"
                      className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground"
                    >
                      City
                    </Label>
                    <Input
                      id="city"
                      required
                      placeholder="Noida"
                      className="h-11 rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="state"
                      className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground"
                    >
                      State
                    </Label>
                    <Input
                      id="state"
                      required
                      placeholder="UP"
                      className="h-11 rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="zip"
                      className="mb-2 block text-xs font-medium uppercase tracking-widest text-foreground"
                    >
                      Pin Code
                    </Label>
                    <Input
                      id="pincode"
                      required
                      placeholder="201301"
                      className="h-11 rounded-lg bg-background"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-6 font-serif text-xl text-foreground">
                Payment Method
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setPayment(method.value)}
                      className={cn(
                        "flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-all duration-300",
                        payment === method.value
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                      )}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-sm font-medium">
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {(payment === "card" || payment === "wallet") && (
                <p className="mt-6 text-sm text-muted-foreground animate-fade-up">
                  You will be securely redirected to Razorpay to complete your payment after placing the order.
                </p>
              )}

              {payment === "cash" && (
                <p className="mt-6 text-sm text-muted-foreground animate-fade-up">
                  Payment will be collected upon delivery. Please have the exact
                  amount ready.
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="sticky top-28 rounded-2xl border border-border bg-card p-6">
              <h3 className="font-serif text-xl text-foreground">
                Order Review
              </h3>
              <Separator className="my-5" />

              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4"
                  >
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground leading-tight">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size} &middot; Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm text-foreground">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-5" />

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <Separator className="my-5" />

              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Total</span>
                <span className="text-lg font-medium text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button
                type="submit"
                className="mt-6 h-12 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                Place Order
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground leading-relaxed">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
