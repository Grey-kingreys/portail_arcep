const stats = [
  { value: "6", label: "Plateformes intégrées" },
  { value: "100%", label: "Dématérialisation" },
  { value: "24/7", label: "Accessibilité" },
  { value: "Temps réel", label: "Suivi des demandes" },
];

const StatsSection = () => {
  return (
    <section className="py-12 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-extrabold text-3xl md:text-4xl text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-secondary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
