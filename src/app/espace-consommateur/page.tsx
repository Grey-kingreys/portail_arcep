'use client'

import Link  from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquareWarning, Radio, BarChart3, FileText,
  ArrowLeft, ArrowRight, Search, ClipboardCheck, HelpCircle
} from "lucide-react";

const modules = [
  { icon: MessageSquareWarning, title: "Déposer une plainte", desc: "Signalez un problème de qualité, de facturation ou de fraude auprès d'un opérateur.", badge: "En ligne", cta: "Déposer" },
  { icon: ClipboardCheck, title: "Suivi de mes plaintes", desc: "Consultez l'état d'avancement de vos réclamations en temps réel.", cta: "Consulter" },
  { icon: Radio, title: "Signaler un brouillage", desc: "Déclarez un problème de brouillage radio affectant vos communications.", cta: "Signaler" },
  { icon: BarChart3, title: "Qualité de Service", desc: "Comparez les performances réseau des opérateurs (appels, internet, couverture).", cta: "Voir les indicateurs" },
  { icon: FileText, title: "Vos droits", desc: "Consultez vos droits en tant que consommateur de services télécoms et postaux.", cta: "En savoir plus" },
  { icon: HelpCircle, title: "FAQ & Guides", desc: "Trouvez des réponses aux questions fréquentes et des guides pratiques.", cta: "Consulter" },
];

const EspaceConsommateur = () => {
  return (
      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <div className="bg-secondary text-secondary-foreground py-8">
          <div className="container">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-primary transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
            </Link>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">
              Espace <span className="text-primary">Consommateur</span>
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              Déposez vos plaintes, suivez leur traitement et consultez les indicateurs de qualité de service.
            </p>
          </div>
        </div>

        <div className="container py-8">
          {/* Search */}
          <div className="relative max-w-lg mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un sujet, une procédure..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* CTA principal */}
          <Card className="mb-10 border-primary/30 bg-primary/5">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="p-4 rounded-2xl bg-primary/10">
                <MessageSquareWarning className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-display font-bold text-xl text-foreground mb-1">
                  Vous avez un problème avec un opérateur ?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Déposez votre plainte en quelques minutes. L'ARCEP assure le suivi et la médiation.
                </p>
              </div>
              <Button size="lg" className="font-display shrink-0">
                Déposer une plainte <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Modules */}
          <h2 className="font-display font-bold text-lg mb-4 text-foreground">Services disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod) => (
              <Card key={mod.title} className="group hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-accent">
                      <mod.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    {mod.badge && (
                      <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0">
                        {mod.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base font-display group-hover:text-primary transition-colors mt-2">
                    {mod.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">{mod.desc}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary font-semibold hover:bg-transparent">
                    {mod.cta} <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: "1 200+", label: "Plaintes traitées" },
              { value: "72h", label: "Délai moyen de réponse" },
              { value: "89%", label: "Taux de résolution" },
              { value: "4 op.", label: "Opérateurs suivis" },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-xl p-5 text-center border">
                <p className="font-display font-extrabold text-2xl text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
  );
};

export default EspaceConsommateur;
