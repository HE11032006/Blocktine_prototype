import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/lib/app-context";
import { ArrowRight, Plus, Users, Wallet, TrendingUp, Calendar } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Tableau de bord — blockTine" }] }),
  component: DashboardHome,
});

function DashboardHome() {
  const { user, tontines } = useApp();
  const initials = user?.name
    ? user.name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase()
    : "TC";

  const totalSaved = tontines.reduce((acc, t) => acc + (t.amount * Math.floor((t.progress ?? 0) / 20)), 0);
  const nextDue = tontines.find((t) => t.nextDue)?.nextDue ?? "—";

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Profile + actions */}
      <section className="grid lg:grid-cols-3 gap-5">
        <div className="tc-card p-7 lg:col-span-1 fade-up">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full grid place-items-center bg-primary text-primary-foreground font-display text-2xl">
              {initials}
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Membre</p>
              <h2 className="font-display text-2xl leading-tight">{user?.name ?? "Invité"}</h2>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Wallet</p>
            <p className="font-mono text-sm text-foreground mt-1">{user?.wallet ?? "0x…"}</p>
            <span className="hero-badge mt-3">Polygon · Mainnet</span>
          </div>
        </div>

        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 fade-up-1">
          <Link to="/dashboard/create" className="tc-card interactive p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Plus className="h-5 w-5 text-primary" />
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-8">
              <h3 className="font-display text-3xl">Créer une tontine</h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Lancez votre cercle et invitez des membres.
              </p>
            </div>
          </Link>
          <Link to="/dashboard/join" className="tc-card interactive p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-primary" />
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-8">
              <h3 className="font-display text-3xl">Rejoindre</h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Parcourez les tontines ouvertes près de vous.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Overview stats */}
      <section className="grid sm:grid-cols-3 gap-4 fade-up-2">
        <Stat icon={<Users className="h-4 w-4" />} label="Tontines actives" value={String(tontines.length)} />
        <Stat icon={<Calendar className="h-4 w-4" />} label="Prochain paiement" value={nextDue} small />
        <Stat icon={<TrendingUp className="h-4 w-4" />} label="Total épargné" value={`${totalSaved} MATIC`} />
      </section>

      {/* Tontines list */}
      <section className="fade-up-3">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <span className="text-[0.7rem] uppercase tracking-widest text-primary font-semibold">Vos cercles</span>
            <h2 className="font-display text-3xl mt-1">Tontines en cours</h2>
          </div>
        </div>

        {tontines.length === 0 ? (
          <div className="tc-card p-10 text-center">
            <p className="text-muted-foreground">Aucune tontine pour l'instant.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {tontines.map((t) => (
              <Link
                key={t.id}
                to="/dashboard/tontine/$tontineId"
                params={{ tontineId: t.id }}
                className="tc-card interactive p-6 block"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[0.7rem] uppercase tracking-widest text-primary">
                      {t.role === "creator" ? "Créatrice" : "Membre"} · {t.cycle === "weekly" ? "Hebdo" : "Mensuel"}
                    </span>
                    <h3 className="font-display text-2xl mt-1">{t.name}</h3>
                  </div>
                  <Wallet className="h-5 w-5 text-primary shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{t.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t.members.length}/{t.capacity} membres
                  </span>
                  <span className="font-display text-xl text-primary">{t.amount} MATIC</span>
                </div>
                <div className="mt-3 h-1 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${t.progress ?? 0}%` }} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ icon, label, value, small }: { icon: React.ReactNode; label: string; value: string; small?: boolean }) {
  return (
    <div className="tc-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-[0.7rem] uppercase tracking-widest">{label}</span>
      </div>
      <p className={small ? "font-display text-2xl text-foreground mt-3" : "stat-num mt-3"}>{value}</p>
    </div>
  );
}
