'use client';

import {
  FileText, ShieldCheck, MessageSquareWarning, Radio,
  BarChart3, Hash, Award, Zap, ClipboardList, PackageSearch,
  Users2, BookOpen
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  badge?: string;
};

type ServiceCategory = {
  label: string;
  services: Service[];
};

const serviceCategories: Record<string, ServiceCategory> = {
  juridique: {
    label: "Régimes Juridiques",
    services: [
      { icon: ShieldCheck, title: "Licences & Autorisations", desc: "Demande, renouvellement et suivi des licences télécoms et postales.", badge: "En ligne" },
      { icon: Award, title: "Agréments", desc: "Traitement des demandes d'agrément avec suivi du workflow complet." },
      { icon: Radio, title: "Assignation de Fréquences", desc: "Demande et attribution des fréquences avec paiement intégré." },
      { icon: Hash, title: "Ressources en Numérotation", desc: "Attribution et suivi des plages de numéros et préfixes." },
      { icon: Zap, title: "Homologation", desc: "Validation technique et administrative des équipements." },
      { icon: ClipboardList, title: "Décisions", desc: "Centralisation et consultation des décisions réglementaires." },
    ],
  },

  consommateurs: {
    label: "Consommateurs",
    services: [
      { icon: MessageSquareWarning, title: "Plaintes & Réclamations", desc: "Signalement et suivi des plaintes avec classification automatique.", badge: "En ligne" },
      { icon: Radio, title: "Brouillage", desc: "Déclaration et suivi des plaintes de brouillage radio." },
      { icon: BarChart3, title: "Qualité de Service (QoS)", desc: "Suivi en temps réel des indicateurs de performance réseau." },
    ],
  },

  statistiques: {
    label: "Statistiques & Rapports",
    services: [
      { icon: BarChart3, title: "Tableau de Bord", desc: "Vue consolidée des KPI et indicateurs de performance du secteur.", badge: "Nouveau" },
      { icon: BookOpen, title: "Rapports Périodiques", desc: "Rapports mensuels, trimestriels et annuels avec export multi-formats." },
      { icon: FileText, title: "Documents Réglementaires", desc: "Consultation et téléchargement des textes et guides." },
    ],
  },

  interne: {
    label: "Modules Internes",
    services: [
      { icon: FileText, title: "Gestion du Courrier", desc: "Courrier entrant/sortant, assignation, signatures électroniques." },
      { icon: Users2, title: "SIRH", desc: "Gestion RH complète : carrières, formations, évaluations, compétences." },
      { icon: PackageSearch, title: "Stocks & Approvisionnement", desc: "Gestion des achats, inventaire, parc auto et bâtiments." },
    ],
  },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 lg:py-20 bg-arcep-warm">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Nos <span className="text-primary">services</span> & modules
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            6 plateformes intégrées couvrant l'ensemble des activités de régulation de l'ARCEP Niger.
          </p>
        </div>

        <Tabs defaultValue="juridique" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 mb-8 justify-center">
            {Object.entries(serviceCategories).map(([key, cat]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="font-display data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5 py-2.5 rounded-full border border-border data-[state=active]:border-primary"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(serviceCategories).map(([key, cat]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.services.map((service) => (
                  <Card
                    key={service.title}
                    className="group hover:shadow-md transition-all duration-300 cursor-pointer hover:border-primary/30"
                  >
                    <CardContent className="p-5 flex gap-4">
                      <div className="shrink-0 p-2.5 rounded-lg bg-accent h-fit">
                        <service.icon className="h-5 w-5 text-accent-foreground" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-semibold text-sm group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>

                          {service.badge && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0"
                            >
                              {service.badge}
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ServicesSection;