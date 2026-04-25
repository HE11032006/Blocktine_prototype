export type TontineStatus = "active" | "open";
export type MemberStatus = "paid" | "pending" | "late";
export type Cycle = "weekly" | "monthly";

export interface Member {
  id: string;
  name: string;
  wallet: string;
  status: MemberStatus;
}

export interface Transaction {
  id: string;
  hash: string;
  member: string;
  amount: number;
  date: string;
  type: "contribution" | "payout";
}

export interface Tontine {
  id: string;
  name: string;
  description: string;
  members: Member[];
  capacity: number;
  amount: number; // MATIC per cycle
  cycle: Cycle;
  role: "creator" | "member" | "available";
  nextDue?: string;
  progress?: number; // 0-100
  transactions: Transaction[];
}

const sampleTx = (n: number): Transaction[] =>
  Array.from({ length: n }).map((_, i) => ({
    id: `tx-${i}`,
    hash: `0x${Math.random().toString(16).slice(2, 10)}…${Math.random().toString(16).slice(2, 6)}`,
    member: ["Aïcha", "Kossi", "Mariam", "Eric", "Fatou"][i % 5],
    amount: 50,
    date: `2025-04-${String(20 - i).padStart(2, "0")}`,
    type: i % 4 === 3 ? "payout" : "contribution",
  }));

export const initialTontines: Tontine[] = [
  {
    id: "t-cauris",
    name: "Cercle des Cauris",
    description: "Tontine mensuelle entre artisans du marché Dantokpa.",
    members: [
      { id: "m1", name: "Vous", wallet: "0x7a3f…b21", status: "paid" },
      { id: "m2", name: "Aïcha K.", wallet: "0x9c1d…f4a", status: "paid" },
      { id: "m3", name: "Kossi A.", wallet: "0x2e8b…77c", status: "pending" },
      { id: "m4", name: "Mariam B.", wallet: "0x4f12…aa9", status: "late" },
      { id: "m5", name: "Eric D.", wallet: "0x83a0…012", status: "paid" },
    ],
    capacity: 8,
    amount: 50,
    cycle: "monthly",
    role: "creator",
    nextDue: "12 mai 2025",
    progress: 62,
    transactions: sampleTx(6),
  },
  {
    id: "t-kente",
    name: "Tontine Kenté",
    description: "Épargne hebdo pour les commerçantes de Cotonou.",
    members: [
      { id: "m1", name: "Vous", wallet: "0x7a3f…b21", status: "pending" },
      { id: "m2", name: "Fatou L.", wallet: "0x1bb2…cd1", status: "paid" },
      { id: "m3", name: "Yves P.", wallet: "0x55de…102", status: "paid" },
    ],
    capacity: 6,
    amount: 25,
    cycle: "weekly",
    role: "member",
    nextDue: "29 avril 2025",
    progress: 38,
    transactions: sampleTx(4),
  },
];

export const availableTontines: Tontine[] = [
  {
    id: "a-baobab",
    name: "Cercle Baobab",
    description: "Étudiants & jeunes pros, paiements mensuels.",
    members: [],
    capacity: 10,
    amount: 30,
    cycle: "monthly",
    role: "available",
    transactions: [],
  },
  {
    id: "a-zinli",
    name: "Tontine Zinli",
    description: "Inspirée des chants Zinli, rythme hebdomadaire.",
    members: [],
    capacity: 8,
    amount: 20,
    cycle: "weekly",
    role: "available",
    transactions: [],
  },
  {
    id: "a-akwaba",
    name: "Akwaba Savings",
    description: "Tontine ouverte à la diaspora ouest-africaine.",
    members: [],
    capacity: 12,
    amount: 75,
    cycle: "monthly",
    role: "available",
    transactions: [],
  },
  {
    id: "a-cauris2",
    name: "Petits Cauris",
    description: "Micro-épargne pour étudiants.",
    members: [],
    capacity: 6,
    amount: 10,
    cycle: "weekly",
    role: "available",
    transactions: [],
  },
  {
    id: "a-vodun",
    name: "Cercle Vodún",
    description: "Tontine longue durée, fort engagement.",
    members: [],
    capacity: 15,
    amount: 100,
    cycle: "monthly",
    role: "available",
    transactions: [],
  },
];

export const fillMembers = (capacity: number, joined: number): Member[] =>
  Array.from({ length: joined }).map((_, i) => ({
    id: `gm-${i}`,
    name: ["Aïcha", "Kossi", "Mariam", "Eric", "Fatou", "Yves", "Bineta"][i % 7] + " " + String.fromCharCode(65 + i),
    wallet: `0x${Math.random().toString(16).slice(2, 6)}…${Math.random().toString(16).slice(2, 6)}`,
    status: (["paid", "pending", "late"] as MemberStatus[])[i % 3],
  }));

// pre-fill available tontines with random current member counts
availableTontines.forEach((t) => {
  const joined = Math.max(2, Math.floor(t.capacity * 0.4));
  t.members = fillMembers(t.capacity, joined);
});
