import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-context";
import { toast } from "sonner";
import { ArrowLeft, Users, X } from "lucide-react";
import type { Tontine } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/join")({
  head: () => ({ meta: [{ title: "Rejoindre une tontine — blockTine" }] }),
  component: JoinPage,
});

function JoinPage() {
  const { available, joinTontine, joinByCode, isLoading } = useApp();
  const [selected, setSelected] = useState<Tontine | null>(null);
  const navigate = useNavigate();

  const confirm = async () => {
    if (!selected) return;
    await joinTontine(selected.id);
    toast.success("Vous avez rejoint la tontine ✦", {
      description: `Bienvenue dans ${selected.name}.`,
    });
    setSelected(null);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Retour
      </Link>

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[0.7rem] uppercase tracking-widest text-primary font-semibold">Cercles ouverts</span>
          <h1 className="font-display text-5xl mt-1">Rejoindre une tontine</h1>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Découvrez les cercles disponibles ou saisissez un code d'invitation.
          </p>
        </div>

        <div className="tc-card p-4 flex gap-3 items-end max-w-md w-full">
          <label className="flex-1">
            <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground block mb-1">Code d'invitation</span>
            <input 
              id="join-code"
              placeholder="TC-ABCD-1234"
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <button 
            onClick={async () => {
              const code = (document.getElementById("join-code") as HTMLInputElement).value;
              if (!code) return toast.error("Veuillez saisir un code");
              const res = await joinByCode(code);
              if (res === "success") {
                toast.success("Cercle rejoint !");
                navigate({ to: "/dashboard" });
              } else if (res === "already") {
                toast.error("Vous faites déjà partie de ce cercle");
              } else {
                toast.error("Code invalide ou tontine introuvable");
              }
            }}
            disabled={isLoading}
            className="btn-pill-primary px-6 h-10"
          >
            {isLoading ? <span className="h-4 w-4 border-2 border-noir border-t-transparent rounded-full animate-spin" /> : "Rejoindre"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {available.map((t) => (
          <div key={t.id} className="tc-card interactive p-6 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[0.7rem] uppercase tracking-widest text-primary">
                  {t.cycle === "weekly" ? "Hebdomadaire" : "Mensuel"}
                </span>
                <h3 className="font-display text-2xl mt-1">{t.name}</h3>
              </div>
              <Users className="h-5 w-5 text-primary shrink-0" />
            </div>
            <p className="text-sm text-muted-foreground mt-2 flex-1">{t.description}</p>

            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {t.members.length}/{t.capacity} membres
              </span>
              <span className="font-display text-xl text-primary">{t.amount} MATIC</span>
            </div>
            <div className="mt-3 h-1 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(t.members.length / t.capacity) * 100}%` }}
              />
            </div>

            <button onClick={() => setSelected(t)} className="btn-pill-primary mt-5 justify-center">
              Rejoindre
            </button>
          </div>
        ))}
        {available.length === 0 && (
          <div className="tc-card p-10 text-center md:col-span-2 lg:col-span-3">
            <p className="text-muted-foreground">Aucune tontine ouverte pour l'instant.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-background/80 backdrop-blur-sm px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="tc-card max-w-md w-full p-7 relative fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="hero-badge">Confirmation</span>
            <h2 className="font-display text-3xl mt-3">{selected.name}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Vous êtes sur le point de rejoindre ce cercle. Engagement : {selected.amount} MATIC{" "}
              {selected.cycle === "weekly" ? "par semaine" : "par mois"}.
            </p>
            <div className="mt-5 p-4 rounded-lg bg-secondary border border-border">
              <p className="text-xs text-muted-foreground">
                ✦ Cette action sera enregistrée sur Polygon. Les fonds sont sécurisés par smart contract.
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button disabled={isLoading} onClick={() => setSelected(null)} className="btn-pill-secondary flex-1 justify-center disabled:opacity-50">
                Annuler
              </button>
              <button disabled={isLoading} onClick={confirm} className="btn-pill-primary flex-1 justify-center disabled:opacity-50">
                {isLoading ? (
                  <span className="h-4 w-4 border-2 border-noir border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Confirmer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
