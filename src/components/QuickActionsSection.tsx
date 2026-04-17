import { ArrowRight, FileText, AlertTriangle, Radio, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const actions = [
  {
    icon: FileText,
    title: "Déposer une demande de licence",
    desc: "Remplissez le formulaire en ligne et suivez l'avancement.",
    cta: "Commencer",
    href: "/espace-operateur",
  },
  {
    icon: AlertTriangle,
    title: "Signaler une plainte",
    desc: "Problème de qualité, facturation ou fraude ? Signalez-le.",
    cta: "Déposer",
    href: "/espace-consommateur",
  },
  {
    icon: Radio,
    title: "Demander une fréquence",
    desc: "Attribution de fréquences avec paiement en ligne sécurisé.",
    cta: "Demander",
    href: "/espace-operateur",
  },
  {
    icon: CreditCard,
    title: "Payer des frais réglementaires",
    desc: "Paiement sécurisé via OTM ou STA.",
    cta: "Payer",
    href: "/espace-operateur",
  },
];

const QuickActionsSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Actions <span className="text-primary">rapides</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Accédez directement aux démarches les plus courantes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group relative p-6 rounded-2xl bg-card border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-accent w-fit mb-4">
                <action.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{action.desc}</p>
              <span className="inline-flex items-center text-sm p-0 h-auto text-primary font-semibold">
                {action.cta} <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActionsSection;
