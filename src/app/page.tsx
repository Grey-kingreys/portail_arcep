import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import StatsSection from '@/components/StatsSection'
import QuickActionsSection from '@/components/QuickActionsSection'
import ProfileAccessSection from '@/components/ProfileAccessSection'
import FloatingChat from '@/components/FloatingChat'
import type { Metadata } from "next";
 
// ─────────────────────────────────────────────────────────────
//  Metadata de la page d'accueil (utilisateurs non connectés)
//  URL : https://portail.arcep.ne/
// ─────────────────────────────────────────────────────────────
 
export const metadata: Metadata = {
  // ── Titre
  // Le template défini dans layout.tsx ("%s | ARCEP Niger") ne s'applique
  // pas ici car on veut un titre d'accueil différent et plus complet.
  title: {
    absolute: "ARCEP Niger — Portail des services numériques",
  },
 
  // ── Description (160 caractères max pour Google)
  description:
    "Votre guichet unique numérique : demandes de licences, autorisations, assignation de fréquences, plaintes consommateurs et suivi de dossiers en ligne.",
 
  // ── Mots-clés (moins critiques pour Google aujourd'hui, utiles pour Bing)
  keywords: [
    "ARCEP Niger",
    "portail numérique",
    "licence télécoms Niger",
    "autorisation opérateur",
    "assignation fréquences",
    "homologation équipements",
    "plainte consommateur télécoms",
    "régulation numérique Niger",
    "guichet unique ARCEP",
  ],
 
  // ── Canonique (évite le duplicate content si le site est accessible
  //    depuis plusieurs domaines)
  alternates: {
    canonical: "https://portail.arcep.ne",
    languages: {
      "fr-NE": "https://portail.arcep.ne",
    },
  },
 
  // ── Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    type: "website",
    url: "https://portail.arcep.ne",
    siteName: "ARCEP Niger",
    locale: "fr_NE",
    title: "ARCEP Niger — Portail des services numériques",
    description:
      "Accédez à tous les services de l'ARCEP Niger : licences, autorisations, plaintes, suivi de dossiers et bien plus encore.",
    images: [
      {
        url: "https://portail.arcep.ne/og-accueil.png", // image 1200×630 à créer
        width: 1200,
        height: 630,
        alt: "ARCEP Niger — Portail des services numériques",
        type: "image/png",
      },
    ],
  },
 
  // ── Twitter Card (X)
  twitter: {
    card: "summary_large_image",
    title: "ARCEP Niger — Portail des services numériques",
    description:
      "Votre guichet unique numérique : licences, autorisations, fréquences, plaintes et suivi de dossiers.",
    images: ["https://portail.arcep.ne/og-accueil.png"],
    // site: "@arcep_niger",  // ← décommenter si un compte Twitter/X existe
  },
 
  // ── Robots (indexation)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,         // extrait de longueur illimitée
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
 
  // ── Icônes (favicon, Apple touch icon)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // 180×180 à ajouter dans /public
  },
 
  // ── Informations sur l'application
  applicationName: "Portail ARCEP Niger",
  category: "government",
  classification: "Gouvernement / Régulation",
 
  // ── Auteur / éditeur
  authors: [{ name: "ARCEP Niger", url: "https://arcep.ne" }],
  creator: "ARCEP Niger",
  publisher: "Autorité de Régulation des Communications Électroniques et de la Poste du Niger",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <QuickActionsSection />
      <ProfileAccessSection />
      <FloatingChat />
    </main>
  )
}