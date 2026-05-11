import { Metadata } from 'next'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link'
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck, Radio, Hash, Zap, Award,
  BarChart3, CreditCard, FileText, ArrowRight, ArrowLeft
} from "lucide-react";

export const metadata: Metadata = {
  title: 'Espace Opérateur',    // → "Espace Opérateur | ARCEP" (grâce au template)
  description: 'Accédez à vos démarches réglementaires, déclarez vos réseaux...',
  keywords: ['ARCEP', 'opérateur', 'régulation', 'télécommunications'],
  openGraph: {
    title: 'Espace Opérateur | ARCEP',
    description: 'Accédez à vos démarches réglementaires...',
    url: 'https://portail.arcep.fr/espace-operateur',
    siteName: 'ARCEP',
    images: [{ url: '/og-operateur.png', width: 1200, height: 630 }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Espace Opérateur | ARCEP',
    images: ['/og-operateur.png'],
  },
}




const modules = [
  { icon: ShieldCheck, title: "Licences & Autorisations", desc: "Demande, renouvellement et suivi des licences télécoms et postales.", badge: "En ligne", status: "12 demandes en cours" },
  { icon: Award, title: "Agréments", desc: "Traitement des demandes d'agrément avec suivi du workflow complet.", status: "3 en attente" },
  { icon: Radio, title: "Assignation de Fréquences", desc: "Demande et attribution des fréquences avec paiement intégré.", badge: "En ligne", status: "5 assignations actives" },
  { icon: Hash, title: "Ressources en Numérotation", desc: "Attribution et suivi des plages de numéros et préfixes.", status: "8 plages attribuées" },
  { icon: Zap, title: "Homologation d'Équipements", desc: "Validation technique et administrative des équipements.", status: "2 en cours de validation" },
  { icon: BarChart3, title: "Déclarations QoS", desc: "Déposez vos rapports de qualité de service périodiques.", badge: "Obligatoire", status: "Prochain dépôt : 30 mars" },
];

const quickActions = [
  { icon: FileText, label: "Nouvelle demande de licence", color: "bg-primary text-primary-foreground" },
  { icon: Radio, label: "Demander une fréquence", color: "bg-accent text-accent-foreground" },
  { icon: Zap, label: "Homologuer un équipement", color: "bg-accent text-accent-foreground" },
  { icon: CreditCard, label: "Payer des redevances", color: "bg-primary text-primary-foreground" },
];



export default function EspaceOperateurPage() {
  return (
      <main className="flex-1 bg-muted/30">
        {/* Breadcrumb + Title */}
        <div className="bg-secondary text-secondary-foreground py-8">
          <div className="container">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-primary transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
            </Link>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">
              Espace <span className="text-primary">Opérateur</span>
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              Gérez vos licences, fréquences, homologations et obligations réglementaires depuis un portail centralisé.
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="container py-8">
          <h2 className="font-display font-bold text-lg mb-4 text-foreground">Actions rapides</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className={`${action.color} rounded-xl p-4 text-left hover:opacity-90 transition-opacity`}
              >
                <action.icon className="h-5 w-5 mb-2" />
                <span className="text-sm font-semibold font-display">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Modules */}
          <h2 className="font-display font-bold text-lg mb-4 text-foreground">Vos modules</h2>
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
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground/80">{mod.status}</span>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats summary */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: "12", label: "Demandes en cours" },
              { value: "47", label: "Licences actives" },
              { value: "5", label: "Fréquences assignées" },
              { value: "98%", label: "Taux de conformité" },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-xl p-5 text-center border">
                <p className="font-display font-extrabold text-2xl text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
  )
}