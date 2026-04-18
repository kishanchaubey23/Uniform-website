"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { createClient } from "@/lib/supabase/client";
import { signout } from "@/app/auth/actions";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/#categories" },
  { label: "Schools", href: "/#schools" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Initial fetch
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl tracking-tight text-foreground">
          MK Creations
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:text-foreground"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={signout}>
                  <DropdownMenuItem asChild>
                    <button type="submit" className="w-full text-left">
                      Sign Out
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          <Button
            asChild
            className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90 ml-2"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="animate-fade-in border-t border-border bg-background px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                <ShoppingBag className="h-5 w-5" />
                Cart
                {cartCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                </li>
                <li>
                  <form action={signout}>
                    <button
                      type="submit"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground text-left w-full"
                    >
                      Sign Out
                    </button>
                  </form>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  <User className="h-5 w-5" />
                  Sign In
                </Link>
              </li>
            )}
            <li className="pt-2">
              <Button
                asChild
                className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/products" onClick={() => setOpen(false)}>
                  Shop Now
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
