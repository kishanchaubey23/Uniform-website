"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";

export function CartContent() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-serif text-2xl text-foreground">
          Your bag is empty
        </h2>
        <p className="mt-2 max-w-sm text-muted-foreground leading-relaxed">
          Looks like you haven&apos;t added any uniforms to your bag yet. Browse
          our collection to find what you need.
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

  return (
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="animate-fade-up flex gap-5 rounded-2xl border border-border bg-card p-4 sm:p-6"
            >
              <Link
                href={`/products/${item.product.id}`}
                className="shrink-0 overflow-hidden rounded-xl"
              >
                <div className="relative h-28 w-24 sm:h-36 sm:w-28">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {item.product.category}
                  </p>
                  <Link href={`/products/${item.product.id}`}>
                    <h3 className="mt-0.5 font-serif text-lg text-foreground transition-colors hover:text-accent">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Size: {item.size}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-1">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity - 1,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity + 1,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.size)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-destructive"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="sticky top-28 rounded-2xl border border-border bg-card p-6">
          <h3 className="font-serif text-xl text-foreground">Order Summary</h3>
          <Separator className="my-5" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <span className="text-foreground">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">
                {cartTotal >= 50 ? "Free" : "$5.99"}
              </span>
            </div>
          </div>

          <Separator className="my-5" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-lg font-medium text-foreground">
              ${(cartTotal >= 50 ? cartTotal : cartTotal + 5.99).toFixed(2)}
            </span>
          </div>

          {cartTotal < 50 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Add ${(50 - cartTotal).toFixed(2)} more for free shipping
            </p>
          )}

          <Button
            asChild
            className="mt-6 h-12 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            <Link href="/checkout">
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="mt-3 h-10 w-full rounded-full border-border text-foreground hover:border-foreground/30 bg-transparent"
          >
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
