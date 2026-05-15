import { Link, useNavigate } from "@tanstack/react-router";
import { useApp } from "@/lib/app-context";
import { LogOut, Settings as SettingsIcon } from "lucide-react";

export function AppHeader() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-3.5 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-2.5 no-underline">
          <div className="h-9 w-9 rounded-full grid place-items-center bg-primary text-primary-foreground font-display text-lg">
            ◆
          </div>
          <span className="font-display text-2xl tracking-wide leading-none">
            block<span className="text-primary">Tine</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/settings"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <SettingsIcon className="h-3.5 w-3.5" /> Paramètres
          </Link>
          {user && (
            <div className="flex items-center gap-2.5 pl-3 border-l border-border">
              <div className="h-8 w-8 rounded-full grid place-items-center bg-primary text-primary-foreground text-xs font-semibold">
                {initials}
              </div>
              <span className="hidden md:inline text-xs text-foreground">{user.name}</span>
              <button
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                }}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Se déconnecter"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="kita-divider fixed top-[60px] left-0 right-0 z-40" />
    </>
  );
}
