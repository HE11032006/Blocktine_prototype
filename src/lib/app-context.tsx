import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
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
  login: (name: string, email: string) => void;
  logout: () => void;
  toggleTheme: () => void;
  createTontine: (data: { name: string; capacity: number; amount: number; cycle: Cycle }) => Promise<string>;
  joinTontine: (id: string) => Promise<void>;
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

  // theme apply
  useEffect(() => {
    if (typeof document === "undefined") return;
    const stored = localStorage.getItem("tc-theme") as "dark" | "light" | null;
    if (stored) setTheme(stored);
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
      login: (name, email) => setUser({ name: name || "Invité", email, wallet: randomWallet() }),
      logout: () => setUser(null),
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      createTontine: async ({ name, capacity, amount, cycle }) => {
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
          amount,
          cycle,
          role: "creator",
          nextDue: cycle === "weekly" ? "Dans 7 jours" : "Dans 30 jours",
          progress: 0,
          transactions: [],
        };
        setTontines((arr) => [t, ...arr]);
        setIsLoading(false);
        return id;
      },
      joinTontine: async (id) => {
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
            { id: "me", name: "Vous", wallet: user?.wallet ?? randomWallet(), status: "pending" },
            ...fillMembers(found.capacity, found.members.length),
          ],
        };
        setTontines((arr) => [joined, ...arr]);
        setAvailable((arr) => arr.filter((a) => a.id !== id));
        setIsLoading(false);
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
