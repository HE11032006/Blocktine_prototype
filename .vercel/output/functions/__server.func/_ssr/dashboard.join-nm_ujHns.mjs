import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp } from "./router-B40rtE2L.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowLeft, U as Users, X } from "../_libs/lucide-react.mjs";
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
function JoinPage() {
  const {
    available,
    joinTontine,
    getTontineByCode,
    isLoading
  } = useApp();
  const [selected, setSelected] = reactExports.useState(null);
  const [rulesAccepted, setRulesAccepted] = reactExports.useState(false);
  const [selectedRank, setSelectedRank] = reactExports.useState(null);
  const navigate = useNavigate();
  const confirm = async () => {
    if (!selected) return;
    if (!selected.isUnlimitedCapacity && !selectedRank) {
      toast.error("Veuillez choisir un ordre de passage");
      return;
    }
    await joinTontine(selected.id, selectedRank || 0);
    toast.success("Vous avez rejoint la tontine ✦", {
      description: `Bienvenue dans ${selected.name}.`
    });
    setSelected(null);
    setRulesAccepted(false);
    setSelectedRank(null);
    navigate({
      to: "/dashboard"
    });
  };
  const publicAvailable = available.filter((t) => t.visibility !== "private");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Retour"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-primary font-semibold", children: "Cercles ouverts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl mt-1", children: "Rejoindre une tontine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-xl", children: "Découvrez les cercles disponibles ou saisissez un code d'invitation." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-4 flex gap-3 items-end max-w-md w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground block mb-1", children: "Code d'invitation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "join-code", placeholder: "TC-ABCD-1234", className: "w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          const code = document.getElementById("join-code").value;
          if (!code) return toast.error("Veuillez saisir un code");
          const res = await getTontineByCode(code.trim().toUpperCase());
          if (res === "already") {
            toast.error("Vous faites déjà partie de ce cercle");
          } else if (res === "not_found") {
            toast.error("Code invalide ou tontine introuvable");
          } else {
            setRulesAccepted(false);
            setSelectedRank(null);
            setSelected(res);
          }
        }, disabled: isLoading, className: "btn-pill-primary px-6 h-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 border-2 border-noir border-t-transparent rounded-full animate-spin" }) : "Rejoindre" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      publicAvailable.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card interactive p-6 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-primary", children: t.cycle === "weekly" ? "Hebdomadaire" : "Mensuel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mt-1", children: t.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary shrink-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 flex-1", children: t.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            t.members.length,
            "/",
            t.isUnlimitedCapacity ? "∞" : t.capacity,
            " membres"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl text-primary", children: [
            t.amount,
            " MATIC"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1 w-full rounded-full bg-secondary overflow-hidden", children: !t.isUnlimitedCapacity && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary rounded-full", style: {
          width: `${t.members.length / t.capacity * 100}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setRulesAccepted(false);
          setSelectedRank(null);
          setSelected(t);
        }, className: "btn-pill-primary mt-5 justify-center", children: "Rejoindre" })
      ] }, t.id)),
      publicAvailable.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tc-card p-10 text-center md:col-span-2 lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Aucune tontine ouverte pour l'instant." }) })
    ] }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] grid place-items-center bg-background/80 backdrop-blur-sm px-4", onClick: () => setSelected(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card max-w-md w-full p-7 relative fade-up", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelected(null), className: "absolute top-4 right-4 text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hero-badge", children: "Confirmation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-3", children: selected.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-2 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-secondary/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Contribution" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg text-primary mt-0.5", children: [
            selected.amount,
            " MATIC"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-secondary/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Date de début" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-primary mt-0.5", children: new Date(selected.startDate || Date.now()).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short"
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.65rem] uppercase tracking-widest text-primary font-semibold block mb-2", children: "Politique du Smart Contract (Polygon)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1.5 list-disc pl-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Les fonds sont bloqués de manière immuable sur la blockchain." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Avertissement :" }),
            " Émis automatiquement au premier retard."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sanction :" }),
            " Pénalité de 5% du dépôt après 2 retards consécutifs."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Exclusion :" }),
            " Perte des fonds au profit du cercle en cas d'abandon."
          ] })
        ] })
      ] }),
      !selected.isUnlimitedCapacity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground block mb-2", children: "Choisir son ordre de passage (Rang)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: Array.from({
          length: selected.capacity
        }).map((_, i) => {
          const rank = i + 1;
          const isTaken = selected.members.some((m) => m.rank === rank);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: isTaken, onClick: () => setSelectedRank(rank), className: `h-8 w-8 rounded-full text-xs font-medium transition-all flex items-center justify-center ${isTaken ? "bg-secondary text-muted-foreground/30 cursor-not-allowed opacity-50 relative after:content-[''] after:absolute after:w-full after:h-px after:bg-muted-foreground/30 after:rotate-45" : selectedRank === rank ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(var(--color-or-rgb),0.5)]" : "bg-secondary hover:bg-secondary/80 text-foreground"}`, title: isTaken ? "Déjà occupé" : "Sélectionner ce rang", children: rank }, rank);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: rulesAccepted, onChange: (e) => setRulesAccepted(e.target.checked), className: "mt-1 accent-primary w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "J'accepte la politique du Smart Contract et je m'engage à respecter la fréquence de ",
          selected.cycle === "weekly" ? "paiement hebdomadaire" : "paiement mensuel",
          "."
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 p-4 rounded-lg bg-secondary/50 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "✦ L'entrée dans le cercle sera enregistrée sur Polygon. Les fonds sont sécurisés par smart contract." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: isLoading, onClick: () => setSelected(null), className: "btn-pill-secondary flex-1 justify-center disabled:opacity-50", children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: isLoading || !rulesAccepted || !selected.isUnlimitedCapacity && !selectedRank, onClick: confirm, className: "btn-pill-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 border-2 border-noir border-t-transparent rounded-full animate-spin" }) : "Confirmer" })
      ] })
    ] }) })
  ] });
}
export {
  JoinPage as component
};
