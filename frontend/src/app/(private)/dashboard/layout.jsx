"use client";

import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}