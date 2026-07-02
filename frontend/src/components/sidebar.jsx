"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
} from "lucide-react";

export function Sidebar() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 flex-col border-r bg-background">
      
      <div className="border-b p-6">
        <h1 className="text-xl font-bold bg-linear-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          + Saúde
        </h1>

        <p className="text-sm text-muted-foreground">
          Painel de Monitoramento
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/pacientes">
            <Users className="mr-2 h-4 w-4" />
            Pacientes
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/relatorios">
            <FileText className="mr-2 h-4 w-4" />
            Relatórios
          </Link>
        </Button>

      </nav>

      <Separator />

      <div className="p-4">
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>

    </aside>
  );
}