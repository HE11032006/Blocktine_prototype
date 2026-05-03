import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route$6, u as useApp } from "./router-B40rtE2L.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowLeft, a as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function AuthPage() {
  const {
    mode = "login"
  } = Route$6.useSearch();
  const isSignup = mode === "signup";
  const {
    user,
    login,
    signup
  } = useApp();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (user) {
      console.log("Utilisateur déjà connecté, redirection...");
      navigate({
        to: "/dashboard"
      });
    }
  }, [user, navigate]);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const submit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Tentative d'authentification...", {
      mode,
      email
    });
    if (isSignup) {
      if (password !== confirm) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }
      const success = signup(name, email, password);
      if (success) {
        toast.success("Compte créé avec succès !");
        setTimeout(() => navigate({
          to: "/dashboard"
        }), 100);
      } else {
        toast.error("Cet email est déjà utilisé");
      }
    } else {
      const success = login(email, password);
      if (success) {
        console.log("Login réussi, redirection...");
        toast.success("Bon retour !");
        setTimeout(() => navigate({
          to: "/dashboard"
        }), 100);
      } else {
        console.error("Login échoué : identifiants incorrects");
        toast.error("Email ou mot de passe incorrect");
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-background grain flex items-center justify-center px-4 py-12 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 opacity-40 pointer-events-none", style: {
      backgroundImage: `repeating-linear-gradient(45deg, color-mix(in oklab, var(--color-or) 4%, transparent) 0, color-mix(in oklab, var(--color-or) 4%, transparent) 1.5px, transparent 1.5px, transparent 24px)`
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "absolute top-6 left-6 z-20 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Accueil"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 rounded-full grid place-items-center bg-primary text-primary-foreground font-display text-xl mb-4", children: "◆" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: isSignup ? "Créer un compte" : "Bon retour" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: isSignup ? "Rejoignez la communauté blockTine." : "Reconnectez-vous à votre cercle." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "tc-card p-7 space-y-4", children: [
        isSignup && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom complet", value: name, onChange: setName, placeholder: "Aïcha Kpogan", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", type: "email", value: email, onChange: setEmail, placeholder: "vous@email.com", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mot de passe", type: "password", value: password, onChange: setPassword, placeholder: "••••••••", required: true }),
        isSignup && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Confirmer le mot de passe", type: "password", value: confirm, onChange: setConfirm, placeholder: "••••••••", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "btn-pill-primary w-full justify-center mt-2", children: [
          isSignup ? "Créer mon compte" : "Se connecter",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground pt-2", children: [
          isSignup ? "Déjà membre ?" : "Pas encore de compte ?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
            mode: isSignup ? "login" : "signup"
          }, className: "text-primary hover:underline font-medium", children: isSignup ? "Se connecter" : "Créer un compte" })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, required, placeholder, onChange: (e) => onChange(e.target.value), className: "mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors" })
  ] });
}
export {
  AuthPage as component
};
