import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-cyan-700 px-8 py-5 text-white shadow-md">
        <h1 className="text-2xl font-bold">+ Saúde</h1>

        <div className="flex gap-4">
          <Button asChild variant="secondary">
            <Link href="/login">Entrar</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-cyan-600 hover:text-white"
          >
            <Link href="/cadastro">Cadastro</Link>
          </Button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="mb-5 text-5xl font-bold text-slate-800">
          🩺 Monitoramento de Saúde
        </h1>

        <p className="max-w-2xl text-lg text-slate-600">
          Tecnologia e cuidado para acompanhar sua saúde de forma simples,
          segura e inteligente.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-8 bg-cyan-700 hover:bg-cyan-800"
        >
          <Link href="/cadastro">Começar Agora</Link>
        </Button>
      </main>

      {/* Cards */}
      <section className="grid gap-6 px-8 pb-20 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>💙 Acompanhamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Registro simples das informações de saúde.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📊 Monitoramento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Visualização inteligente dos dados do paciente.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🔒 Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Dados organizados e protegidos.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}