"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getPacientes, deletePaciente } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  async function carregarPacientes() {
    try {
      const dados = await getPacientes();
      setPacientes(dados);
    } catch (error) {
      console.error(error);
    }
  }

  async function excluirPaciente(id) {
    const confirmar = confirm("Deseja excluir este paciente?");

    if (!confirmar) return;

    await deletePaciente(id);
    carregarPacientes();
  }

  useEffect(() => {
    carregarPacientes();
  }, []);

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <Button asChild>
          <Link href="/dashboard/pacientes">
            Novo Paciente
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle>Total de Pacientes</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-5xl font-bold">
              {pacientes.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Último Monitoramento</CardTitle>
          </CardHeader>

          <CardContent>
            Em desenvolvimento
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relatórios</CardTitle>
          </CardHeader>

          <CardContent>
            <Link
              href="/dashboard/relatorios"
              className="text-blue-500 hover:underline"
            >
              Ver relatórios
            </Link>
          </CardContent>
        </Card>

      </div>

      <Card>

        <CardHeader>
          <CardTitle>Histórico de Pacientes</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <Input
            placeholder="Pesquisar paciente..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Sexo</TableHead>
                <TableHead className="text-right">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {pacientesFiltrados.map((paciente) => (

                <TableRow key={paciente.id}>

                  <TableCell>{paciente.nome}</TableCell>

                  <TableCell>{paciente.idade}</TableCell>

                  <TableCell>{paciente.sexo}</TableCell>

                  <TableCell className="text-right space-x-2">

                    <Button
                      size="sm"
                      variant="secondary"
                      asChild
                    >
                      <Link
                        href={`/dashboard/pacientes?id=${paciente.id}`}
                      >
                        Editar
                      </Link>
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => excluirPaciente(paciente.id)}
                    >
                      Excluir
                    </Button>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

    </div>
  );
}