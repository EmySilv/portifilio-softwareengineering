const API_URL = "http://localhost:3000/tarefas";

const taskContainer = document.querySelector(".taskToday");
const searchInput = document.getElementById("searchInput");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const descricaoInput = document.getElementById("descricao-input");

let allTasks = []; // cache local para busca

// Carrega todas as tarefas ao iniciar
async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allTasks = data;
    renderTasks(data);
  } catch (err) {
    console.error("Erro ao carregar tarefas:", err);
  }
}

// Renderiza as tarefas no DOM
function renderTasks(tasks) {
  // Limpa cards anteriores
  taskContainer.querySelectorAll(".taskCard").forEach(card => card.remove());

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.classList.add("taskCard");

    card.innerHTML = `
      <p><strong>Título:</strong> ${task.titulo}</p>
      <p><strong>Data:</strong> ${new Date(task.data).toLocaleDateString()}</p>
      <p><strong>Descrição:</strong> ${task.descricao}</p>
      <p><strong>Status:</strong> ${task.status}</p>
      <div class="buttonsTask">
        <button onclick="deleteTask(${task.id})">Excluir</button>
        <button onclick="editTask(${task.id}, '${escapeString(task.titulo)}', '${escapeString(task.descricao)}', '${task.status}')">Alterar</button>
      </div>
    `;

    taskContainer.appendChild(card);
  });
}

// Escapa aspas simples para não quebrar HTML inline
function escapeString(str) {
  return str.replace(/'/g, "\\'");
}

// Criação de nova tarefa
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = taskInput.value.trim();
  const descricao = descricaoInput.value.trim();
  if (!titulo || !descricao) return;

  const novaTarefa = {
    id: Date.now(),
    titulo,
    descricao,
    status: "pendente",
    criado_por: "u001" // ID fixo, pois sem login
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTarefa)
    });

    if (res.ok) {
      taskInput.value = "";
      descricaoInput.value = "";
      await loadTasks();
    }
  } catch (err) {
    console.error("Erro ao adicionar tarefa:", err);
  }
});

// Excluir tarefa
async function deleteTask(id) {
  if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      await loadTasks();
    }
  } catch (err) {
    console.error("Erro ao excluir tarefa:", err);
  }
}

// Editar tarefa
async function editTask(id, titulo, descricao, status) {
  const novoTitulo = prompt("Novo título:", titulo);
  const novaDescricao = prompt("Nova descrição:", descricao);
  const novoStatus = prompt("Novo status:", status);

  if (!novoTitulo || !novaDescricao || !novoStatus) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: novoTitulo,
        descricao: novaDescricao,
        status: novoStatus
      })
    });

    if (res.ok) {
      await loadTasks();
    }
  } catch (err) {
    console.error("Erro ao editar tarefa:", err);
  }
}

// Busca dinâmica
searchInput.addEventListener("input", async (e) => {
  const termo = e.target.value.toLowerCase();

  if (!termo) {
    renderTasks(allTasks); // mostra todas
    return;
  }

  try {
    const res = await fetch(`${API_URL}/search?termo=${encodeURIComponent(termo)}`);
    const filtradas = await res.json();
    renderTasks(filtradas);
  } catch (err) {
    console.error("Erro ao buscar tarefas:", err);
  }
});

// Carregamento inicial
loadTasks();