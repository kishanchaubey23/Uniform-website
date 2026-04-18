"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";
import { products } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <section className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all products
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="animate-fade-up overflow-hidden rounded-2xl bg-card">
            <div className="relative aspect-[4/5]">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <div className="absolute top-6 left-6">
                  <Badge className="bg-foreground text-background border-none px-3 py-1 text-xs">
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mt-2 font-serif text-3xl text-foreground md:text-4xl text-balance">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-medium text-foreground">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <Separator className="my-8" />

            <div>
              <label className="mb-3 block text-xs font-medium uppercase tracking-widest text-foreground">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "flex h-11 min-w-[3rem] items-center justify-center rounded-lg border px-4 text-sm transition-all duration-300",
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Please select a size to continue
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <label className="mb-3 block text-xs font-medium uppercase tracking-widest text-foreground">
                Quantity
              </label>
              <div className="inline-flex items-center gap-4 rounded-lg border border-border bg-card px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2rem] text-center text-sm font-medium text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={cn(
                  "h-12 flex-1 rounded-full text-sm font-medium transition-all duration-300",
                  added
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-foreground text-background hover:bg-foreground/90",
                )}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                onClick={() => toggleWishlist(product.id)}
                variant="outline"
                className="h-12 rounded-full border-border px-6 text-sm font-medium transition-all duration-300 hover:border-foreground/30"
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors duration-300",
                    isInWishlist(product.id)
                      ? "fill-destructive text-destructive"
                      : "text-foreground",
                  )}
                />
                {isInWishlist(product.id)
                  ? "In Wishlist"
                  : "Add to Wishlist"}
              </Button>
            </div>

            <Separator className="my-8" />

            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground">
                Product Details
              </h3>
              <ul className="flex flex-col gap-2">
                {product.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="mb-8 font-serif text-2xl text-foreground md:text-3xl">
              You may also like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-2xl bg-card">
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {item.category}
                    </p>
                    <h3 className="mt-1 font-serif text-lg text-foreground transition-colors duration-300 group-hover:text-accent">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
