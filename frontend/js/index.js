const API_URL = "http://localhost:3000/tarefas"; // Altere para o endereço do backend se necessário

// DOM Elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Função para carregar todas as tarefas do backend
async function loadTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    taskList.innerHTML = ""; // Limpa a lista atual

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="taskCard">
          <p><strong>Título:</strong> ${task.titulo}</p>
          <p><strong>Data:</strong> ${new Date(task.data).toLocaleDateString()}</p>
          <p><strong>Descrição:</strong> ${task.descricao}</p>
          <p><strong>Status:</strong> ${task.status}</p>
          <div class="buttonsTask">
            <button onclick="deleteTask(${task.id})">Excluir</button>
            <button onclick="editTask(${task.id}, '${task.titulo}', '${task.descricao}', '${task.status}')">Alterar</button>
          </div>
        </div>
      `;
      taskList.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao carregar tarefas:", err);
  }
}

// Função para criar nova tarefa
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = taskInput.value.trim();
  if (!titulo) return;

  const novaTarefa = {
    id: Date.now(), // ID único gerado no front
    titulo,
    descricao: "Tarefa criada pelo formulário", // você pode criar um campo para isso
    status: "pendente",
    criado_por: "test001" // ID do usuário criador (substitua por valor real após login)
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTarefa)
    });

    if (response.ok) {
      taskInput.value = "";
      loadTasks();
    } else {
      const error = await response.json();
      alert("Erro ao criar tarefa: " + error.message);
    }
  } catch (err) {
    console.error("Erro na criação:", err);
  }
});

// Função para excluir uma tarefa
async function deleteTask(id) {
  if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      loadTasks();
    } else {
      alert("Erro ao excluir tarefa.");
    }
  } catch (err) {
    console.error("Erro ao excluir:", err);
  }
}

// Função para editar uma tarefa
async function editTask(id, titulo, descricao, statusAtual) {
  const novoTitulo = prompt("Novo título:", titulo);
  const novaDescricao = prompt("Nova descrição:", descricao);
  const novoStatus = prompt("Novo status (pendente, concluída, atrasada):", statusAtual);

  if (!novoTitulo || !novaDescricao || !novoStatus) return;

  const tarefaAtualizada = {
    titulo: novoTitulo,
    descricao: novaDescricao,
    status: novoStatus
  };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarefaAtualizada)
    });

    if (response.ok) {
      loadTasks();
    } else {
      alert("Erro ao atualizar tarefa.");
    }
  } catch (err) {
    console.error("Erro ao atualizar:", err);
  }
}

// Inicializa
loadTasks();
