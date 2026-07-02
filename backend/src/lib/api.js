const API = "http://localhost:3001";

export async function getPacientes() {
  const response = await fetch(`${API}/pacientes`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar pacientes");
  }

  return response.json();
}

export async function createPaciente(data) {
  const response = await fetch(`${API}/pacientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function updatePaciente(id, data) {
  const response = await fetch(`${API}/pacientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function deletePaciente(id) {
  const response = await fetch(`${API}/pacientes/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return response.json();
}