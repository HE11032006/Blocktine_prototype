import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { toast } from "sonner";
import { ArrowLeft, ShieldCheck, Calendar, CheckCircle2, Clock, AlertCircle, Crown, Users } from "lucide-react";
import type { MemberStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/tontine/$tontineId")({
  head: () => ({ meta: [{ title: "Détail tontine — blockTine" }] }),
  component: TontineDetail,
});

function TontineDetail() {
  const { tontineId } = Route.useParams();
  const { tontines } = useApp();
  const t = tontines.find((x) => x.id === tontineId);
  const [view, setView] = useState<"creator" | "member">(t?.role === "creator" ? "creator" : "member");

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
            {t.cycle === "weekly" ? "Hebdomadaire" : "Mensuel"} · {t.amount} MATIC
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

      {view === "creator" ? <CreatorView t={t} /> : <MemberView t={t} />}
    </div>
  );
}

function StatusBadge({ status }: { status: MemberStatus }) {
  const map = {
    paid: { icon: <CheckCircle2 className="h-3 w-3" />, label: "À jour", cls: "text-primary bg-primary/10" },
    pending: { icon: <Clock className="h-3 w-3" />, label: "En attente", cls: "text-muted-foreground bg-secondary" },
    late: { icon: <AlertCircle className="h-3 w-3" />, label: "En retard", cls: "text-destructive bg-destructive/10" },
  } as const;
  const v = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.65rem] font-medium ${v.cls}`}>
      {v.icon} {v.label}
    </span>
  );
}

function CreatorView({ t }: { t: import("@/lib/mock-data").Tontine }) {
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
        />
        <MemberGroup
          label="⏱ En attente"
          tone="muted"
          members={t.members.filter((m) => m.status === "pending")}
        />
        <MemberGroup
          label="⚠ En retard"
          tone="bad"
          members={t.members.filter((m) => m.status === "late")}
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
                    <td className="text-right font-display text-lg text-primary">{tx.amount} MATIC</td>
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

function MemberView({ t }: { t: import("@/lib/mock-data").Tontine }) {
  const me = t.members.find((m) => m.name === "Vous") ?? t.members[0];
  const schedule = Array.from({ length: 5 }).map((_, i) => ({
    cycle: i + 1,
    date: `${10 + i * (t.cycle === "weekly" ? 7 : 30)} mai`,
    paid: i < 2,
  }));

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {/* My status */}
      <div className="tc-card p-6 lg:col-span-1">
        <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Mon statut</span>
        <div className="mt-2"><StatusBadge status={me?.status ?? "pending"} /></div>
        <div className="mt-6">
          <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Prochaine échéance</span>
          <p className="font-display text-3xl text-primary mt-1">{t.nextDue ?? "—"}</p>
          <p className="text-xs text-muted-foreground mt-1">Montant : {t.amount} MATIC</p>
        </div>
        <button 
          onClick={async () => {
            toast.info("Initialisation de la transaction...", { description: "Ouverture de votre wallet" });
            await new Promise(r => setTimeout(r, 1500));
            toast.success("Contribution versée !", { description: "La transaction a été validée sur Polygon." });
          }}
          className="btn-pill-primary w-full justify-center mt-6"
        >
          Effectuer le paiement
        </button>
      </div>

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
        <MembersDirectory members={t.members} />
      </div>
    </div>
  );
}

function MembersDirectory({ members }: { members: import("@/lib/mock-data").Member[] }) {
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
                <StatusBadge status={m.status} />
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
}: {
  label: string;
  tone: "ok" | "muted" | "bad";
  members: import("@/lib/mock-data").Member[];
}) {
  if (members.length === 0) return null;
  const color =
    tone === "ok" ? "text-primary" : tone === "bad" ? "text-destructive" : "text-muted-foreground";
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
            <StatusBadge status={m.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}
