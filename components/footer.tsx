import Link from "next/link";

const footerLinks = {
  Navigation: [
    { label: "Home", href: "#" },
    { label: "Categories", href: "#categories" },
    { label: "Schools", href: "#schools" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  Support: [
    { label: "Size Guide", href: "#" },
    { label: "Returns Policy", href: "#" },
    { label: "Delivery Info", href: "#" },
    { label: "FAQs", href: "#" },
  ],
  Contact: [
    { label: "[EMAIL_ADDRESS]", href: "mailto:[EMAIL_ADDRESS]" },
    { label: "+91 764657xxxx", href: "tel:+91764657xxxx" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link
              href="#"
              className="font-serif text-2xl tracking-tight text-foreground"
            >
              MK Creations
            </Link>
            <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
              Premium school uniforms trusted by institutions and loved by
              families across the region.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground">
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MK Creations. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
