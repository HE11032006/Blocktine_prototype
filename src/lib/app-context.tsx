import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { availableTontines as initAvailable, initialTontines, type Cycle, type Tontine, fillMembers } from "@/lib/mock-data";
import { supabase } from "@/lib/supabase";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface User {
  id: string;
  name: string;
  email: string;
  wallet: string;
  phone?: string;
  balance?: string;
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
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  loginGuest: () => void;
  logout: () => void;
  toggleTheme: () => void;
  createTontine: (data: { name: string; capacity: number; isUnlimitedCapacity?: boolean; amount: number; cycle: Cycle; visibility: "public" | "private"; startDate: string }) => Promise<string>;
  deposit: (tontineId: string, amountFCFA: number, phoneNumber: string) => Promise<boolean>;
  joinTontine: (id: string, inviteCode: string, rank: number) => Promise<void>;
  leaveTontine: (id: string) => Promise<void>;
  getTontineByCode: (code: string) => Promise<Tontine | "already" | "not_found">;
  simulatePenalty: (tontineId: string, memberId: string) => void;
  setSettings: (s: Partial<Settings>) => void;
}

const AppCtx = createContext<AppState | null>(null);

// Configure axios with interceptor for auth token
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  if (data.session?.access_token) {
    config.headers.Authorization = `Bearer ${data.session.access_token}`;
  }
  return config;
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [tontines, setTontines] = useState<Tontine[]>([]);
  const [available, setAvailable] = useState<Tontine[]>(initAvailable);
  const [settings, setSettingsState] = useState<Settings>({
    notifPayment: true,
    notifNewMember: true,
    notifCycleEnd: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle Supabase Auth Changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || "User",
          email: session.user.email || "",
          wallet: session.user.user_metadata.wallet_address || "0x...",
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || "User",
          email: session.user.email || "",
          wallet: session.user.user_metadata.wallet_address || "0x...",
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Tontines from Backend
  const fetchTontines = async () => {
    if (!user) return;
    try {
      const res = await api.get("/groups");
      // Map backend groups to frontend Tontine structure
      const mapped: Tontine[] = await Promise.all(res.data.groups.map(async (g: any) => {
        const mRes = await api.get(`/groups/${g.id}/members`);
        const pRes = await api.get(`/payments/group/${g.id}`);
        
        return {
          id: g.id,
          code: g.invite_code,
          name: g.name,
          description: `Tontine sécurisée sur Polygon.`,
          amount: g.amount_fcfa,
          capacity: g.max_members,
          cycle: g.frequency_days === 7 ? "weekly" : "monthly",
          role: g.creator_id === user.id ? "creator" : "member",
          visibility: g.is_public ? "public" : "private",
          members: mRes.data,
          transactions: pRes.data.map((p: any) => ({
            id: p.id,
            hash: p.kotani_ref,
            member: p.user_id === user.id ? "Vous" : "Membre",
            type: "Dépôt",
            amount: p.amount_fcfa,
            status: p.status,
            date: new Date(p.created_at).toLocaleDateString("fr-FR"),
          })),
          hasPendingPayment: pRes.data.some((p: any) => p.user_id === user.id && p.status === "pending"),
          progress: 0,
        };
      }));
      setTontines(mapped);
    } catch (e) {
      console.error("Erreur chargement tontines:", e);
      setTontines([]); // No fallback to mocks
    }
  };

  const fetchBalance = async () => {
    if (!user) return;
    try {
      const res = await api.get("/payments/balance");
      setUser(prev => prev ? { ...prev, balance: res.data.balance_usdc } : null);
    } catch (e) {
      console.error("Erreur solde:", e);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTontines();
      fetchBalance();
    }
  }, [user]);

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
      login: async (email, password) => {
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setIsLoading(false);
        return !error;
      },
      signup: async (name, email, password) => {
        setIsLoading(true);
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name, wallet_address: `0x${Math.random().toString(16).slice(2, 40)}` } }
        });
        setIsLoading(false);
        return !error;
      },
      deposit: async (tontineId, amountFCFA, phoneNumber) => {
        setIsLoading(true);
        try {
          await api.post("/payments/initiate", {
            group_id: tontineId,
            round_id: null, // Initial deposit doesn't have a round yet
            amount_fcfa: amountFCFA,
            phone_number: phoneNumber
          });
          setIsLoading(false);
          return true;
        } catch (e: any) {
          console.error("Erreur depot:", e);
          if (e.response?.status === 409) {
            toast.error("Paiement déjà en cours", {
              description: "Une demande de paiement a déjà été initiée pour cette période."
            });
          }
          setIsLoading(false);
          return false;
        }
      },
      loginGuest: () => {
        const guest = { id: "demo-id", name: "Visiteur Démo", email: "demo@blocktine.com", wallet: "0xDEMO…777" };
        setUser(guest);
      },
      logout: () => {
        supabase.auth.signOut();
        setUser(null);
        setTontines([]);
      },
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      createTontine: async ({ name, capacity, amount, cycle, visibility }) => {
        setIsLoading(true);
        try {
          const res = await api.post("/groups", {
            name,
            amount_fcfa: Math.max(amount, 500),
            frequency_days: cycle === "weekly" ? 7 : 30,
            max_members: capacity,
            is_public: visibility === "public"
          });
          
          await fetchTontines(); // Reload
          setIsLoading(false);
          return res.data.id;
        } catch (e) {
          console.error("Erreur création tontine:", e);
          setIsLoading(false);
          return "error";
        }
      },
      joinTontine: async (id, inviteCode, _rank) => {
        setIsLoading(true);
        try {
          await api.post(`/groups/${id}/join`, { invite_code: inviteCode });
          await fetchTontines();
        } catch (e) {
          console.error("Erreur join:", e);
          toast.error("Erreur lors de l'adhésion au cercle.");
        }
        setIsLoading(false);
      },
      leaveTontine: async (id) => {
        setIsLoading(true);
        try {
          await api.delete(`/groups/${id}/leave`);
          await fetchTontines();
        } catch (e) {
          console.error("Erreur leave:", e);
        }
        setIsLoading(false);
      },
      getTontineByCode: async (code) => {
        setIsLoading(true);
        try {
          const res = await api.get(`/groups/by-code/${code}`);
          const g = res.data;
          
          // Map to frontend structure
          const mapped: Tontine = {
            id: g.id,
            code: g.invite_code,
            name: g.name,
            description: `Tontine sécurisée.`,
            amount: g.amount_fcfa,
            capacity: g.max_members,
            cycle: g.frequency_days === 7 ? "weekly" : "monthly",
            role: "member", // Default as we are searching to join
            visibility: g.is_public ? "public" : "private",
            members: [],
            transactions: [],
            progress: 0,
          };
          
          setIsLoading(false);
          return mapped;
        } catch (e) {
          console.error("Code non trouvé:", e);
          setIsLoading(false);
          return "not_found";
        }
      },
      simulatePenalty: (tontineId, memberId) => {
        // Mock only for visual demo
        setTontines(prev => prev.map(t => {
          if (t.id !== tontineId) return t;
          return {
            ...t,
            members: t.members.map(m => {
              if (m.id !== memberId) return m;
              let nextStatus: any = "late";
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
