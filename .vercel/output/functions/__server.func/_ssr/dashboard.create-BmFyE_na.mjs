import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp } from "./router-B40rtE2L.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowLeft, c as Sparkles, d as Check, e as Copy, a as ArrowRight } from "../_libs/lucide-react.mjs";
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
function CreatePage() {
  const {
    createTontine,
    tontines,
    isLoading
  } = useApp();
  useNavigate();
  const [name, setName] = reactExports.useState("");
  const [capacity, setCapacity] = reactExports.useState(8);
  const [amount, setAmount] = reactExports.useState(50);
  const [initialDeposit, setInitialDeposit] = reactExports.useState(50);
  const [cycle, setCycle] = reactExports.useState("monthly");
  const [visibility, setVisibility] = reactExports.useState("private");
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = reactExports.useState(false);
  const [startDate, setStartDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [createdId, setCreatedId] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const created = createdId ? tontines.find((t) => t.id === createdId) : null;
  const submit = async (e) => {
    e.preventDefault();
    const id = await createTontine({
      name: name || "Nouvelle tontine",
      capacity: isUnlimitedCapacity ? 9999 : capacity,
      isUnlimitedCapacity,
      amount,
      cycle,
      visibility,
      startDate
    });
    toast.success("Tontine créée ✦", {
      description: `Dépôt initial de ${initialDeposit} MATIC enregistré.`
    });
    setCreatedId(id);
  };
  const copy = async () => {
    if (!created) return;
    await navigator.clipboard.writeText(created.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Retour"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-primary font-semibold", children: "Nouveau cercle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl mt-1", children: "Créer une tontine" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fon-block mt-4 inline-block", children: "« Un cercle se trace à plusieurs, jamais seul. »" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "tc-card p-7 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground", children: "Nom de la tontine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Cercle des Cauris", className: "mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground block mb-2", children: "Visibilité" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["public", "private"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setVisibility(v), className: `px-4 py-3 rounded-lg border text-sm font-medium transition-all ${visibility === v ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`, children: v === "public" ? "Publique (Visible dans Rejoindre)" : "Privée (Sur invitation)" }, v)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground", children: "Nombre de membres max" }),
          !isUnlimitedCapacity && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-primary", children: capacity })
        ] }),
        visibility === "private" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 mb-3 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: isUnlimitedCapacity, onChange: (e) => setIsUnlimitedCapacity(e.target.checked), className: "accent-primary w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Nombre de membres illimité" })
        ] }),
        !isUnlimitedCapacity && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 3, max: 50, value: capacity, onChange: (e) => setCapacity(Number(e.target.value)), className: "w-full accent-primary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground", children: "Date de début" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value), className: "mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] text-muted-foreground mt-1.5 block", children: "✦ Date à laquelle les inscriptions se clôturent et le premier cycle démarre." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-primary/10 border border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-primary font-semibold block mb-2", children: "Politique du Smart Contract" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-muted-foreground space-y-2 list-disc pl-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Les fonds sont sécurisés et bloqués sur la blockchain ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Polygon" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "En cas de retard, des avertissements sont émis automatiquement." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Au-delà de 2 retards consécutifs, une pénalité de 5% est prélevée." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Le non-paiement entraîne l'exclusion et la redistribution des fonds aux membres." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground", children: "Contribution par cycle (MATIC)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: amount, onChange: (e) => setAmount(Number(e.target.value)), className: "mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground block mb-2", children: "Fréquence" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["weekly", "monthly"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCycle(c), className: `px-4 py-3 rounded-lg border text-sm font-medium transition-all ${cycle === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`, children: c === "weekly" ? "Hebdomadaire" : "Mensuel" }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground", children: "Montant à envoyer maintenant (dépôt initial · MATIC)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: initialDeposit, onChange: (e) => setInitialDeposit(Number(e.target.value)), className: "mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] text-muted-foreground mt-1.5 block", children: "✦ Versé au smart contract pour activer le cercle." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isLoading, className: "btn-pill-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 border-2 border-noir border-t-transparent rounded-full animate-spin" }),
        "Signature en cours..."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        " Créer & verser ",
        initialDeposit,
        " MATIC"
      ] }) })
    ] }),
    created && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] grid place-items-center bg-background/85 backdrop-blur-sm px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card max-w-md w-full p-7 fade-up text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 rounded-full grid place-items-center bg-primary text-primary-foreground font-display text-xl mb-4", children: "✦" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hero-badge", children: "Tontine activée" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-3", children: created.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Partagez ce code avec vos membres pour qu'ils rejoignent le cercle." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-4 rounded-xl bg-secondary border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Code de la tontine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-primary tracking-wider", children: created.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copy, className: "p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors", "aria-label": "Copier le code", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-secondary/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Dépôt versé" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl text-primary mt-0.5", children: [
            initialDeposit,
            " MATIC"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-secondary/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Membres" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl text-primary mt-0.5", children: [
            "1 / ",
            created.isUnlimitedCapacity ? "∞" : created.capacity
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "btn-pill-secondary flex-1 justify-center", children: "Tableau de bord" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/tontine/$tontineId", params: {
          tontineId: created.id
        }, className: "btn-pill-primary flex-1 justify-center", children: [
          "Voir la tontine ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  CreatePage as component
};
