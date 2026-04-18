const stats = [
  { value: "50+", label: "Partner Schools" },
  { value: "25K+", label: "Students Served" },
  { value: "15+", label: "Years Experience" },
  { value: "99%", label: "Satisfaction Rate" },
];

export function Stats() {
  return (
    <section className="border-y border-border py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl text-foreground md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
