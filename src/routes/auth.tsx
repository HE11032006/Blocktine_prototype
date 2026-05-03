import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const { login, signup } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirm) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }
      const success = signup(name, email, password);
      if (success) {
        toast.success("Compte créé avec succès !");
        navigate({ to: "/dashboard" });
      } else {
        toast.error("Cet email est déjà utilisé");
      }
    } else {
      const success = login(email, password);
      if (success) {
        toast.success("Bon retour !");
        navigate({ to: "/dashboard" });
      } else {
        toast.error("Email ou mot de passe incorrect");
      }
    }
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

        <form onSubmit={submit} className="tc-card p-7 space-y-4">
          {isSignup && (
            <Field label="Nom complet" value={name} onChange={setName} placeholder="Aïcha Kpogan" required />
          )}
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="vous@email.com" required />
          <Field label="Mot de passe" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
          {isSignup && (
            <Field label="Confirmer le mot de passe" type="password" value={confirm} onChange={setConfirm} placeholder="••••••••" required />
          )}

          <button type="submit" className="btn-pill-primary w-full justify-center mt-2">
            {isSignup ? "Créer mon compte" : "Se connecter"} <ArrowRight className="h-4 w-4" />
          </button>

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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
      />
    </label>
  );
}
