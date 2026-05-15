import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/lib/app-context";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Paramètres — blockTine" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggleTheme, settings, setSettings, user } = useApp();

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Retour
      </Link>

      <div className="mb-8">
        <span className="text-[0.7rem] uppercase tracking-widest text-primary font-semibold">Préférences</span>
        <h1 className="font-display text-5xl mt-1">Paramètres</h1>
      </div>

      <div className="space-y-5">
        {/* Theme */}
        <div className="tc-card p-6">
          <h2 className="font-display text-2xl mb-4">Apparence</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-primary" />}
              <div>
                <p className="text-sm font-medium">Thème {theme === "dark" ? "sombre" : "clair"}</p>
                <p className="text-xs text-muted-foreground">Bascule entre nuit cinématique et lumière douce.</p>
              </div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
        </div>

        {/* Notifications */}
        <div className="tc-card p-6">
          <h2 className="font-display text-2xl mb-4">Notifications</h2>
          <div className="space-y-4">
            <Toggle
              label="Paiements à venir"
              desc="Soyez prévenu·e avant chaque échéance."
              checked={settings.notifPayment}
              onChange={(v) => setSettings({ notifPayment: v })}
            />
            <Toggle
              label="Nouveau membre"
              desc="Alerte lorsqu'un membre rejoint l'un de vos cercles."
              checked={settings.notifNewMember}
              onChange={(v) => setSettings({ notifNewMember: v })}
            />
            <Toggle
              label="Fin de cycle"
              desc="Rappel quand un cycle se termine."
              checked={settings.notifCycleEnd}
              onChange={(v) => setSettings({ notifCycleEnd: v })}
            />
          </div>
        </div>

        {/* Account */}
        <div className="tc-card p-6">
          <h2 className="font-display text-2xl mb-4">Compte</h2>
          <dl className="space-y-3 text-sm">
            <Row label="Nom" value={user?.name ?? "—"} />
            <Row label="Email" value={user?.email ?? "—"} />
            <Row label="Wallet" value={user?.wallet ?? "—"} mono />
            <Row label="Réseau" value="Polygon Mainnet" />
          </dl>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <dt className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className={mono ? "font-mono text-xs" : "text-foreground"}>{value}</dd>
    </div>
  );
}
