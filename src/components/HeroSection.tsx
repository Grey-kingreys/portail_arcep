import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-secondary-foreground overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full border-2 border-primary" />
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border border-primary/50" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full border border-white/20" />
      </div>

      <div className="container relative py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/90 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Portail des services numériques
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 animate-fade-in-up">
            Votre guichet unique{" "}
            <span className="text-primary">numérique</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Accédez à tous les services de l'ARCEP Niger : demandes de licences,
            autorisations, plaintes, suivi de dossiers et bien plus encore.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un service, une procédure..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-foreground text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button size="lg" className="font-display shadow-lg">
              Rechercher
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {[
              { tag: "Demande de licence", href: "/espace-operateur" },
              { tag: "Plainte consommateur", href: "/espace-consommateur" },
              { tag: "Homologation", href: "/espace-operateur" },
              { tag: "Fréquences", href: "/espace-operateur" },
            ].map(({ tag, href }) => (
              <Link
                key={tag}
                href={href}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/90 hover:bg-white/20 transition-colors flex items-center gap-1"
              >
                {tag} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
