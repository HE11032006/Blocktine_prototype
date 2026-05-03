import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as ArrowRight } from "../_libs/lucide-react.mjs";
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
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-hidden bg-background grain", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute inset-0 z-0 opacity-50 pointer-events-none", style: {
      backgroundImage: `repeating-linear-gradient(45deg, color-mix(in oklab, var(--color-or) 4%, transparent) 0, color-mix(in oklab, var(--color-or) 4%, transparent) 1.5px, transparent 1.5px, transparent 22px), repeating-linear-gradient(-45deg, color-mix(in oklab, var(--color-vert) 6%, transparent) 0, color-mix(in oklab, var(--color-vert) 6%, transparent) 1.5px, transparent 1.5px, transparent 22px)`
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-[-10vw] top-1/2 -translate-y-1/2 w-[min(60vw,560px)] h-[min(60vw,560px)] z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "deco-rings", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full glow-pulse", style: {
        background: "radial-gradient(circle, color-mix(in oklab, var(--color-or) 40%, transparent) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-primary text-7xl", children: "◆" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "relative z-30 flex items-center justify-between px-[5vw] py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full grid place-items-center bg-primary text-primary-foreground font-display", children: "◆" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl tracking-wide", children: [
          "block",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Tine" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
        mode: "login"
      }, className: "text-xs font-medium text-muted-foreground hover:text-primary", children: "Se connecter" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative z-20 px-[5vw] pt-16 pb-24 min-h-[88vh] flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hero-badge fade-up", children: "Épargne collective Web3 · Bénin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-foreground mt-5 leading-[0.9] fade-up-1", style: {
        fontSize: "clamp(3.2rem,8vw,6.5rem)"
      }, children: [
        "La tontine,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-primary", style: {
          textShadow: "0 0 50px color-mix(in oklab, var(--color-or) 25%, transparent)"
        }, children: "réinventée." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fon-block mt-6 fade-up-2 max-w-lg", children: "« L'argent qui circule entre les mains de la communauté ne dort jamais. »" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-base text-muted-foreground max-w-lg fade-up-3", children: "blockTine transforme la tradition béninoise de l'épargne collective en un protocole transparent, sécurisé par smart contracts sur Polygon. Pas de chef, pas de fuite, pas de doute." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3 fade-up-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", search: {
          mode: "signup"
        }, className: "btn-pill-primary", children: [
          "Commencer ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
          mode: "login"
        }, className: "btn-pill-secondary", children: "Se connecter" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex flex-wrap gap-10 pt-8 border-t border-border fade-up-5", children: [{
        n: "2 400+",
        l: "Tontines actives"
      }, {
        n: "184k",
        l: "MATIC sécurisés"
      }, {
        n: "99.9%",
        l: "Transactions vérifiées"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-num block", children: s.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.7rem] uppercase tracking-widest text-muted-foreground mt-1 block", children: s.l })
      ] }, s.l)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kita-divider absolute bottom-0 left-0 right-0" })
  ] });
}
export {
  Landing as component
};
