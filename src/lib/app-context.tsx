import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { availableTontines as initAvailable, initialTontines, type Cycle, type Tontine, fillMembers } from "@/lib/mock-data";

interface User {
  name: string;
  email: string;
  wallet: string;
}

interface Settings {
  notifPayment: boolean;
  notifNewMember: boolean;
  notifCycleEnd: boolean;
}

interface AppState {
  user: User | null;
  theme: "dark" | "light";
  tontines: Tontine[];
  available: Tontine[];
  settings: Settings;
  isLoading: boolean;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  toggleTheme: () => void;
  createTontine: (data: { name: string; capacity: number; isUnlimitedCapacity?: boolean; amount: number; cycle: Cycle; visibility: "public" | "private"; startDate: string }) => Promise<string>;
  joinTontine: (id: string, rank: number) => Promise<void>;
  leaveTontine: (id: string) => Promise<void>;
  getTontineByCode: (code: string) => Promise<Tontine | "already" | "not_found">;
  simulatePenalty: (tontineId: string, memberId: string) => void;
  setSettings: (s: Partial<Settings>) => void;
}

const AppCtx = createContext<AppState | null>(null);

const randomWallet = () =>
  `0x${Math.random().toString(16).slice(2, 6)}…${Math.random().toString(16).slice(2, 6)}`;

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [tontines, setTontines] = useState<Tontine[]>(initialTontines);
  const [available, setAvailable] = useState<Tontine[]>(initAvailable);
  const [settings, setSettingsState] = useState<Settings>({
    notifPayment: true,
    notifNewMember: true,
    notifCycleEnd: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Persistence logic
  useEffect(() => {
    if (typeof document === "undefined") return;
    try {
      const storedUser = localStorage.getItem("tc-current-user");
      if (storedUser) {
        console.log("Utilisateur trouvé en session:", storedUser);
        setUser(JSON.parse(storedUser));
      }
      
      const storedTheme = localStorage.getItem("tc-theme") as "dark" | "light" | null;
      if (storedTheme) setTheme(storedTheme);
    } catch (e) {
      console.error("Erreur lecture localStorage:", e);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("tc-theme", theme);
  }, [theme]);

  const value = useMemo<AppState>(
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
        const found = accounts.find((a: any) => a.email === email && a.password === password);
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
          if (accounts.find((a: any) => a.email === email)) {
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
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      createTontine: async ({ name, capacity, isUnlimitedCapacity, amount, cycle, visibility, startDate }) => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 800)); // Simulate network
        const id = `t-${Date.now().toString(36)}`;
        const code = `TC-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const t: Tontine = {
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
          transactions: [],
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
        await new Promise((r) => setTimeout(r, 800)); // Simulate network
        const found = available.find((a) => a.id === id);
        if (!found) {
          setIsLoading(false);
          return;
        }
        const joined: Tontine = {
          ...found,
          role: "member",
          nextDue: found.cycle === "weekly" ? "Dans 7 jours" : "Dans 30 jours",
          progress: 10,
          members: [
            { id: "me", name: "Vous", wallet: user?.wallet ?? randomWallet(), status: "pending", rank },
            ...fillMembers(found.capacity, found.members.length),
          ],
        };
        setTontines((arr) => [joined, ...arr]);
        setAvailable((arr) => arr.filter((a) => a.id !== id));
        setIsLoading(false);
        return true;
      },
      leaveTontine: async (id) => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 800)); // Simulate tx
        setTontines((prev) => prev.filter((t) => t.id !== id));
        setIsLoading(false);
      },
      getTontineByCode: async (code) => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 600)); // Search simulation
        const found = [...available, ...tontines].find((a) => a.code === code);
        if (found) {
          if (tontines.some(t => t.id === found.id && t.role !== "available")) {
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
        setTontines(prev => prev.map(t => {
          if (t.id !== tontineId) return t;
          return {
            ...t,
            members: t.members.map(m => {
              if (m.id !== memberId) return m;
              let nextStatus: "paid" | "pending" | "late" | "warning" | "banned" = "late";
              if (m.status === "paid" || m.status === "pending") nextStatus = "late";
              else if (m.status === "late") nextStatus = "warning";
              else if (m.status === "warning") nextStatus = "banned";
              
              return { ...m, status: nextStatus };
            })
          };
        }));
      },
      setSettings: (s) => setSettingsState((prev) => ({ ...prev, ...s })),
    }),
    [user, theme, tontines, available, settings, isLoading]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
