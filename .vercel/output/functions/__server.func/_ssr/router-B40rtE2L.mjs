import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
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
const appCss = "/assets/styles-CYnQN3hn.css";
const sampleTx = (n, amount) => Array.from({ length: n }).map((_, i) => ({
  id: `tx-${Math.random().toString(36).slice(2, 9)}`,
  hash: `0x${Math.random().toString(16).slice(2, 10)}…${Math.random().toString(16).slice(2, 6)}`,
  member: ["Aïcha K.", "Kossi A.", "Mariam B.", "Eric D.", "Fatou L.", "Yves P.", "Bineta S."][i % 7],
  amount,
  date: new Date(Date.now() - i * 864e5 * 2).toISOString().split("T")[0],
  type: i % 5 === 4 ? "payout" : "contribution"
}));
const initialTontines = [
  {
    id: "t-cauris",
    code: "CAURI-7821",
    name: "Cercle des Cauris",
    description: "Épargne solidaire entre artisans et commerçants du Grand Marché. Un filet de sécurité pour nos projets.",
    members: [
      { id: "m1", name: "Vous", wallet: "0x7a3f…b21", status: "paid" },
      { id: "m2", name: "Aïcha K.", wallet: "0x9c1d…f4a", status: "paid" },
      { id: "m3", name: "Kossi A.", wallet: "0x2e8b…77c", status: "pending" },
      { id: "m4", name: "Mariam B.", wallet: "0x4f12…aa9", status: "late" },
      { id: "m5", name: "Eric D.", wallet: "0x83a0…012", status: "paid" },
      { id: "m6", name: "Fatou L.", wallet: "0x1bb2…cd1", status: "paid" }
    ],
    capacity: 10,
    amount: 50,
    cycle: "monthly",
    role: "creator",
    visibility: "public",
    startDate: "2025-05-10",
    rules: "Tout retard de paiement entraîne une pénalité de 5% du montant du cycle.",
    nextDue: "12 mai 2025",
    progress: 62,
    transactions: sampleTx(12, 50)
  },
  {
    id: "t-kente",
    code: "KENTE-3492",
    name: "Tontine Kenté",
    description: "Cercle restreint pour l'achat de tissus de qualité supérieure et matériel de couture.",
    members: [
      { id: "m1", name: "Vous", wallet: "0x7a3f…b21", status: "pending" },
      { id: "m2", name: "Fatou L.", wallet: "0x1bb2…cd1", status: "paid" },
      { id: "m3", name: "Yves P.", wallet: "0x55de…102", status: "paid" },
      { id: "m4", name: "Bineta S.", wallet: "0x99fe…33a", status: "paid" }
    ],
    capacity: 6,
    amount: 25,
    cycle: "weekly",
    role: "member",
    visibility: "private",
    startDate: "2025-04-20",
    rules: "Les membres doivent être approuvés par le créateur.",
    nextDue: "29 avril 2025",
    progress: 45,
    transactions: sampleTx(8, 25)
  },
  {
    id: "t-abomey",
    code: "ABOM-5501",
    name: "Cercle d'Abomey",
    description: "Hommage aux traditions d'entraide. Cycle hebdomadaire pour une épargne rapide.",
    members: [
      { id: "m1", name: "Vous", wallet: "0x7a3f…b21", status: "paid" },
      { id: "m2", name: "Koffi J.", wallet: "0x22ab…cc1", status: "paid" },
      { id: "m3", name: "Zinsou F.", wallet: "0x54ef…88b", status: "paid" }
    ],
    capacity: 5,
    amount: 100,
    cycle: "weekly",
    role: "member",
    visibility: "public",
    startDate: "2025-05-01",
    rules: "L'ordre de paiement est décidé au premier jour de la tontine.",
    nextDue: "5 mai 2025",
    progress: 80,
    transactions: sampleTx(15, 100)
  }
];
const availableTontines = [
  {
    id: "a-baobab",
    code: "BAOB-1147",
    name: "Cercle Baobab",
    description: "Étudiants & jeunes pros, paiements mensuels.",
    members: [],
    capacity: 10,
    amount: 30,
    cycle: "monthly",
    role: "available",
    visibility: "public",
    startDate: "2026-06-01",
    rules: "Paiement obligatoire avant le 5 de chaque mois.",
    transactions: []
  },
  {
    id: "a-zinli",
    code: "ZINLI-9038",
    name: "Tontine Zinli",
    description: "Inspirée des chants Zinli, rythme hebdomadaire.",
    members: [],
    capacity: 8,
    amount: 20,
    cycle: "weekly",
    role: "available",
    visibility: "public",
    startDate: "2026-06-15",
    rules: "La régularité est la clé de voûte de cette tontine.",
    transactions: []
  },
  {
    id: "a-akwaba",
    code: "AKWA-5510",
    name: "Akwaba Savings",
    description: "Tontine ouverte à la diaspora ouest-africaine.",
    members: [],
    capacity: 12,
    amount: 75,
    cycle: "monthly",
    role: "available",
    visibility: "public",
    startDate: "2026-07-01",
    rules: "Aucun retard toléré pour la diaspora.",
    transactions: []
  },
  {
    id: "a-cauris2",
    code: "CAUR2-2284",
    name: "Petits Cauris",
    description: "Micro-épargne pour étudiants.",
    members: [],
    capacity: 6,
    amount: 10,
    cycle: "weekly",
    role: "available",
    visibility: "public",
    startDate: "2026-06-10",
    rules: "Participation active requise.",
    transactions: []
  },
  {
    id: "a-vodun",
    code: "VODUN-6601",
    name: "Cercle Vodún",
    description: "Tontine longue durée, fort engagement.",
    members: [],
    capacity: 15,
    amount: 100,
    cycle: "monthly",
    role: "available",
    visibility: "public",
    startDate: "2026-08-01",
    rules: "Engagement formel demandé.",
    transactions: []
  }
];
const fillMembers = (capacity, joined) => Array.from({ length: joined }).map((_, i) => ({
  id: `gm-${i}`,
  name: ["Aïcha", "Kossi", "Mariam", "Eric", "Fatou", "Yves", "Bineta"][i % 7] + " " + String.fromCharCode(65 + i),
  wallet: `0x${Math.random().toString(16).slice(2, 6)}…${Math.random().toString(16).slice(2, 6)}`,
  status: ["paid", "pending", "late"][i % 3]
}));
availableTontines.forEach((t) => {
  const joined = Math.max(2, Math.floor(t.capacity * 0.4));
  t.members = fillMembers(t.capacity, joined);
});
const AppCtx = reactExports.createContext(null);
const randomWallet = () => `0x${Math.random().toString(16).slice(2, 6)}…${Math.random().toString(16).slice(2, 6)}`;
function AppProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [theme, setTheme] = reactExports.useState("dark");
  const [tontines, setTontines] = reactExports.useState(initialTontines);
  const [available, setAvailable] = reactExports.useState(availableTontines);
  const [settings, setSettingsState] = reactExports.useState({
    notifPayment: true,
    notifNewMember: true,
    notifCycleEnd: false
  });
  const [isLoading, setIsLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    try {
      const storedUser = localStorage.getItem("tc-current-user");
      if (storedUser) {
        console.log("Utilisateur trouvé en session:", storedUser);
        setUser(JSON.parse(storedUser));
      }
      const storedTheme = localStorage.getItem("tc-theme");
      if (storedTheme) setTheme(storedTheme);
    } catch (e) {
      console.error("Erreur lecture localStorage:", e);
    }
  }, []);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("tc-theme", theme);
  }, [theme]);
  const value = reactExports.useMemo(
    () => ({
      user,
      theme,
      tontines,
      available,
      settings,
      isLoading,
      login: (email, password) => {
        const accounts = JSON.parse(localStorage.getItem("tc-accounts") || "[]");
        console.log("Comptes enregistrés:", accounts.length);
        const found = accounts.find((a) => a.email === email && a.password === password);
        if (found) {
          const u = { name: found.name, email: found.email, wallet: found.wallet };
          console.log("Connexion réussie pour:", u.name);
          setUser(u);
          localStorage.setItem("tc-current-user", JSON.stringify(u));
          return true;
        }
        console.warn("Échec connexion: identifiants non trouvés");
        return false;
      },
      signup: (name, email, password) => {
        try {
          const accounts = JSON.parse(localStorage.getItem("tc-accounts") || "[]");
          if (accounts.find((a) => a.email === email)) {
            console.warn("Email déjà pris:", email);
            return false;
          }
          const newAcc = { name, email, password, wallet: randomWallet() };
          accounts.push(newAcc);
          localStorage.setItem("tc-accounts", JSON.stringify(accounts));
          console.log("Nouveau compte créé:", name);
          const u = { name: newAcc.name, email: newAcc.email, wallet: newAcc.wallet };
          setUser(u);
          localStorage.setItem("tc-current-user", JSON.stringify(u));
          return true;
        } catch (e) {
          console.error("Erreur signup:", e);
          return false;
        }
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem("tc-current-user");
      },
      toggleTheme: () => setTheme((t) => t === "dark" ? "light" : "dark"),
      createTontine: async ({ name, capacity, isUnlimitedCapacity, amount, cycle, visibility, startDate }) => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        const id = `t-${Date.now().toString(36)}`;
        const code = `TC-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(1e3 + Math.random() * 9e3)}`;
        const t = {
          id,
          code,
          name,
          description: "Nouvelle tontine créée par vous.",
          members: [{ id: "m1", name: "Vous", wallet: user?.wallet ?? randomWallet(), status: "paid" }],
          capacity,
          isUnlimitedCapacity,
          amount,
          cycle,
          role: "creator",
          visibility,
          startDate,
          rules: "Règles Smart Contract Polygon :\n- Retard au 1er cycle : Avertissement.\n- Retard au 2e cycle : Pénalité de 5% du dépôt.\n- 3e retard ou non-paiement prolongé : Exclusion et confiscation des fonds pour dédommager le cercle.",
          nextDue: cycle === "weekly" ? "Dans 7 jours" : "Dans 30 jours",
          progress: 0,
          transactions: []
        };
        setTontines((arr) => [t, ...arr]);
        if (visibility === "public") {
          setAvailable((arr) => [{ ...t, role: "available", members: [] }, ...arr]);
        }
        setIsLoading(false);
        return id;
      },
      joinTontine: async (id, rank) => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        const found = available.find((a) => a.id === id);
        if (!found) {
          setIsLoading(false);
          return;
        }
        const joined = {
          ...found,
          role: "member",
          nextDue: found.cycle === "weekly" ? "Dans 7 jours" : "Dans 30 jours",
          progress: 10,
          members: [
            { id: "me", name: "Vous", wallet: user?.wallet ?? randomWallet(), status: "pending", rank },
            ...fillMembers(found.capacity, found.members.length)
          ]
        };
        setTontines((arr) => [joined, ...arr]);
        setAvailable((arr) => arr.filter((a) => a.id !== id));
        setIsLoading(false);
      },
      leaveTontine: async (id) => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setTontines((prev) => prev.filter((t) => t.id !== id));
        setIsLoading(false);
      },
      getTontineByCode: async (code) => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        const found = [...available, ...tontines].find((a) => a.code === code);
        if (found) {
          if (tontines.some((t) => t.id === found.id && t.role !== "available")) {
            setIsLoading(false);
            return "already";
          }
          setIsLoading(false);
          return found;
        }
        setIsLoading(false);
        return "not_found";
      },
      simulatePenalty: (tontineId, memberId) => {
        setTontines((prev) => prev.map((t) => {
          if (t.id !== tontineId) return t;
          return {
            ...t,
            members: t.members.map((m) => {
              if (m.id !== memberId) return m;
              let nextStatus = "late";
              if (m.status === "paid" || m.status === "pending") nextStatus = "late";
              else if (m.status === "late") nextStatus = "warning";
              else if (m.status === "warning") nextStatus = "banned";
              return { ...m, status: nextStatus };
            })
          };
        }));
      },
      setSettings: (s) => setSettingsState((prev) => ({ ...prev, ...s }))
    }),
    [user, theme, tontines, available, settings, isLoading]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppCtx.Provider, { value, children });
}
function useApp() {
  const ctx = reactExports.useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl text-primary", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page introuvable" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "La page que vous cherchez n'existe pas ou a été déplacée." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-pill-primary", children: "Retour à l'accueil" }) })
  ] }) });
}
const Route$8 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "blockTine — L'épargne collective sécurisée" },
      {
        name: "description",
        content: "blockTine : la tontine béninoise réinventée sur la blockchain Polygon. Épargne collective, transparente et décentralisée."
      },
      { property: "og:title", content: "blockTine — L'épargne collective sécurisée" },
      { property: "og:description", content: "La tontine décentralisée, sécurisée par smart contracts." },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital@1&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
const $$splitComponentImporter$7 = () => import("./dashboard-BqiIs0fX.mjs");
const Route$7 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./auth-9FnOszoY.mjs");
const Route$6 = createFileRoute("/auth")({
  validateSearch: (search) => ({
    mode: search.mode === "signup" ? "signup" : "login"
  }),
  head: () => ({
    meta: [{
      title: "Connexion — blockTine"
    }, {
      name: "description",
      content: "Connectez-vous ou créez un compte blockTine."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-cZmR0m5G.mjs");
const Route$5 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "blockTine — L'épargne collective réinventée"
    }, {
      name: "description",
      content: "L'épargne collective béninoise sécurisée par smart contracts Polygon. Transparente, décentralisée, communautaire."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./dashboard.index-B2FjbFvN.mjs");
const Route$4 = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [{
      title: "Tableau de bord — blockTine"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dashboard.settings-D2R4TzZ5.mjs");
const Route$3 = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [{
      title: "Paramètres — blockTine"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./dashboard.join-nm_ujHns.mjs");
const Route$2 = createFileRoute("/dashboard/join")({
  head: () => ({
    meta: [{
      title: "Rejoindre une tontine — blockTine"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./dashboard.create-BmFyE_na.mjs");
const Route$1 = createFileRoute("/dashboard/create")({
  head: () => ({
    meta: [{
      title: "Créer une tontine — blockTine"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./dashboard.tontine._tontineId-0dYzjqhl.mjs");
const Route = createFileRoute("/dashboard/tontine/$tontineId")({
  head: () => ({
    meta: [{
      title: "Détail tontine — blockTine"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const DashboardRoute = Route$7.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$8
});
const AuthRoute = Route$6.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const DashboardIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => DashboardRoute
});
const DashboardSettingsRoute = Route$3.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => DashboardRoute
});
const DashboardJoinRoute = Route$2.update({
  id: "/join",
  path: "/join",
  getParentRoute: () => DashboardRoute
});
const DashboardCreateRoute = Route$1.update({
  id: "/create",
  path: "/create",
  getParentRoute: () => DashboardRoute
});
const DashboardTontineTontineIdRoute = Route.update({
  id: "/tontine/$tontineId",
  path: "/tontine/$tontineId",
  getParentRoute: () => DashboardRoute
});
const DashboardRouteChildren = {
  DashboardCreateRoute,
  DashboardJoinRoute,
  DashboardSettingsRoute,
  DashboardIndexRoute,
  DashboardTontineTontineIdRoute
};
const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuthRoute,
  DashboardRoute: DashboardRouteWithChildren
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$6 as R,
  Route as a,
  router as r,
  useApp as u
};
