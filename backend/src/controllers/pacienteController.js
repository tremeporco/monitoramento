import { prisma } from "../lib/prisma.js";

// Listar todos os pacientes
export async function listarPacientes(req, res) {
  try {
    const pacientes = await prisma.paciente.findMany();

    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar pacientes.",
      error: error.message,
    });
  }
}

// Buscar paciente por ID
export async function buscarPaciente(req, res) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID inválido.",
      });
    }

    const paciente = await prisma.paciente.findUnique({
      where: { id },
    });

    if (!paciente) {
      return res.status(404).json({
        message: "Paciente não encontrado.",
      });
    }

    res.json(paciente);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar paciente.",
      error: error.message,
    });
  }
}

// Criar paciente
export async function criarPaciente(req, res) {
  try {
    const { nome, idade } = req.body;

    if (!nome || idade === undefined) {
      return res.status(400).json({
        message: "Nome e idade são obrigatórios.",
      });
    }

    const paciente = await prisma.paciente.create({
      data: {
        nome,
        idade: Number(idade),
      },
    });

    res.status(201).json(paciente);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar paciente.",
      error: error.message,
    });
  }
}

// Atualizar paciente
export async function atualizarPaciente(req, res) {
  try {
    const id = Number(req.params.id);
    const { nome, idade } = req.body;

    const paciente = await prisma.paciente.update({
      where: { id },
      data: {
        nome,
        idade: Number(idade),
      },
    });

    res.json(paciente);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Paciente não encontrado.",
      });
    }

    res.status(500).json({
      message: "Erro ao atualizar paciente.",
      error: error.message,
    });
  }
}

// Excluir paciente
export async function excluirPaciente(req, res) {
  try {
    const id = Number(req.params.id);

    await prisma.paciente.delete({
      where: { id },
    });

    res.json({
      message: "Paciente removido com sucesso.",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Paciente não encontrado.",
      });
    }

    res.status(500).json({
      message: "Erro ao excluir paciente.",
      error: error.message,
    });
  }
}