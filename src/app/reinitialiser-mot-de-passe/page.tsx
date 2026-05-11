'use client'

import { useState } from "react";
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, AlertCircle, Loader2, CheckCircle2, Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import arcepLogo from "@/assets/arcep-logo-reference.png";

// ─── Mock (à remplacer par l'appel API réel) ─────────────────────────────────
async function mockResetPassword(_token: string, _password: string) {
  await new Promise((res) => setTimeout(res, 1300));
  // Simuler token expiré pour tester
  if (_token === "expired") throw new Error("EXPIRED");
}
// ─────────────────────────────────────────────────────────────────────────────

function getPasswordStrength(pwd: string): { level: number; label: string; color: string } {
  if (pwd.length === 0)  return { level: 0, label: "",          color: "" };
  if (pwd.length < 6)    return { level: 1, label: "Faible",    color: "bg-destructive" };
  if (pwd.length < 8)    return { level: 2, label: "Moyen",     color: "bg-primary" };
  const strong = /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd);
  if (strong)            return { level: 4, label: "Très fort", color: "bg-secondary" };
  return                        { level: 3, label: "Fort",      color: "bg-secondary/70" };
}

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword]           = useState("");
  const [confirmPassword, setConfirm]     = useState("");
  const [showPwd, setShowPwd]             = useState(false);
  const [showCPwd, setShowCPwd]           = useState(false);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");
  const [success, setSuccess]             = useState(false);
  const [tokenExpired, setTokenExpired]   = useState(false);

  const strength = getPasswordStrength(password);

  // ── Token absent → lien invalide ─────────────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-foreground mb-3">Lien invalide</h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Ce lien de réinitialisation est invalide ou a déjà été utilisé.
            Veuillez faire une nouvelle demande.
          </p>
          <Button className="w-full font-display" asChild>
            <Link href="/mot-de-passe-oublie">Faire une nouvelle demande</Link>
          </Button>
        </div>
      </div>
    );
  }

  // ── Token expiré ──────────────────────────────────────────────────────────
  if (tokenExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldAlert className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-foreground mb-3">
            Lien expiré
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Votre lien de réinitialisation a expiré (validité : 30 minutes).
            Veuillez faire une nouvelle demande.
          </p>
          <div className="space-y-3">
            <Button className="w-full font-display" asChild>
              <Link href="/mot-de-passe-oublie">Nouvelle demande</Link>
            </Button>
            <Button variant="ghost" className="w-full text-sm" asChild>
              <Link href="/connexion">Retour à la connexion</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Succès ────────────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-secondary" />
            </div>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-foreground mb-3">
            Mot de passe mis à jour !
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Votre mot de passe a été réinitialisé avec succès.
            Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </p>
          <Button className="w-full font-display" onClick={() => router.push("/connexion")}>
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  // ── Formulaire ────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      await mockResetPassword(token, password);
      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "EXPIRED") {
        setTokenExpired(true);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

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

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <Lock className="h-8 w-8 text-secondary" />
            </div>
          </div>

          <h1 className="font-display font-extrabold text-2xl text-foreground text-center mb-2">
            Nouveau mot de passe
          </h1>
          <p className="text-muted-foreground text-sm text-center leading-relaxed mb-8">
            Choisissez un mot de passe sécurisé pour votre compte ARCEP Niger.
          </p>

          {error && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Nouveau mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Nouveau mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Minimum 6 caractères"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                  autoFocus
                  className="h-11 pl-9 pr-10 text-sm"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Force du mot de passe */}
              {password.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength.level ? strength.color : "bg-border"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Force : <span className="font-medium text-foreground">{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirmer */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmer le mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showCPwd ? "text" : "password"}
                  placeholder="Répétez votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirm(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                  className={`h-11 pl-9 pr-10 text-sm ${
                    confirmPassword && password !== confirmPassword
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
                <button type="button" onClick={() => setShowCPwd(!showCPwd)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showCPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive">Les mots de passe ne correspondent pas.</p>
              )}
            </div>

            {/* Règles */}
            <div className="bg-muted/60 rounded-xl p-3 space-y-1.5">
              <p className="text-xs font-semibold text-foreground mb-1">Critères recommandés :</p>
              {[
                { rule: "Au moins 6 caractères",          ok: password.length >= 6 },
                { rule: "Au moins une majuscule (A–Z)",   ok: /[A-Z]/.test(password) },
                { rule: "Au moins un chiffre (0–9)",      ok: /[0-9]/.test(password) },
                { rule: "Au moins un caractère spécial",  ok: /[^A-Za-z0-9]/.test(password) },
              ].map(({ rule, ok }) => (
                <div key={rule} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${password.length > 0 ? (ok ? "bg-secondary" : "bg-border") : "bg-border"}`} />
                  <span className={`text-xs ${password.length > 0 ? (ok ? "text-foreground" : "text-muted-foreground") : "text-muted-foreground"}`}>
                    {rule}
                  </span>
                </div>
              ))}
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 font-display font-semibold text-sm gap-2">
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Mise à jour…</>
              ) : (
                "Réinitialiser mon mot de passe"
              )}
            </Button>
          </form>
        </div>

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

export default ResetPasswordPage;