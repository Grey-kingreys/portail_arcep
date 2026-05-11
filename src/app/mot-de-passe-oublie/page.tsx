"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, AlertCircle, Loader2, CheckCircle2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import arcepLogo from "@/assets/arcep-logo-reference.png";

// ─── Mock (à remplacer par l'appel API réel) ─────────────────────────────────
async function mockRequestReset(email: string) {
  await new Promise((res) => setTimeout(res, 1200));
  // On ne révèle jamais si l'email existe ou pas (bonne pratique sécurité)
  if (email.length < 5) throw new Error("Adresse e-mail invalide.");
}
// ─────────────────────────────────────────────────────────────────────────────

const ForgotPasswordPage = () => {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [sent, setSent]       = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    setLoading(true);
    try {
      await mockRequestReset(email);
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  // ── Écran de confirmation ──────────────────────────────────────────────────
  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-secondary" />
              </div>
            </div>

            <h1 className="font-display font-extrabold text-2xl text-foreground mb-3">
              E-mail envoyé !
            </h1>

            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              Si un compte est associé à
            </p>
            <p className="font-semibold text-foreground text-sm mb-4">{email}</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              vous recevrez un lien pour réinitialiser votre mot de passe.
              Vérifiez également vos spams.
            </p>

            {/* Info sécurité */}
            <div className="bg-muted/60 rounded-xl p-4 text-left mb-8">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Bon à savoir :</span>{" "}
                Le lien de réinitialisation est valable <span className="font-medium text-foreground">30 minutes</span>.
                Passé ce délai, vous devrez refaire une demande.
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full font-display" asChild>
                <Link href="/connexion">Retour à la connexion</Link>
              </Button>
              <Button variant="ghost" className="w-full text-sm text-muted-foreground"
                onClick={() => { setSent(false); }}>
                Renvoyer l'e-mail
              </Button>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <img src={arcepLogo.src} alt="ARCEP Niger" className="h-8 w-auto opacity-40" />
          </div>
        </div>
      </div>
    );
  }

  // ── Formulaire de demande ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <img src={arcepLogo.src} alt="ARCEP Niger" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">

          {/* Icône */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <KeyRound className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="font-display font-extrabold text-2xl text-foreground text-center mb-2">
            Mot de passe oublié ?
          </h1>
          <p className="text-muted-foreground text-sm text-center leading-relaxed mb-8">
            Saisissez votre adresse e-mail. Nous vous enverrons un lien
            pour réinitialiser votre mot de passe.
          </p>

          {error && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Adresse e-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="email"
                  autoFocus
                  className="h-11 pl-9 text-sm"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 font-display font-semibold text-sm gap-2">
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours…</>
              ) : (
                "Envoyer le lien de réinitialisation"
              )}
            </Button>
          </form>
        </div>

        {/* Lien retour */}
        <div className="flex justify-center mt-6">
          <Link href="/connexion"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour à la connexion
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;