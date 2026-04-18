"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Search,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const schools = [
  {
    name: "St. Andrews Academy",
    location: "123 Oak Street, Riverside",
    phone: "+1 (555) 100-2001",
    email: "uniform@standrews.edu",
    students: "1,200+",
  },
  {
    name: "Greenfield Public School",
    location: "45 Maple Avenue, Lakewood",
    phone: "+1 (555) 200-3002",
    email: "orders@greenfieldps.edu",
    students: "800+",
  },
  {
    name: "Westminster High",
    location: "78 Elm Boulevard, Hilltop",
    phone: "+1 (555) 300-4003",
    email: "uniforms@westminster.edu",
    students: "1,500+",
  },
  {
    name: "Sunrise International",
    location: "90 Cedar Lane, Eastport",
    phone: "+1 (555) 400-5004",
    email: "store@sunrise-intl.edu",
    students: "950+",
  },
  {
    name: "Maplewood Grammar School",
    location: "12 Birch Road, Westfield",
    phone: "+1 (555) 500-6005",
    email: "uniform@maplewood.edu",
    students: "600+",
  },
  {
    name: "Horizon Valley School",
    location: "34 Pine Crescent, Northgate",
    phone: "+1 (555) 600-7006",
    email: "orders@horizonvalley.edu",
    students: "1,100+",
  },
];

export function Schools() {
  const [query, setQuery] = useState("");

  const filtered = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="schools" className="bg-primary py-24 text-primary-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-primary-foreground/50">
              Our partner schools
            </p>
            <h2 className="font-serif text-4xl text-primary-foreground md:text-5xl text-balance">
              Find your school
            </h2>
          </div>

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/40" />
            <Input
              placeholder="Search schools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-full border-primary-foreground/20 bg-primary-foreground/10 pl-11 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-primary-foreground/30"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((school) => (
            <div
              key={school.name}
              className="group rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 transition-all duration-500 hover:border-primary-foreground/25 hover:bg-primary-foreground/10"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="font-serif text-xl text-primary-foreground">
                  {school.name}
                </h3>
                <ChevronRight className="mt-1 h-4 w-4 text-primary-foreground/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary-foreground/70" />
              </div>

              <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{school.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{school.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>{school.email}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-primary-foreground/10 pt-4">
                <span className="text-xs uppercase tracking-widest text-primary-foreground/40">
                  Students served
                </span>
                <span className="ml-auto font-serif text-lg text-primary-foreground/80">
                  {school.students}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-primary-foreground/50">
              No schools found matching your search. Contact us to add your school.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
