import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { O as Outlet, d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp } from "./router-B40rtE2L.mjs";
import "../_libs/sonner.mjs";
import { S as Settings, L as LogOut } from "../_libs/lucide-react.mjs";
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
function AppHeader() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const initials = user?.name ? user.name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase() : "?";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-3.5 bg-background/90 backdrop-blur-xl border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2.5 no-underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full grid place-items-center bg-primary text-primary-foreground font-display text-lg", children: "◆" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl tracking-wide leading-none", children: [
          "block",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Tine" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/dashboard/settings",
            className: "hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-3.5 w-3.5" }),
              " Paramètres"
            ]
          }
        ),
        user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 pl-3 border-l border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full grid place-items-center bg-primary text-primary-foreground text-xs font-semibold", children: initials }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline text-xs text-foreground", children: user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                logout();
                navigate({ to: "/" });
              },
              className: "text-muted-foreground hover:text-destructive transition-colors",
              "aria-label": "Se déconnecter",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kita-divider fixed top-[60px] left-0 right-0 z-40" })
  ] });
}
function DashboardLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-background grain", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-24 pb-16 px-[5vw]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  DashboardLayout as component
};
