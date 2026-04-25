import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { toast } from "sonner";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/create")({
  head: () => ({ meta: [{ title: "Créer une tontine — TontineChain" }] }),
  component: CreatePage,
});

function CreatePage() {
  const { createTontine } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(8);
  const [amount, setAmount] = useState(50);
  const [cycle, setCycle] = useState<"weekly" | "monthly">("monthly");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    createTontine({ name: name || "Nouvelle tontine", capacity, amount, cycle });
    toast.success("Tontine créée ✦", {
      description: "Votre cercle est prêt à accueillir des membres.",
    });
    navigate({ to: "/dashboard" });
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

        <button type="submit" className="btn-pill-primary w-full justify-center">
          <Sparkles className="h-4 w-4" /> Créer la tontine
        </button>
      </form>
    </div>
  );
}
