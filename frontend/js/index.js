const apiBaseUrl = 'http://localhost:3000/api/tarefas';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const descricaoInput = document.getElementById('descricao-input');
const statusInput = document.getElementById('status');
const searchInput = document.getElementById('searchInput');

const taskTodayDiv = document.querySelector('.taskToday');
const taskCompletedDiv = document.querySelector('.taskCompleted');
const taskOverdueDiv = document.querySelector('.taskOverdue');

let tarefas = [];
let editTaskId = null;

// Carrega todas as tarefas do backend
async function loadTarefas() {
  try {
    const res = await fetch(apiBaseUrl);
    tarefas = await res.json();
    renderTarefas(tarefas);
  } catch (error) {
    alert('Erro ao carregar tarefas: ' + error);
  }
}

// Renderiza as tarefas nos respectivos containers
function renderTarefas(tarefas) {
  // Limpa os containers (tirar o título p)
  taskTodayDiv.innerHTML = '<p class="task-title">Tarefas do Dia</p>';
  taskCompletedDiv.innerHTML = '<p class="task-title">Tarefas Concluídas</p>';
  taskOverdueDiv.innerHTML = '<p class="task-title">Tarefas Atrasadas</p>';

  tarefas.forEach((tarefa) => {
    const tarefaEl = criarElementoTarefa(tarefa);
    
    // Categoriza e adiciona
    if (
      tarefa.status === 'pendente' ||
      tarefa.status === 'não-iniciado' ||
      tarefa.status === 'em-andamento'
    ) {
      taskTodayDiv.appendChild(tarefaEl);
    } else if (tarefa.status === 'concluida') {
      taskCompletedDiv.appendChild(tarefaEl);
    } else if (tarefa.status === 'atrasada') {
      taskOverdueDiv.appendChild(tarefaEl);
    }
  });
}

// Cria o elemento DOM da tarefa com botões de ação
function criarElementoTarefa(tarefa) {
  const div = document.createElement('div');
  div.className = 'task-card';
  div.style.border = '1px solid #ccc';
  div.style.margin = '5px';
  div.style.padding = '10px';
  div.style.borderRadius = '5px';

  div.innerHTML = `
    <h4>${tarefa.titulo}</h4>
    <p>${tarefa.descricao}</p>
    <p><strong>Status:</strong> ${tarefa.status}</p>
    <button class="edit-btn" data-id="${tarefa.id}">Editar</button>
    <button class="delete-btn" data-id="${tarefa.id}">Excluir</button>
  `;

  // Eventos dos botões
  div.querySelector('.edit-btn').addEventListener('click', () => abrirEdicao(tarefa));
  div.querySelector('.delete-btn').addEventListener('click', () => deletarTarefa(tarefa.id));

  return div;
}

// Função para abrir a tarefa no formulário para edição
function abrirEdicao(tarefa) {
  taskInput.value = tarefa.titulo;
  descricaoInput.value = tarefa.descricao;
  statusInput.value = tarefa.status;
  editTaskId = tarefa.id;
  taskForm.querySelector('button[type="submit"]').textContent = 'Atualizar Tarefa';
}

// Adiciona ou atualiza a tarefa no backend
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const tarefaData = {
    titulo: taskInput.value.trim(),
    descricao: descricaoInput.value.trim(),
    status: statusInput.value,
  };

  try {
    if (editTaskId) {
      // Atualizar
      const res = await fetch(`${apiBaseUrl}/${editTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefaData),
      });

      if (!res.ok) throw new Error('Erro ao atualizar tarefa');
      alert('Tarefa atualizada com sucesso');
    } else {
      // Criar
      const res = await fetch(apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefaData),
      });

      if (!res.ok) throw new Error('Erro ao criar tarefa');
      alert('Tarefa criada com sucesso');
    }

    // Resetar formulário e variáveis
    taskForm.reset();
    editTaskId = null;
    taskForm.querySelector('button[type="submit"]').textContent = 'Adicionar Tarefa';

    // Recarregar lista
    loadTarefas();
  } catch (error) {
    alert(error.message);
  }
});

// Deleta a tarefa pelo id
async function deletarTarefa(id) {
  if (!confirm('Confirma exclusão desta tarefa?')) return;

  try {
    const res = await fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' });
    if (res.status === 204) {
      alert('Tarefa excluída com sucesso');
      loadTarefas();
    } else {
      throw new Error('Erro ao excluir tarefa');
    }
  } catch (error) {
    alert(error.message);
  }
}

// Busca localmente as tarefas pelo título e renderiza
function searchTarefa() {
  const termo = searchInput.value.trim().toLowerCase();
  if (termo === '') {
    renderTarefas(tarefas);
  } else {
    const filtradas = tarefas.filter(t =>
      t.titulo.toLowerCase().includes(termo)
    );
    renderTarefas(filtradas);
  }
}

// Inicializa carregando as tarefas
loadTarefas();
