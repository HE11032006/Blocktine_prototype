import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { useApp } from "@/lib/app-context";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";

type AuthSearch = { mode?: "login" | "signup" };

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    mode: search.mode === "signup" ? "signup" : "login",
  }),
  head: () => ({
    meta: [
      { title: "Connexion — blockTine" },
      { name: "description", content: "Connectez-vous ou créez un compte blockTine." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode = "login" } = Route.useSearch();
  const isSignup = mode === "signup";
  const { user, login, signup, loginGuest, isLoading } = useApp();
  const navigate = useNavigate();

  // Redirection automatique si déjà connecté
  useEffect(() => {
    if (user) {
      console.log("Utilisateur déjà connecté, redirection...");
      navigate({ to: "/dashboard" });
    }
  }, [user, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fundingMode, setFundingMode] = useState(false);
  const [phone, setPhone] = useState("");
  const [fundingAmount, setFundingAmount] = useState(2500); // Default account setup fee

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Tentative d'authentification...", { mode, email });

    if (isSignup) {
      if (password.length < 8) {
        toast.error("Le mot de passe doit faire au moins 8 caractères");
        return;
      }
      if (password !== confirm) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }
      const result = await signup(name, email, password);
      if (result.success) {
        setFundingMode(true);
        toast.success("Compte créé ! Étape finale : Activer votre Wallet.");
      } else {
        if (result.errorType === "already_exists") {
          toast.error("Cet email est déjà utilisé. Redirection vers la page de connexion...");
          navigate({ to: "/auth", search: { mode: "login" } });
        } else {
          toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
        }
      }
    } else {
      const success = await login(email, password);
      if (success) {
        console.log("Login réussi, redirection...");
        toast.success("Bon retour !");
        // On utilise un petit délai pour laisser le temps au state de se mettre à jour
        setTimeout(() => navigate({ to: "/dashboard" }), 100);
      } else {
        console.error("Login échoué : identifiants incorrects");
        toast.error("Email ou mot de passe incorrect");
      }
    }
  };

  const handleFunding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Veuillez saisir votre numéro Mobile Money");
      return;
    }
    
    // In a real app, this would call deposit(null, fundingAmount, phone)
    toast.info("Initialisation du transfert Mobile Money...");
    setTimeout(() => {
      toast.success("Wallet activé avec succès ! Connectez-vous.");
      setFundingMode(false);
      navigate({ to: "/auth", search: { mode: "login" } });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-background grain flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, color-mix(in oklab, var(--color-or) 4%, transparent) 0, color-mix(in oklab, var(--color-or) 4%, transparent) 1.5px, transparent 1.5px, transparent 24px)`,
        }} />

      <Link to="/" className="absolute top-6 left-6 z-20 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Accueil
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 rounded-full grid place-items-center bg-primary text-primary-foreground font-display text-xl mb-4">
            ◆
          </div>
          <h1 className="font-display text-4xl">
            {isSignup ? "Créer un compte" : "Bon retour"}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {isSignup ? "Rejoignez la communauté blockTine." : "Reconnectez-vous à votre cercle."}
          </p>
        </div>

        {fundingMode ? (
          <form onSubmit={handleFunding} className="tc-card p-7 space-y-5 fade-up">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 mb-2">
              <p className="text-xs text-foreground leading-relaxed">
                Pour interagir avec la blockchain Polygon, votre compte a besoin d'un dépôt initial de "frais de gaz". 
                Ces fonds restent à vous et sont déposés dans votre wallet sécurisé.
              </p>
            </div>
            
            <Field label="Montant du dépôt (FCFA)" type="number" value={String(fundingAmount)} onChange={(v) => setFundingAmount(Number(v))} required />
            <Field label="Votre numéro Mobile Money" type="tel" value={phone} onChange={setPhone} placeholder="90 00 00 00" required />
            
            <button type="submit" className="btn-pill-primary w-full justify-center">
              Activer mon compte & Wallet <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-[0.65rem] text-muted-foreground uppercase tracking-widest">
              Passerelle sécurisée Kotani Pay
            </p>
          </form>
        ) : (
          <form onSubmit={submit} className="tc-card p-7 space-y-4">
            {isSignup && (
              <Field label="Nom complet" value={name} onChange={setName} placeholder="Aïcha Kpogan" required />
            )}
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="vous@email.com" required />
            <Field 
              label="Mot de passe" 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={setPassword} 
              placeholder="••••••••" 
              required 
              rightElement={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-muted-foreground hover:text-primary">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            {isSignup && (
              <Field 
                label="Confirmer le mot de passe" 
                type={showPassword ? "text" : "password"} 
                value={confirm} 
                onChange={setConfirm} 
                placeholder="••••••••" 
                required 
              />
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-pill-primary w-full justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Chargement...
                </span>
              ) : (
                <>
                  {isSignup ? "Créer mon compte" : "Se connecter"} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Bouton Mode Démo retiré */}

            <p className="text-center text-xs text-muted-foreground pt-2">
              {isSignup ? "Déjà membre ?" : "Pas encore de compte ?"}{" "}
              <Link
                to="/auth"
                search={{ mode: isSignup ? "login" : "signup" }}
                className="text-primary hover:underline font-medium"
              >
                {isSignup ? "Se connecter" : "Créer un compte"}
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  rightElement,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  rightElement?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="relative mt-1.5">
        <input
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors pr-10"
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </label>
  );
}
