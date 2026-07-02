"use client";

import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="flex items-center justify-between border-b bg-background px-6 py-4">
        <h1 className="text-xl font-bold bg-linear-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Dashboard
        </h1>

        <button className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:opacity-90">
          Sair
        </button>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}