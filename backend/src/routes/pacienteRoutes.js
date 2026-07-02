import { Router } from "express";

import {
  listarPacientes,
  buscarPaciente,
  criarPaciente,
  atualizarPaciente,
  excluirPaciente,
} from "../controllers/pacienteController.js";

const router = Router();

router.get("/", listarPacientes);
router.get("/:id", buscarPaciente);
router.post("/", criarPaciente);
router.put("/:id", atualizarPaciente);
router.delete("/:id", excluirPaciente);

export default router;