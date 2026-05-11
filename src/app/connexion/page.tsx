'use client'

import { useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import arcepLogo from "@/assets/arcep-logo-reference.png";

// ─── Mock auth service (à remplacer par l'appel Keycloak réel) ──────────────
async function mockLogin(identifier: string, password: string) {
  await new Promise((res) => setTimeout(res, 1200)); // simuler latence réseau

  const users: Record<string, { name: string; role: string; profil: string }> = {
    "agent@arcep.ne":    { name: "Moussa Mahamane",  role: "AGENT_INTERNE",  profil: "Agent ARCEP" },
    "operateur@mtn.ne":  { name: "Ibrahim Issoufou", role: "OPERATEUR",       profil: "Opérateur Télécom" },
    "usager@gmail.com":  { name: "Fatouma Saidou",   role: "CONSOMMATEUR",   profil: "Usager" },
    "partenaire@ansi.ne":{ name: "Ali Mahamadou",    role: "PARTENAIRE",     profil: "Partenaire Institutionnel" },
  };

  const user = users[identifier.toLowerCase()];
  if (!user || password.length < 4) {
    throw new Error("Identifiant ou mot de passe incorrect.");
  }
  return { token: "mock-jwt-token", ...user };
}
// ─────────────────────────────────────────────────────────────────────────────

const DASHBOARD_ROUTES: Record<string, string> = {
  AGENT_INTERNE: "/dashboard/agent",
  OPERATEUR:     "/espace-operateur",
  CONSOMMATEUR:  "/espace-consommateur",
  PARTENAIRE:    "/partenaire",
};

const LoginPage = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword]     = useState("");
  const [showPwd, setShowPwd]       = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const result = await mockLogin(identifier.trim(), password);
      // Stocker le token (à migrer vers cookie httpOnly côté backend)
      sessionStorage.setItem("arcep_token", result.token);
      sessionStorage.setItem("arcep_user",  JSON.stringify({ name: result.name, profil: result.profil, role: result.role }));

      const route = DASHBOARD_ROUTES[result.role] ?? "/";
      router.push(route);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Panneau gauche — visuel ARCEP ── */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-gradient-hero relative overflow-hidden">
        {/* Décorations */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-16 right-10  w-72 h-72 rounded-full border-2 border-white" />
          <div className="absolute bottom-20 left-6  w-48 h-48 rounded-full border   border-white/60" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full border   border-white/20" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-4">
          <img src={arcepLogo.src} alt="ARCEP Niger" className="h-12 w-auto" />
        </div>

        {/* Message central */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm text-white/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Portail des services numériques
          </div>
          <h2 className="font-display font-extrabold text-4xl text-white leading-tight mb-4">
            Votre espace<br />
            <span className="text-primary">personnalisé</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            Connectez-vous pour accéder à vos services ARCEP : demandes de licences,
            suivi de dossiers, gestion de plaintes et bien plus encore.
          </p>
        </div>

        {/* Profils disponibles */}
        <div className="relative space-y-2">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-3 font-display">
            Accès pour
          </p>
          {[
            { label: "Opérateurs Télécoms",         color: "bg-primary/20 text-primary" },
            { label: "Agents internes ARCEP",        color: "bg-white/10 text-white/80" },
            { label: "Usagers & Consommateurs",      color: "bg-white/10 text-white/80" },
            { label: "Partenaires Institutionnels",  color: "bg-white/10 text-white/80" },
          ].map(({ label, color }) => (
            <div key={label} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium mr-2 ${color}`}>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Panneau droit — formulaire ── */}
      <div className="flex-1 flex flex-col">

        {/* Top bar mobile */}
        <div className="lg:hidden bg-secondary text-secondary-foreground px-4 py-3 flex items-center justify-between">
          <img src={arcepLogo.src} alt="ARCEP Niger" className="h-12 w-auto" />
          <Link href="/" className="text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Accueil
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">

            {/* Retour accueil desktop */}
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>

            {/* En-tête formulaire */}
            <div className="mb-8">
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground mb-2">
                Connexion
              </h1>
              <p className="text-muted-foreground text-sm">
                Entrez vos identifiants pour accéder à votre espace personnel.
              </p>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-sm font-medium text-foreground">
                  Adresse e-mail ou identifiant
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="ex: nom@arcep.ne"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={loading}
                  autoComplete="username"
                  className="h-11 text-sm"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Mot de passe
                  </Label>
                  <Link
                    href="/mot-de-passe-oublie"
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                    className="h-11 text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                    aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 font-display font-semibold text-sm gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connexion en cours…
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Se connecter
                  </>
                )}
              </Button>
            </form>

            {/* Séparateur */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">ou</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Créer un compte */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Vous êtes un usager et n'avez pas encore de compte ?
              </p>
              <Button variant="outline" className="w-full h-11 font-display font-semibold text-sm" asChild>
                <Link href="/inscription">Créer mon compte</Link>
              </Button>
            </div>

            {/* Comptes de test — à retirer en prod */}
            <div className="mt-8 p-4 rounded-xl bg-muted/60 border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 font-display">
                Comptes de démonstration
              </p>
              <div className="space-y-1 text-xs text-muted-foreground font-mono">
                <p><span className="text-foreground">agent@arcep.ne</span>     — Agent interne</p>
                <p><span className="text-foreground">operateur@mtn.ne</span>   — Opérateur télécom</p>
                <p><span className="text-foreground">usager@gmail.com</span>   — Usager grand public</p>
                <p className="text-muted-foreground/60 pt-1">Mot de passe : n'importe lequel (≥4 caractères)</p>
              </div>
            </div>

            {/* Footer légal */}
            <p className="text-xs text-muted-foreground text-center mt-8 leading-relaxed">
              En vous connectant, vous acceptez les{" "}
              <Link href="/conditions" className="text-primary hover:underline">conditions d'utilisation</Link>
              {" "}et la{" "}
              <Link href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</Link>
              {" "}de l'ARCEP Niger.
            </p>

          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;