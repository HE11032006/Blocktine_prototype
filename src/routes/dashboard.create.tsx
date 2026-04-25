import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { toast } from "sonner";
import { ArrowLeft, Sparkles, Copy, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/create")({
  head: () => ({ meta: [{ title: "Créer une tontine — blockTine" }] }),
  component: CreatePage,
});

function CreatePage() {
  const { createTontine, tontines } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(8);
  const [amount, setAmount] = useState(50);
  const [initialDeposit, setInitialDeposit] = useState(50);
  const [cycle, setCycle] = useState<"weekly" | "monthly">("monthly");
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const created = createdId ? tontines.find((t) => t.id === createdId) : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = createTontine({ name: name || "Nouvelle tontine", capacity, amount, cycle });
    toast.success("Tontine créée ✦", {
      description: `Dépôt initial de ${initialDeposit} MATIC enregistré.`,
    });
    setCreatedId(id);
  };

  const copy = async () => {
    if (!created) return;
    await navigator.clipboard.writeText(created.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Retour
      </Link>

      <div className="mb-8">
        <span className="text-[0.7rem] uppercase tracking-widest text-primary font-semibold">Nouveau cercle</span>
        <h1 className="font-display text-5xl mt-1">Créer une tontine</h1>
        <p className="fon-block mt-4 inline-block">« Un cercle se trace à plusieurs, jamais seul. »</p>
      </div>

      <form onSubmit={submit} className="tc-card p-7 space-y-6">
        <label className="block">
          <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Nom de la tontine</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Cercle des Cauris"
            className="mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
            required
          />
        </label>

        <div>
          <div className="flex justify-between items-baseline">
            <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Nombre de membres</span>
            <span className="font-display text-2xl text-primary">{capacity}</span>
          </div>
          <input
            type="range"
            min={3}
            max={20}
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="mt-2 w-full accent-primary"
          />
        </div>

        <label className="block">
          <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            Contribution par cycle (MATIC)
          </span>
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </label>

        <div>
          <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground block mb-2">
            Fréquence
          </span>
          <div className="grid grid-cols-2 gap-2">
            {(["weekly", "monthly"] as const).map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setCycle(c)}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                  cycle === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c === "weekly" ? "Hebdomadaire" : "Mensuel"}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            Montant à envoyer maintenant (dépôt initial · MATIC)
          </span>
          <input
            type="number"
            min={0}
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(Number(e.target.value))}
            className="mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <span className="text-[0.7rem] text-muted-foreground mt-1.5 block">
            ✦ Versé au smart contract pour activer le cercle.
          </span>
        </label>

        <button type="submit" className="btn-pill-primary w-full justify-center">
          <Sparkles className="h-4 w-4" /> Créer & verser {initialDeposit} MATIC
        </button>
      </form>

      {/* Success modal with generated code */}
      {created && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-background/85 backdrop-blur-sm px-4">
          <div className="tc-card max-w-md w-full p-7 fade-up text-center">
            <div className="inline-flex h-12 w-12 rounded-full grid place-items-center bg-primary text-primary-foreground font-display text-xl mb-4">
              ✦
            </div>
            <span className="hero-badge">Tontine activée</span>
            <h2 className="font-display text-3xl mt-3">{created.name}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Partagez ce code avec vos membres pour qu'ils rejoignent le cercle.
            </p>

            <div className="mt-5 p-4 rounded-xl bg-secondary border border-border">
              <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Code de la tontine</span>
              <div className="flex items-center justify-center gap-3 mt-1.5">
                <span className="font-display text-3xl text-primary tracking-wider">{created.code}</span>
                <button
                  onClick={copy}
                  className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                  aria-label="Copier le code"
                >
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-lg bg-secondary/60">
                <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Dépôt versé</p>
                <p className="font-display text-xl text-primary mt-0.5">{initialDeposit} MATIC</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/60">
                <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Membres</p>
                <p className="font-display text-xl text-primary mt-0.5">1 / {created.capacity}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link to="/dashboard" className="btn-pill-secondary flex-1 justify-center">
                Tableau de bord
              </Link>
              <Link
                to="/dashboard/tontine/$tontineId"
                params={{ tontineId: created.id }}
                className="btn-pill-primary flex-1 justify-center"
              >
                Voir la tontine <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
