import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="relative min-h-screen bg-background grain">
      <AppHeader />
      <main className="pt-24 pb-16 px-[5vw]">
        <Outlet />
      </main>
    </div>
  );
}
