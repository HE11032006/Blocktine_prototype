import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a as Route, u as useApp } from "./router-B40rtE2L.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowLeft, f as ShieldCheck, g as CircleAlert, C as Calendar, U as Users, h as Crown, i as CircleX, j as Clock, k as CircleCheck } from "../_libs/lucide-react.mjs";
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
function TontineDetail() {
  const {
    tontineId
  } = Route.useParams();
  const {
    tontines
  } = useApp();
  const t = tontines.find((x) => x.id === tontineId);
  const [view, setView] = reactExports.useState(t?.role === "creator" ? "creator" : "member");
  const [showPayment, setShowPayment] = reactExports.useState(false);
  const [isPaying, setIsPaying] = reactExports.useState(false);
  if (!t) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Tontine introuvable" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "btn-pill-primary mt-6 inline-flex", children: "Retour au tableau de bord" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Retour"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[0.7rem] uppercase tracking-widest text-primary font-semibold", children: [
          t.cycle === "weekly" ? "Hebdomadaire" : "Mensuel",
          " · ",
          t.amount,
          " MATIC"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl mt-1", children: t.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-xl", children: t.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hero-badge", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 mr-1" }),
        " Sécurisée par smart contracts Polygon"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-4 sm:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Code de la tontine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-primary tracking-wider mt-0.5", children: t.code })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Membres" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl text-primary mt-0.5", children: [
          t.members.length,
          " / ",
          t.capacity
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "En règle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl text-primary mt-0.5", children: [
          t.members.filter((m) => m.status === "paid").length,
          " / ",
          t.members.length
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex p-1 rounded-full bg-secondary border border-border mb-6", children: ["creator", "member"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setView(v), className: `px-5 py-2 rounded-full text-xs font-medium transition-all ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`, children: [
      "Vue ",
      v === "creator" ? "créatrice" : "membre"
    ] }, v)) }),
    view === "creator" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CreatorView, { t }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MemberView, { t, showPayment, setShowPayment, isPaying, setIsPaying })
  ] });
}
function StatusBadge({
  status
}) {
  const map = {
    paid: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
      label: "À jour",
      cls: "text-primary bg-primary/10"
    },
    pending: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
      label: "En attente",
      cls: "text-muted-foreground bg-secondary"
    },
    late: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
      label: "En retard",
      cls: "text-[#f59e0b] bg-[#f59e0b]/10"
    },
    warning: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
      label: "Pénalité (5%)",
      cls: "text-[#f59e0b] bg-[#f59e0b]/20 border border-[#f59e0b]/30"
    },
    banned: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
      label: "Banni / Exclu",
      cls: "text-destructive bg-destructive/10 border border-destructive/30"
    }
  };
  const v = map[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.65rem] font-medium ${v.cls}`, children: [
    v.icon,
    " ",
    v.label
  ] });
}
function CreatorView({
  t
}) {
  const paidCount = t.members.filter((m) => m.status === "paid").length;
  const pct = t.members.length ? Math.round(paidCount / t.members.length * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-6 lg:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: "Membres" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          paidCount,
          " en règle · ",
          t.members.length - paidCount,
          " en attente"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MemberGroup, { label: "✓ En règle", tone: "ok", members: t.members.filter((m) => m.status === "paid"), tontineId: t.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MemberGroup, { label: "⏱ En attente", tone: "muted", members: t.members.filter((m) => m.status === "pending"), tontineId: t.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MemberGroup, { label: "⚠ En retard", tone: "bad", members: t.members.filter((m) => m.status === "late"), tontineId: t.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MemberGroup, { label: "⚠ Avertissement / Pénalité", tone: "warning", members: t.members.filter((m) => m.status === "warning"), tontineId: t.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MemberGroup, { label: "⛔ Bannis / Exclus", tone: "banned", members: t.members.filter((m) => m.status === "banned"), tontineId: t.id })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mb-4", children: "Contributions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-num", children: [
          pct,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "à jour" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 w-full rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary rounded-full", style: {
        width: `${pct}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3", children: [
        paidCount,
        "/",
        t.members.length,
        " membres ont payé ce cycle."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-6 lg:col-span-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mb-4", children: "Historique des transactions" }),
      t.transactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune transaction pour l'instant." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-3 font-medium", children: "Hash" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-3 font-medium", children: "Membre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-3 font-medium", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-3 font-medium", children: "Montant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-3 font-medium", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: t.transactions.map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 font-mono text-xs text-primary", children: tx.hash }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: tx.member }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-muted-foreground capitalize", children: tx.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "text-right font-display text-lg text-primary", children: [
            tx.amount,
            " MATIC"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right text-xs text-muted-foreground", children: tx.date })
        ] }, tx.id)) })
      ] }) })
    ] })
  ] });
}
function MemberView({
  t,
  showPayment,
  setShowPayment,
  isPaying,
  setIsPaying
}) {
  const {
    leaveTontine
  } = useApp();
  const navigate = useNavigate();
  const [showLeaveWarning, setShowLeaveWarning] = reactExports.useState(false);
  const [isLeaving, setIsLeaving] = reactExports.useState(false);
  const me = t.members.find((m) => m.name === "Vous") ?? t.members[0];
  const schedule = Array.from({
    length: 5
  }).map((_, i) => ({
    cycle: i + 1,
    date: `${10 + i * (t.cycle === "weekly" ? 7 : 30)} mai`,
    paid: i < 2
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-6 lg:col-span-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground", children: "Mon statut" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: me?.status ?? "pending" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground", children: "Prochaine échéance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-primary mt-1", children: t.nextDue ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          "Montant : ",
          t.amount,
          " MATIC"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowPayment(true), className: "btn-pill-primary w-full justify-center mt-6", children: "Effectuer le paiement" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowLeaveWarning(true), className: "btn-pill-secondary w-full justify-center mt-3 text-destructive border-destructive/20 hover:bg-destructive/10", children: "Quitter la tontine" })
    ] }),
    showLeaveWarning && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] grid place-items-center bg-background/80 backdrop-blur-sm px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card max-w-sm w-full p-6 relative fade-up border-destructive/30 shadow-[0_0_40px_rgba(220,38,38,0.15)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-destructive/10 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-6 w-6 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-destructive", children: "Danger : Risque de perte" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Smart Contract Polygon" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: "Êtes-vous sûr de vouloir quitter cette tontine avant la fin du cycle ?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-lg bg-destructive/10 border border-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-destructive/90 space-y-2 list-disc pl-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Perte des fonds :" }),
            " Vos contributions passées ne vous seront pas restituées."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Redistribution :" }),
            " L'argent sera confisqué par le contrat et redistribué aux autres membres pour compenser votre départ."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Irréversible :" }),
            " Cette action inscrite sur la blockchain ne peut être annulée."
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowLeaveWarning(false), disabled: isLeaving, className: "btn-pill-secondary flex-1 justify-center", children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          setIsLeaving(true);
          await leaveTontine(t.id);
          setIsLeaving(false);
          setShowLeaveWarning(false);
          toast.success("Vous avez quitté la tontine", {
            description: "Les pénalités du Smart Contract ont été appliquées."
          });
          navigate({
            to: "/dashboard"
          });
        }, disabled: isLeaving, className: "btn-pill-primary flex-1 justify-center bg-destructive hover:bg-destructive/90 text-white border-transparent", children: isLeaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" }),
          "En cours..."
        ] }) : "Continuer et Quitter" })
      ] })
    ] }) }),
    showPayment && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] grid place-items-center bg-background/80 backdrop-blur-sm px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card max-w-sm w-full p-6 relative fade-up border-primary/30 shadow-[0_0_40px_rgba(var(--color-or-rgb),0.1)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-primary/10 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl", children: "Signature requise" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Protocole blockTine" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Dépôt de contribution" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Montant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg text-primary", children: [
            t.amount,
            " MATIC"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Gaz (estimé)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "0.0024 MATIC" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-border flex justify-between text-xs font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Vers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate ml-4", children: "0x71C...4921" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowPayment(false), disabled: isPaying, className: "btn-pill-secondary flex-1 justify-center", children: "Rejeter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          setIsPaying(true);
          await new Promise((r) => setTimeout(r, 2e3));
          setIsPaying(false);
          setShowPayment(false);
          toast.success("Contribution versée !", {
            description: "La transaction a été validée sur le réseau Polygon."
          });
        }, disabled: isPaying, className: "btn-pill-primary flex-1 justify-center", children: isPaying ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 border-2 border-noir border-t-transparent rounded-full animate-spin" }),
          "Envoi..."
        ] }) : "Confirmer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[0.6rem] text-center text-muted-foreground mt-4", children: [
        "En confirmant, vous autorisez le smart contract à prélever ",
        t.amount,
        " MATIC de votre portefeuille."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-6 lg:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-primary" }),
        " Calendrier"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: schedule.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between p-3 rounded-lg bg-secondary border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full grid place-items-center bg-background font-display text-primary", children: s.cycle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: s.date })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: s.paid ? "paid" : "pending" })
      ] }, s.cycle)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-6 lg:col-span-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: "Progression du cercle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-num", children: [
          t.progress ?? 0,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary rounded-full transition-all", style: {
        width: `${t.progress ?? 0}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3", children: [
        t.members.length,
        "/",
        t.capacity,
        " membres · ",
        t.cycle === "weekly" ? "Cycle hebdo" : "Cycle mensuel"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tc-card p-6 lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MembersDirectory, { members: t.members, tontineId: t.id }) })
  ] });
}
function MembersDirectory({
  members,
  tontineId
}) {
  const {
    simulatePenalty
  } = useApp();
  const [filter, setFilter] = reactExports.useState("all");
  const creatorId = members[0]?.id;
  const meId = members.find((m) => m.name === "Vous")?.id;
  const filtered = members.filter((m) => filter === "all" ? true : filter === "paid" ? m.status === "paid" : m.status !== "paid");
  const paidCount = members.filter((m) => m.status === "paid").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }),
          " Membres du cercle"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          paidCount,
          " sur ",
          members.length,
          " sont à jour ce cycle."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex p-1 rounded-full bg-secondary border border-border", children: [{
        v: "all",
        l: "Tous"
      }, {
        v: "paid",
        l: "À jour"
      }, {
        v: "not-paid",
        l: "Pas à jour"
      }].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(opt.v), className: `px-3.5 py-1.5 rounded-full text-[0.7rem] font-medium transition-all ${filter === opt.v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`, children: opt.l }, opt.v)) })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-8", children: "Aucun membre dans cette catégorie." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid sm:grid-cols-2 gap-2", children: filtered.map((m) => {
      const isCreator = m.id === creatorId;
      const isMe = m.id === meId;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `flex items-center justify-between gap-3 p-3 rounded-lg border ${isMe ? "border-primary/40 bg-primary/5" : "border-border bg-secondary/30"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-9 w-9 shrink-0 rounded-full grid place-items-center bg-secondary text-primary font-display relative", children: [
            m.name[0],
            isCreator && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-primary", "aria-label": "Créatrice" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium truncate flex items-center gap-2", children: [
              m.name,
              isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.6rem] uppercase tracking-widest text-primary", children: "vous" }),
              isCreator && !isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.6rem] uppercase tracking-widest text-primary", children: "créatrice" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[0.7rem] text-muted-foreground truncate", children: m.wallet })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: m.status }),
          m.name !== "Vous" && m.status !== "banned" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => simulatePenalty(tontineId, m.id), title: "Simuler sanction (Smart Contract)", className: "p-1.5 rounded-md bg-secondary border border-border hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }) })
        ] })
      ] }, m.id);
    }) })
  ] });
}
function MemberGroup({
  label,
  tone,
  members,
  tontineId
}) {
  const {
    simulatePenalty
  } = useApp();
  if (members.length === 0) return null;
  const color = tone === "ok" ? "text-primary" : tone === "bad" ? "text-[#f59e0b]" : tone === "warning" ? "text-[#f59e0b]" : tone === "banned" ? "text-destructive" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 first:mt-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-[0.65rem] uppercase tracking-widest font-semibold ${color} mb-2`, children: [
      label,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
        "· ",
        members.length
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border rounded-lg border border-border overflow-hidden", children: members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between py-2.5 px-3 bg-secondary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full grid place-items-center bg-secondary text-primary font-display", children: m.name[0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: m.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[0.7rem] text-muted-foreground", children: m.wallet })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: m.status }),
        m.name !== "Vous" && m.status !== "banned" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => simulatePenalty(tontineId, m.id), title: "Simuler sanction (Smart Contract)", className: "p-1.5 rounded-md bg-background hover:bg-secondary hover:text-[#f59e0b] transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }) })
      ] })
    ] }, m.id)) })
  ] });
}
export {
  TontineDetail as component
};
