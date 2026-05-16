import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useApp } from "@/lib/app-context";
import type { Tontine } from "@/lib/mock-data";
import { toast } from "sonner";
import { ArrowLeft, Sparkles, Copy, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/create")({
  head: () => ({ meta: [{ title: "Créer une tontine — blockTine" }] }),
  component: CreatePage,
});

function CreatePage() {
  const { createTontine, deposit, tontines, isLoading } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(8);
  const [amount, setAmount] = useState(500);
  const [initialDeposit, setInitialDeposit] = useState(500);
  const [cycle, setCycle] = useState<"weekly" | "monthly">("monthly");
  const [visibility, setVisibility] = useState<"public" | "private">("private");
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [createdTontine, setCreatedTontine] = useState<Tontine | null>(null);
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);

  // Sync createdTontine with real data from context when it arrives
  useEffect(() => {
    if (createdId) {
      const realTontine = tontines.find(t => t.id === createdId);
      if (realTontine && realTontine.code !== "GÉNÉRATION...") {
        setCreatedTontine(realTontine);
      }
    }
  }, [tontines, createdId]);

  const created = createdId ? tontines.find((t) => t.id === createdId) : null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Veuillez saisir votre numéro pour le versement initial.");
      return;
    }

    const id = await createTontine({ 
      name: name || "Nouvelle tontine", 
      capacity: isUnlimitedCapacity ? 9999 : capacity, 
      isUnlimitedCapacity,
      amount, 
      cycle,
      visibility,
      startDate
    });

    if (id && id !== "error") {
      // Show modal immediately with a placeholder
      const tempTontine: Tontine = {
        id,
        code: "GÉNÉRATION...", // Will be updated
        name: name || "Nouvelle tontine",
        description: "Cercle sécurisé sur Polygon",
        amount,
        capacity: isUnlimitedCapacity ? 9999 : capacity,
        cycle,
        role: "creator",
        visibility,
        members: [],
        transactions: [],
        progress: 0,
        startDate: startDate,
        rules: "Paiement ponctuel obligatoire",
      };
      setCreatedTontine(tempTontine);
      setCreatedId(id);

      // Trigger deposit in background
      try {
        const success = await deposit(id, initialDeposit, phone);
        if (success) {
          toast.success("Tontine créée & activée ✦");
        }
      } catch (err) {
        console.error("Erreur dépôt:", err);
        toast.error("Tontine créée, mais le dépôt initial a échoué. Vous pourrez réessayer depuis le dashboard.");
      }
    }
  };

  const copy = async () => {
    if (!createdTontine) return;
    await navigator.clipboard.writeText(createdTontine.code);
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
          <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground block mb-2">Visibilité</span>
          <div className="grid grid-cols-2 gap-2">
            {(["public", "private"] as const).map((v) => (
              <button
                type="button"
                key={v}
                onClick={() => setVisibility(v)}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                  visibility === v
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {v === "public" ? "Publique (Visible dans Rejoindre)" : "Privée (Sur invitation)"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Nombre de membres max</span>
            {!isUnlimitedCapacity && <span className="font-display text-2xl text-primary">{capacity}</span>}
          </div>
          {visibility === "private" && (
            <label className="flex items-center gap-2 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isUnlimitedCapacity}
                onChange={(e) => setIsUnlimitedCapacity(e.target.checked)}
                className="accent-primary w-4 h-4"
              />
              <span className="text-sm text-muted-foreground">Nombre de membres illimité</span>
            </label>
          )}
          
          {!isUnlimitedCapacity && (
            <input
              type="range"
              min={2}
              max={20}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full accent-primary"
            />
          )}
        </div>

        <label className="block">
          <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">Date de début</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
            required
          />
          <span className="text-[0.7rem] text-muted-foreground mt-1.5 block">
            ✦ Date à laquelle les inscriptions se clôturent et le premier cycle démarre.
          </span>
        </label>

        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-[0.7rem] uppercase tracking-widest text-primary font-semibold block mb-2">Politique du Smart Contract</span>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
            <li>Les fonds sont sécurisés et bloqués sur la blockchain <strong>Polygon</strong>.</li>
            <li>En cas de retard, des avertissements sont émis automatiquement.</li>
            <li>Au-delà de 2 retards consécutifs, une pénalité de 5% est prélevée.</li>
            <li>Le non-paiement entraîne l'exclusion et la redistribution des fonds aux membres.</li>
          </ul>
        </div>

        <label className="block">
          <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            Contribution par cycle (FCFA)
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

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              Dépôt initial (FCFA)
            </span>
            <input
              type="number"
              min={0}
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(Number(e.target.value))}
              className="mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              Mon Numéro Mobile Money
            </span>
            <input
              type="tel"
              placeholder="90 00 00 00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5 w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
              required
            />
          </label>
        </div>
        <span className="text-[0.7rem] text-muted-foreground mt-1.5 block">
          ✦ Le créateur doit effectuer le premier versement pour activer le contrat sur Polygon.
        </span>

        <button type="submit" disabled={isLoading} className="btn-pill-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Transaction Blockchain...
          </span>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Créer & verser {initialDeposit.toLocaleString()} FCFA
            </>
          )}
        </button>
      </form>

      {/* Success modal with generated code */}
      {createdTontine && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-background/85 backdrop-blur-sm px-4">
          <div className="tc-card max-w-md w-full p-7 fade-up text-center">
            <div className="inline-flex h-12 w-12 rounded-full grid place-items-center bg-primary text-primary-foreground font-display text-xl mb-4">
              ✦
            </div>
            <span className="hero-badge">Tontine activée</span>
            <h2 className="font-display text-3xl mt-3">{createdTontine.name}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Partagez ce code avec vos membres pour qu'ils rejoignent le cercle.
            </p>

            <div className="mt-5 p-4 rounded-xl bg-secondary border border-border">
              <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Code de la tontine</span>
              <div className="flex items-center justify-center gap-3 mt-1.5">
                <span className="font-display text-3xl text-primary tracking-wider">{createdTontine.code}</span>
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
                <p className="font-display text-xl text-primary mt-0.5">{initialDeposit.toLocaleString()} FCFA</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/60">
                <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">Membres</p>
                <p className="font-display text-xl text-primary mt-0.5">1 / {createdTontine.capacity === 9999 ? "∞" : createdTontine.capacity}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link to="/dashboard" className="btn-pill-secondary flex-1 justify-center">
                Tableau de bord
              </Link>
              <Link
                to="/dashboard/tontine/$tontineId"
                params={{ tontineId: createdTontine.id }}
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
