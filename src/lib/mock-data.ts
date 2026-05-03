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
  code: string;
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

const sampleTx = (n: number, amount: number): Transaction[] =>
  Array.from({ length: n }).map((_, i) => ({
    id: `tx-${Math.random().toString(36).slice(2, 9)}`,
    hash: `0x${Math.random().toString(16).slice(2, 10)}…${Math.random().toString(16).slice(2, 6)}`,
    member: ["Aïcha K.", "Kossi A.", "Mariam B.", "Eric D.", "Fatou L.", "Yves P.", "Bineta S."][i % 7],
    amount: amount,
    date: new Date(Date.now() - i * 86400000 * 2).toISOString().split('T')[0],
    type: i % 5 === 4 ? "payout" : "contribution",
  }));

export const initialTontines: Tontine[] = [
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
      { id: "m6", name: "Fatou L.", wallet: "0x1bb2…cd1", status: "paid" },
    ],
    capacity: 10,
    amount: 50,
    cycle: "monthly",
    role: "creator",
    nextDue: "12 mai 2025",
    progress: 62,
    transactions: sampleTx(12, 50),
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
      { id: "m4", name: "Bineta S.", wallet: "0x99fe…33a", status: "paid" },
    ],
    capacity: 6,
    amount: 25,
    cycle: "weekly",
    role: "member",
    nextDue: "29 avril 2025",
    progress: 45,
    transactions: sampleTx(8, 25),
  },
  {
    id: "t-abomey",
    code: "ABOM-5501",
    name: "Cercle d'Abomey",
    description: "Hommage aux traditions d'entraide. Cycle hebdomadaire pour une épargne rapide.",
    members: [
      { id: "m1", name: "Vous", wallet: "0x7a3f…b21", status: "paid" },
      { id: "m2", name: "Koffi J.", wallet: "0x22ab…cc1", status: "paid" },
      { id: "m3", name: "Zinsou F.", wallet: "0x54ef…88b", status: "paid" },
    ],
    capacity: 5,
    amount: 100,
    cycle: "weekly",
    role: "member",
    nextDue: "5 mai 2025",
    progress: 80,
    transactions: sampleTx(15, 100),
  },
];

export const availableTontines: Tontine[] = [
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
    transactions: [],
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
    transactions: [],
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
    transactions: [],
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
    transactions: [],
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
