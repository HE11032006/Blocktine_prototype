import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { toast } from "sonner";
import { ArrowLeft, ShieldCheck, Calendar, CheckCircle2, Clock, AlertCircle, Crown, Users, XCircle } from "lucide-react";
import type { Tontine, Member, MemberStatus, Transaction } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/tontine/$tontineId")({
  head: () => ({ meta: [{ title: "Détail tontine — blockTine" }] }),
  component: TontineDetail,
});

function TontineDetail() {
  const { tontineId } = Route.useParams();
  const { tontines, deposit } = useApp();
  const t = tontines.find((x) => x.id === tontineId);
  const [view, setView] = useState<"creator" | "member">(t?.role === "creator" ? "creator" : "member");
  const [showPayment, setShowPayment] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [operator, setOperator] = useState<"tmoney" | "flooz">("tmoney");

  if (!t) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="font-display text-4xl">Tontine introuvable</h1>
        <Link to="/dashboard" className="btn-pill-primary mt-6 inline-flex">
          Retour au tableau de bord
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Retour
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[0.7rem] uppercase tracking-widest text-primary font-semibold">
            {t.cycle === "weekly" ? "Hebdomadaire" : "Mensuel"} · {t.amount.toLocaleString()} FCFA
          </span>
          <h1 className="font-display text-5xl mt-1">{t.name}</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">{t.description}</p>
        </div>
        <span className="hero-badge">
          <ShieldCheck className="h-3 w-3 mr-1" /> Sécurisée par smart contracts Polygon
        </span>
      </div>

      {/* Code + members summary strip */}
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <div className="tc-card p-4 sm:col-span-1">
          <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Code de la tontine</span>
          <p className="font-display text-2xl text-primary tracking-wider mt-0.5">{t.code}</p>
        </div>
        <div className="tc-card p-4">
          <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Membres</span>
          <p className="font-display text-2xl text-primary mt-0.5">{t.members.length} / {t.capacity}</p>
        </div>
        <div className="tc-card p-4">
          <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">En règle</span>
          <p className="font-display text-2xl text-primary mt-0.5">
            {t.members.filter((m) => m.status === "paid").length} / {t.members.length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="inline-flex p-1 rounded-full bg-secondary border border-border mb-6">
        {(["creator", "member"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
              view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Vue {v === "creator" ? "créatrice" : "membre"}
          </button>
        ))}
      </div>

      {view === "creator" ? (
        <CreatorView t={t} />
      ) : (
        <MemberView
          t={t}
          showPayment={showPayment}
          setShowPayment={setShowPayment}
          isPaying={isPaying}
          setIsPaying={setIsPaying}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          operator={operator}
          setOperator={setOperator}
          deposit={deposit}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: MemberStatus }) {
  const map = {
    paid: { icon: <CheckCircle2 className="h-3 w-3" />, label: "À jour", cls: "text-primary bg-primary/10" },
    pending: { icon: <Clock className="h-3 w-3" />, label: "En attente", cls: "text-muted-foreground bg-secondary" },
    late: { icon: <AlertCircle className="h-3 w-3" />, label: "En retard", cls: "text-[#f59e0b] bg-[#f59e0b]/10" },
    warning: { icon: <AlertCircle className="h-3 w-3" />, label: "Pénalité (5%)", cls: "text-[#f59e0b] bg-[#f59e0b]/20 border border-[#f59e0b]/30" },
    banned: { icon: <XCircle className="h-3 w-3" />, label: "Banni / Exclu", cls: "text-destructive bg-destructive/10 border border-destructive/30" },
  } as const;
  const v = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.65rem] font-medium ${v.cls}`}>
      {v.icon} {v.label}
    </span>
  );
}

function CreatorView({ t }: { t: Tontine }) {
  const paidCount = t.members.filter((m) => m.status === "paid").length;
  const pct = t.members.length ? Math.round((paidCount / t.members.length) * 100) : 0;

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {/* Members grouped by status */}
      <div className="tc-card p-6 lg:col-span-2">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="font-display text-2xl">Membres</h3>
          <span className="text-xs text-muted-foreground">
            {paidCount} en règle · {t.members.length - paidCount} en attente
          </span>
        </div>

        <MemberGroup
          label="✓ En règle"
          tone="ok"
          members={t.members.filter((m) => m.status === "paid")}
          tontineId={t.id}
        />
        <MemberGroup
          label="⏱ En attente"
          tone="muted"
          members={t.members.filter((m) => m.status === "pending")}
          tontineId={t.id}
        />
        <MemberGroup
          label="⚠ En retard"
          tone="bad"
          members={t.members.filter((m) => m.status === "late")}
          tontineId={t.id}
        />
        <MemberGroup
          label="⚠ Avertissement / Pénalité"
          tone="warning"
          members={t.members.filter((m) => m.status === "warning")}
          tontineId={t.id}
        />
        <MemberGroup
          label="⛔ Bannis / Exclus"
          tone="banned"
          members={t.members.filter((m) => m.status === "banned")}
          tontineId={t.id}
        />
      </div>

      {/* Tracker */}
      <div className="tc-card p-6">
        <h3 className="font-display text-2xl mb-4">Contributions</h3>
        <div className="flex items-baseline gap-2">
          <span className="stat-num">{pct}%</span>
          <span className="text-xs text-muted-foreground">à jour</span>
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {paidCount}/{t.members.length} membres ont payé ce cycle.
        </p>
      </div>

      {/* Tx history */}
      <div className="tc-card p-6 lg:col-span-3">
        <h3 className="font-display text-2xl mb-4">Historique des transactions</h3>
        {t.transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune transaction pour l'instant.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  <th className="text-left pb-3 font-medium">Hash</th>
                  <th className="text-left pb-3 font-medium">Membre</th>
                  <th className="text-left pb-3 font-medium">Type</th>
                  <th className="text-right pb-3 font-medium">Montant</th>
                  <th className="text-right pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {t.transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-3 font-mono text-xs text-primary">{tx.hash}</td>
                    <td>{tx.member}</td>
                    <td className="text-muted-foreground capitalize">{tx.type}</td>
                    <td className="text-right font-display text-lg text-primary">{tx.amount.toLocaleString()} FCFA</td>
                    <td className="text-right text-xs text-muted-foreground">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function MemberView({
  t,
  showPayment,
  setShowPayment,
  isPaying,
  setIsPaying,
  phoneNumber,
  setPhoneNumber,
  operator,
  setOperator,
  deposit,
}: {
  t: Tontine;
  showPayment: boolean;
  setShowPayment: (v: boolean) => void;
  isPaying: boolean;
  setIsPaying: (v: boolean) => void;
  phoneNumber: string;
  setPhoneNumber: (v: string) => void;
  operator: "tmoney" | "flooz";
  setOperator: (v: "tmoney" | "flooz") => void;
  deposit: (tontineId: string, amount: number, phone: string) => Promise<boolean>;
}) {
  const { leaveTontine } = useApp();
  const navigate = useNavigate();
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const me = t.members.find((m) => m.name === "Vous") ?? t.members[0];
  const startDate = new Date(); // Fallback to now
  const schedule = Array.from({ length: Math.min(t.capacity, 12) }).map((_, i) => {
    const date = new Date(startDate);
    if (t.cycle === "weekly") date.setDate(date.getDate() + (i * 7));
    else date.setMonth(date.getMonth() + i);
    
    return {
      cycle: i + 1,
      date: date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
      paid: false, // Default to false, will be linked to real tx later
    };
  });

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {/* My status */}
      <div className="tc-card p-6 lg:col-span-1">
        <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Mon statut</span>
        <div className="mt-2"><StatusBadge status={me?.status ?? "pending"} /></div>
        <div className="mt-6">
          <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Prochaine échéance</span>
          <p className="font-display text-3xl text-primary mt-1">{t.nextDue ?? "—"}</p>
          <p className="text-xs text-muted-foreground mt-1">Montant : {t.amount.toLocaleString()} FCFA</p>
        </div>
        <button 
          onClick={() => setShowPayment(true)}
          disabled={t.hasPendingPayment || isPaying}
          className="btn-pill-primary w-full justify-center mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.hasPendingPayment ? (
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 animate-pulse" />
              Paiement en cours...
            </span>
          ) : "Effectuer le paiement"}
        </button>
        <button
          onClick={() => setShowLeaveWarning(true)}
          className="btn-pill-secondary w-full justify-center mt-3 text-destructive border-destructive/20 hover:bg-destructive/10"
        >
          Quitter la tontine
        </button>
      </div>

      {/* Leave Warning Modal */}
      {showLeaveWarning && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-background/80 backdrop-blur-sm px-4">
          <div className="tc-card max-w-sm w-full p-6 relative fade-up border-destructive/30 shadow-[0_0_40px_rgba(220,38,38,0.15)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-destructive/10 grid place-items-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-display text-xl text-destructive">Danger : Risque de perte</h3>
                <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Smart Contract Polygon</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-foreground">
                Êtes-vous sûr de vouloir quitter cette tontine avant la fin du cycle ?
              </p>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <ul className="text-xs text-destructive/90 space-y-2 list-disc pl-4">
                  <li><strong>Perte des fonds :</strong> Vos contributions passées ne vous seront pas restituées.</li>
                  <li><strong>Redistribution :</strong> L'argent sera confisqué par le contrat et redistribué aux autres membres pour compenser votre départ.</li>
                  <li><strong>Irréversible :</strong> Cette action inscrite sur la blockchain ne peut être annulée.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowLeaveWarning(false)}
                disabled={isLeaving}
                className="btn-pill-secondary flex-1 justify-center"
              >
                Annuler
              </button>
              <button 
                onClick={async () => {
                  setIsLeaving(true);
                  await leaveTontine(t.id);
                  setIsLeaving(false);
                  setShowLeaveWarning(false);
                  toast.success("Vous avez quitté la tontine", { 
                    description: "Les pénalités du Smart Contract ont été appliquées." 
                  });
                  navigate({ to: "/dashboard" });
                }}
                disabled={isLeaving}
                className="btn-pill-primary flex-1 justify-center bg-destructive hover:bg-destructive/90 text-white border-transparent"
              >
                {isLeaving ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    En cours...
                  </span>
                ) : "Continuer et Quitter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-background/80 backdrop-blur-sm px-4">
          <div className="tc-card max-w-sm w-full p-6 relative fade-up border-primary/30 shadow-[0_0_40px_rgba(var(--color-or-rgb),0.1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 grid place-items-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl">Paiement Mobile Money</h3>
                <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Passerelle Kotani Pay</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground block mb-2">Opérateur</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["tmoney", "flooz"] as const).map((op) => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setOperator(op)}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                        operator === op
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {op === "tmoney" ? "T-Money" : "Flooz"}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Numéro de téléphone</span>
                <input
                  type="tel"
                  placeholder="90 00 00 00"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>

              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Action</span>
                  <span className="font-medium">Dépôt Mobile Money</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Montant</span>
                  <span className="font-display text-lg text-primary">{t.amount.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gaz (Blockchain)</span>
                  <span className="text-primary">Inclus</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Vers</span>
                  <span className="truncate ml-4">0x71C...4921</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowPayment(false);
                  setPhoneNumber("");
                }}
                disabled={isPaying}
                className="btn-pill-secondary flex-1 justify-center"
              >
                Annuler
              </button>
              <button 
                onClick={async () => {
                  setIsPaying(true);
                  try {
                    if (!phoneNumber) {
                      toast.error("Veuillez saisir votre numéro");
                      setIsPaying(false);
                      return;
                    }
                    toast.info(`Initialisation du paiement ${operator === 'tmoney' ? 'T-Money' : 'Flooz'}...`);
                    
                    const success = await deposit(t.id, t.amount, phoneNumber);
                    
                    setIsPaying(false);
                    if (success) {
                      setShowPayment(false);
                      toast.success("Demande envoyée !", { 
                        description: `Un message de confirmation a été envoyé au ${phoneNumber}.` 
                      });
                    } else {
                      toast.error("Échec de l'initialisation du paiement");
                    }
                  } catch (e) {
                    toast.error("Erreur de paiement");
                    setIsPaying(false);
                  }
                }}
                disabled={isPaying}
                className="btn-pill-primary flex-1 justify-center"
              >
                {isPaying ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 border-2 border-noir border-t-transparent rounded-full animate-spin" />
                    Envoi...
                  </span>
                ) : "Confirmer"}
              </button>
            </div>
            
            <p className="text-[0.6rem] text-center text-muted-foreground mt-4">
              Sécurisé par le protocole blockTine. Vos fonds sont convertis en USDC et déposés sur Polygon après validation.
            </p>
          </div>
        </div>
      )}

      {/* Schedule */}
      <div className="tc-card p-6 lg:col-span-2">
        <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" /> Calendrier
        </h3>
        <ul className="space-y-2">
          {schedule.map((s) => (
            <li
              key={s.cycle}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full grid place-items-center bg-background font-display text-primary">
                  {s.cycle}
                </div>
                <span className="text-sm">{s.date}</span>
              </div>
              <StatusBadge status={s.paid ? "paid" : "pending"} />
            </li>
          ))}
        </ul>
      </div>

      {/* Group progress */}
      <div className="tc-card p-6 lg:col-span-3">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display text-2xl">Progression du cercle</h3>
          <span className="stat-num">{t.progress ?? 0}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${t.progress ?? 0}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {t.members.length}/{t.capacity} membres · {t.cycle === "weekly" ? "Cycle hebdo" : "Cycle mensuel"}
        </p>
      </div>

      {/* Members directory (visible to members) */}
      <div className="tc-card p-6 lg:col-span-3">
        <MembersDirectory members={t.members} tontineId={t.id} />
      </div>
    </div>
  );
}

function MembersDirectory({ members, tontineId }: { members: Member[], tontineId: string }) {
  const { simulatePenalty } = useApp();
  const [filter, setFilter] = useState<"all" | "paid" | "not-paid">("all");
  const creatorId = members[0]?.id;
  const meId = members.find((m) => m.name === "Vous")?.id;

  const filtered = members.filter((m) =>
    filter === "all" ? true : filter === "paid" ? m.status === "paid" : m.status !== "paid"
  );

  const paidCount = members.filter((m) => m.status === "paid").length;

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <div>
          <h3 className="font-display text-2xl flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> Membres du cercle
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {paidCount} sur {members.length} sont à jour ce cycle.
          </p>
        </div>
        <div className="inline-flex p-1 rounded-full bg-secondary border border-border">
          {([
            { v: "all", l: "Tous" },
            { v: "paid", l: "À jour" },
            { v: "not-paid", l: "Pas à jour" },
          ] as const).map((opt) => (
            <button
              key={opt.v}
              onClick={() => setFilter(opt.v)}
              className={`px-3.5 py-1.5 rounded-full text-[0.7rem] font-medium transition-all ${
                filter === opt.v
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">Aucun membre dans cette catégorie.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-2">
          {filtered.map((m) => {
            const isCreator = m.id === creatorId;
            const isMe = m.id === meId;
            return (
              <li
                key={m.id}
                className={`flex items-center justify-between gap-3 p-3 rounded-lg border ${
                  isMe ? "border-primary/40 bg-primary/5" : "border-border bg-secondary/30"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 shrink-0 rounded-full grid place-items-center bg-secondary text-primary font-display relative">
                    {m.name[0]}
                    {isCreator && (
                      <Crown className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-primary" aria-label="Créatrice" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate flex items-center gap-2">
                      {m.name}
                      {isMe && (
                        <span className="text-[0.6rem] uppercase tracking-widest text-primary">vous</span>
                      )}
                      {isCreator && !isMe && (
                        <span className="text-[0.6rem] uppercase tracking-widest text-primary">créatrice</span>
                      )}
                    </p>
                    <p className="font-mono text-[0.7rem] text-muted-foreground truncate">{m.wallet}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={m.status} />
                  {m.name !== "Vous" && m.status !== "banned" && (
                    <button
                      onClick={() => simulatePenalty(tontineId, m.id)}
                      title="Simuler sanction (Smart Contract)"
                      className="p-1.5 rounded-md bg-secondary border border-border hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all"
                    >
                      <AlertCircle className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function MemberGroup({
  label,
  tone,
  members,
  tontineId,
}: {
  label: string;
  tone: "ok" | "muted" | "bad" | "warning" | "banned";
  members: Member[];
  tontineId: string;
}) {
  const { simulatePenalty } = useApp();
  if (members.length === 0) return null;
  const color =
    tone === "ok" ? "text-primary" : tone === "bad" ? "text-[#f59e0b]" : tone === "warning" ? "text-[#f59e0b]" : tone === "banned" ? "text-destructive" : "text-muted-foreground";
  return (
    <div className="mt-4 first:mt-0">
      <div className={`text-[0.65rem] uppercase tracking-widest font-semibold ${color} mb-2`}>
        {label} <span className="text-muted-foreground">· {members.length}</span>
      </div>
      <ul className="divide-y divide-border rounded-lg border border-border overflow-hidden">
        {members.map((m) => (
          <li key={m.id} className="flex items-center justify-between py-2.5 px-3 bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full grid place-items-center bg-secondary text-primary font-display">
                {m.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium">{m.name}</p>
                <p className="font-mono text-[0.7rem] text-muted-foreground">{m.wallet}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={m.status} />
              {m.name !== "Vous" && m.status !== "banned" && (
                <button
                  onClick={() => simulatePenalty(tontineId, m.id)}
                  title="Simuler sanction (Smart Contract)"
                  className="p-1.5 rounded-md bg-background hover:bg-secondary hover:text-[#f59e0b] transition-colors"
                >
                  <AlertCircle className="h-3 w-3" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
