import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

import pacienteRoutes from "./routes/pacienteRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 🧠 CORS forte (resolve 90% dos fetch failed)
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
}));

app.use(express.json());

// 🔐 AUTH
app.use("/api/auth", toNodeHandler(auth));

// 📦 ROTAS
app.use("/pacientes", pacienteRoutes);

// 🧪 TESTE
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// 🩺 TESTE AUTH PROTEGIDO (opcional mas recomendado)
app.get("/api/me", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});