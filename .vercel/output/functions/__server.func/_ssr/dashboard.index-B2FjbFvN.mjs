import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp } from "./router-B40rtE2L.mjs";
import "../_libs/sonner.mjs";
import { P as Plus, a as ArrowRight, U as Users, C as Calendar, T as TrendingUp, W as Wallet } from "../_libs/lucide-react.mjs";
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
function DashboardHome() {
  const {
    user,
    tontines
  } = useApp();
  const initials = user?.name ? user.name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase() : "TC";
  const totalSaved = tontines.reduce((acc, t) => acc + t.amount * Math.floor((t.progress ?? 0) / 20), 0);
  const nextDue = tontines.find((t) => t.nextDue)?.nextDue ?? "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-7 lg:col-span-1 fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full grid place-items-center bg-primary text-primary-foreground font-display text-2xl", children: initials }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground", children: "Membre" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl leading-tight", children: user?.name ?? "Invité" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-5 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground", children: "Wallet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground mt-1", children: user?.wallet ?? "0x…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hero-badge mt-3", children: "Polygon · Mainnet" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 grid sm:grid-cols-2 gap-4 fade-up-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/create", className: "tc-card interactive p-6 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl", children: "Créer une tontine" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: "Lancez votre cercle et invitez des membres." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/join", className: "tc-card interactive p-6 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl", children: "Rejoindre" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: "Parcourez les tontines ouvertes près de vous." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid sm:grid-cols-3 gap-4 fade-up-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }), label: "Tontines actives", value: String(tontines.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }), label: "Prochain paiement", value: nextDue, small: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }), label: "Total épargné", value: `${totalSaved} MATIC` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "fade-up-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline justify-between mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-primary font-semibold", children: "Vos cercles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-1", children: "Tontines en cours" })
      ] }) }),
      tontines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tc-card p-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Aucune tontine pour l'instant." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: tontines.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/tontine/$tontineId", params: {
        tontineId: t.id
      }, className: "tc-card interactive p-6 block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[0.7rem] uppercase tracking-widest text-primary", children: [
              t.role === "creator" ? "Créatrice" : "Membre",
              " · ",
              t.cycle === "weekly" ? "Hebdo" : "Mensuel"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mt-1", children: t.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5 text-primary shrink-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: t.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            t.members.length,
            "/",
            t.capacity,
            " membres"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl text-primary", children: [
            t.amount,
            " MATIC"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1 w-full rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary rounded-full transition-all", style: {
          width: `${t.progress ?? 0}%`
        } }) })
      ] }, t.id)) })
    ] })
  ] });
}
function Stat({
  icon,
  label,
  value,
  small
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tc-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: small ? "font-display text-2xl text-foreground mt-3" : "stat-num mt-3", children: value })
  ] });
}
export {
  DashboardHome as component
};
