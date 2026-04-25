import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TontineChain — L'épargne collective réinventée" },
      {
        name: "description",
        content:
          "L'épargne collective béninoise sécurisée par smart contracts Polygon. Transparente, décentralisée, communautaire.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      {/* Filigree pattern */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, color-mix(in oklab, var(--color-or) 4%, transparent) 0, color-mix(in oklab, var(--color-or) 4%, transparent) 1.5px, transparent 1.5px, transparent 22px), repeating-linear-gradient(-45deg, color-mix(in oklab, var(--color-vert) 6%, transparent) 0, color-mix(in oklab, var(--color-vert) 6%, transparent) 1.5px, transparent 1.5px, transparent 22px)`,
        }}
      />

      {/* Decorative rings on right */}
      <div className="absolute right-[-10vw] top-1/2 -translate-y-1/2 w-[min(60vw,560px)] h-[min(60vw,560px)] z-10">
        <div className="deco-rings">
          <span />
          <span />
          <span />
        </div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full glow-pulse"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-or) 40%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-primary text-7xl">
          ◆
        </div>
      </div>

      {/* Top minimal nav */}
      <nav className="relative z-30 flex items-center justify-between px-[5vw] py-5">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full grid place-items-center bg-primary text-primary-foreground font-display">
            ◆
          </div>
          <span className="font-display text-2xl tracking-wide">
            Tontine<span className="text-primary">Chain</span>
          </span>
        </div>
        <Link to="/auth" search={{ mode: "login" }} className="text-xs font-medium text-muted-foreground hover:text-primary">
          Se connecter
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-20 px-[5vw] pt-16 pb-24 min-h-[88vh] flex items-center">
        <div className="max-w-2xl">
          <span className="hero-badge fade-up">Épargne collective Web3 · Bénin</span>
          <h1 className="font-display text-foreground mt-5 leading-[0.9] fade-up-1" style={{ fontSize: "clamp(3.2rem,8vw,6.5rem)" }}>
            La tontine,
            <span className="block text-primary" style={{ textShadow: "0 0 50px color-mix(in oklab, var(--color-or) 25%, transparent)" }}>
              réinventée.
            </span>
          </h1>

          <div className="fon-block mt-6 fade-up-2 max-w-lg">
            « L'argent qui circule entre les mains de la communauté ne dort jamais. »
          </div>

          <p className="mt-6 text-base text-muted-foreground max-w-lg fade-up-3">
            TontineChain transforme la tradition béninoise de l'épargne collective en un protocole transparent,
            sécurisé par smart contracts sur Polygon. Pas de chef, pas de fuite, pas de doute.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 fade-up-4">
            <Link to="/auth" search={{ mode: "signup" }} className="btn-pill-primary">
              Commencer <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/auth" search={{ mode: "login" }} className="btn-pill-secondary">
              Se connecter
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-10 pt-8 border-t border-border fade-up-5">
            {[
              { n: "2 400+", l: "Tontines actives" },
              { n: "184k", l: "MATIC sécurisés" },
              { n: "99.9%", l: "Transactions vérifiées" },
            ].map((s) => (
              <div key={s.l}>
                <span className="stat-num block">{s.n}</span>
                <span className="text-[0.7rem] uppercase tracking-widest text-muted-foreground mt-1 block">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="kita-divider absolute bottom-0 left-0 right-0" />
    </div>
  );
}
