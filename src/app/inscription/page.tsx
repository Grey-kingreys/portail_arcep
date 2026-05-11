'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {
  Eye, EyeOff, UserPlus, ArrowLeft, AlertCircle,
  Loader2, CheckCircle2, User, Mail, Phone, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import arcepLogo from "@/assets/arcep-logo-reference.png";

// ─── Mock register (à remplacer par l'appel API réel) ────────────────────────
async function mockRegister(_data: RegisterForm) {
  await new Promise((res) => setTimeout(res, 1400));
  // Simuler un email déjà utilisé pour tester l'erreur
  if (_data.email === "test@test.com") {
    throw new Error("Cette adresse e-mail est déjà associée à un compte.");
  }
}
// ─────────────────────────────────────────────────────────────────────────────

interface RegisterForm {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const INITIAL_FORM: RegisterForm = {
  prenom: "", nom: "", email: "", telephone: "",
  password: "", confirmPassword: "", acceptTerms: false,
};

// Indicateur de force du mot de passe
function getPasswordStrength(pwd: string): { level: number; label: string; color: string } {
  if (pwd.length === 0)  return { level: 0, label: "",          color: "" };
  if (pwd.length < 6)    return { level: 1, label: "Faible",    color: "bg-destructive" };
  if (pwd.length < 8)    return { level: 2, label: "Moyen",     color: "bg-primary" };
  const strong = /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd);
  if (strong)            return { level: 4, label: "Très fort", color: "bg-secondary" };
  return                        { level: 3, label: "Fort",      color: "bg-secondary/70" };
}

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm]         = useState<RegisterForm>(INITIAL_FORM);
  const [showPwd, setShowPwd]   = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);

  const set = (field: keyof RegisterForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: field === "acceptTerms" ? e.target.checked : e.target.value }));

  const validate = (): string => {
    if (!form.prenom.trim())       return "Le prénom est requis.";
    if (!form.nom.trim())          return "Le nom est requis.";
    if (!form.email.includes("@")) return "Adresse e-mail invalide.";
    if (form.password.length < 6)  return "Le mot de passe doit contenir au moins 6 caractères.";
    if (form.password !== form.confirmPassword) return "Les mots de passe ne correspondent pas.";
    if (!form.acceptTerms)         return "Vous devez accepter les conditions d'utilisation.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      await mockRegister(form);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(form.password);

  // ── Écran de succès ──────────────────────────────────────────────────────
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
            Compte créé avec succès !
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            Un e-mail de confirmation a été envoyé à
          </p>
          <p className="font-semibold text-foreground text-sm mb-6">{form.email}</p>
          <p className="text-muted-foreground text-xs leading-relaxed mb-8 max-w-sm mx-auto">
            Cliquez sur le lien dans l'e-mail pour activer votre compte et accéder
            à vos services ARCEP Niger.
          </p>
          <Button className="w-full font-display" onClick={() => router.push("/connexion")}>
            Aller à la page de connexion
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Vous n'avez pas reçu l'e-mail ?{" "}
            <button className="text-primary hover:underline" onClick={() => setSuccess(false)}>
              Renvoyer
            </button>
          </p>
        </div>
      </div>
    );
  }

  // ── Formulaire ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* Panneau gauche */}
      <div className="hidden lg:flex lg:w-[40%] flex-col justify-between p-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-16 right-10 w-72 h-72 rounded-full border-2 border-white" />
          <div className="absolute bottom-20 left-6 w-48 h-48 rounded-full border border-white/60" />
        </div>

        <div className="relative flex items-center gap-4">
          <img src={arcepLogo.src} alt="ARCEP Niger" className="h-12 w-auto" />
          <div>
            <p className="font-display font-bold text-white text-base leading-tight">ARCEP Niger</p>
            <p className="text-white/60 text-xs leading-tight">
              Portail des services numériques
            </p>
          </div>
        </div>

        <div className="relative">
          <h2 className="font-display font-extrabold text-4xl text-white leading-tight mb-4">
            Rejoignez<br />
            <span className="text-primary">l'ARCEP</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-sm mb-8">
            Créez votre espace personnel pour déposer vos plaintes,
            suivre vos dossiers et accéder aux services numériques de l'ARCEP Niger.
          </p>
          <div className="space-y-3">
            {[
              "Dépôt de plaintes en ligne",
              "Suivi en temps réel de vos dossiers",
              "Messagerie sécurisée avec l'ARCEP",
              "Accès aux documents réglementaires",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-white/40 text-xs">
          © {new Date().getFullYear()} ARCEP Niger — Tous droits réservés
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="flex-1 flex flex-col">
        {/* Top bar mobile */}
        <div className="lg:hidden bg-secondary text-secondary-foreground px-4 py-3 flex items-center justify-between">
          <img src={arcepLogo.src} alt="ARCEP" className="h-8 w-auto" />
          <Link href="/" className="text-white/70 hover:text-white text-sm flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Accueil
          </Link>
        </div>

        <div className="flex-1 flex items-start justify-center p-6 sm:p-10 overflow-y-auto">
          <div className="w-full max-w-lg py-4">

            <Link href="/connexion" className="hidden lg:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> Retour à la connexion
            </Link>

            <div className="mb-8">
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground mb-2">
                Créer mon compte
              </h1>
              <p className="text-muted-foreground text-sm">
                Réservé aux usagers et consommateurs. Les opérateurs et agents reçoivent leurs accès par l'ARCEP.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Prénom + Nom */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom" className="text-sm font-medium">Prénom <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="prenom" placeholder="Moussa" value={form.prenom} onChange={set("prenom")}
                      disabled={loading} className="h-11 pl-9 text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-sm font-medium">Nom <span className="text-destructive">*</span></Label>
                  <Input id="nom" placeholder="Mahamane" value={form.nom} onChange={set("nom")}
                    disabled={loading} className="h-11 text-sm" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Adresse e-mail <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="votre@email.com" value={form.email}
                    onChange={set("email")} disabled={loading} className="h-11 pl-9 text-sm" autoComplete="email" />
                </div>
              </div>

              {/* Téléphone */}
              <div className="space-y-2">
                <Label htmlFor="telephone" className="text-sm font-medium">
                  Téléphone <span className="text-muted-foreground text-xs font-normal">(optionnel)</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="telephone" type="tel" placeholder="+227 XX XX XX XX" value={form.telephone}
                    onChange={set("telephone")} disabled={loading} className="h-11 pl-9 text-sm" />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Mot de passe <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPwd ? "text" : "password"} placeholder="Minimum 6 caractères"
                    value={form.password} onChange={set("password")} disabled={loading}
                    className="h-11 pl-9 pr-10 text-sm" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* Indicateur de force */}
                {form.password.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength.level ? strength.color : "bg-border"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Force : <span className="font-medium text-foreground">{strength.label}</span></p>
                  </div>
                )}
              </div>

              {/* Confirmer mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="confirmPassword" type={showCPwd ? "text" : "password"} placeholder="Répétez votre mot de passe"
                    value={form.confirmPassword} onChange={set("confirmPassword")} disabled={loading}
                    className={`h-11 pl-9 pr-10 text-sm ${form.confirmPassword && form.password !== form.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    autoComplete="new-password" />
                  <button type="button" onClick={() => setShowCPwd(!showCPwd)} tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showCPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-xs text-destructive">Les mots de passe ne correspondent pas.</p>
                )}
              </div>

              {/* Conditions */}
              <div className="flex items-start gap-3 pt-1">
                <input type="checkbox" id="acceptTerms" checked={form.acceptTerms}
                  onChange={set("acceptTerms")} disabled={loading}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-primary cursor-pointer" />
                <Label htmlFor="acceptTerms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  J'accepdte les{" "}
                  <Link href="/conditions" className="text-primary hover:underline">conditions d'utilisation</Link>
                  {" "}et la{" "}
                  <Link href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</Link>
                  {" "}de l'ARCEP Niger.
                </Label>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-11 font-display font-semibold text-sm gap-2">
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Création en cours…</>
                ) : (
                  <><UserPlus className="h-4 w-4" /> Créer mon compte</>
                )}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              Vous avez déjà un compte ?{" "}
              <Link href="/connexion" className="text-primary hover:underline font-medium">Se connecter</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;