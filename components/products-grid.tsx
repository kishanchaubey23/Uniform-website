"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function ProductsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { toggleWishlist, isInWishlist } = useCart();

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm transition-all duration-300",
              activeCategory === cat
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product, i) => (
          <div
            key={product.id}
            className="group animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-card">
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-[4/5]">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </Link>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all duration-300 hover:bg-background"
                aria-label={
                  isInWishlist(product.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors duration-300",
                    isInWishlist(product.id)
                      ? "fill-destructive text-destructive"
                      : "text-muted-foreground",
                  )}
                />
              </button>

              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-foreground text-background border-none">
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {product.category}
              </p>
              <Link href={`/products/${product.id}`}>
                <h3 className="mt-1 font-serif text-lg text-foreground transition-colors duration-300 hover:text-accent">
                  {product.name}
                </h3>
              </Link>
              <p className="mt-1 text-sm font-medium text-foreground">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
