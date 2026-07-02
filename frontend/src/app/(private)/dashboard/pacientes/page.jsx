"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import {
  getPacientes,
  createPaciente,
  updatePaciente,
} from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PacientesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregar() {
      if (!id) return;

      const dados = await getPacientes();
      const paciente = dados.find((p) => p.id == id);

      if (paciente) {
        setNome(paciente.nome);
        setIdade(paciente.idade);
        setSexo(paciente.sexo);
      }
    }

    carregar();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const dados = { nome, idade, sexo };

    if (id) {
      await updatePaciente(id, dados);
    } else {
      await createPaciente(dados);
    }

    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>
            {id ? "Editar Paciente" : "Cadastrar Paciente"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <Input
              placeholder="Idade"
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />

            <Input
              placeholder="Sexo"
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              required
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}