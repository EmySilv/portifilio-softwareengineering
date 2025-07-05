const { v4: uuidv4 } = require('uuid');
const Tarefa = require('../models/tarefaModel');

// Simulação de base de dados em memória
let tarefasDB = [];

const listarTarefas = () => {
  return tarefasDB;
};

const buscarPorId = (id) => {
  return tarefasDB.find(t => t.id === id);
};

const salvarTarefa = (tarefa) => {
  tarefa.id = uuidv4();
  tarefa.dataCriacao = new Date();
  tarefasDB.push(tarefa);
  return tarefa;
};

const atualizarTarefa = (id, dadosAtualizados) => {
  const index = tarefasDB.findIndex(t => t.id === id);
  if (index === -1) return null;

  tarefasDB[index] = { ...tarefasDB[index], ...dadosAtualizados };
  return tarefasDB[index];
};

const deletarTarefa = (id) => {
  const index = tarefasDB.findIndex(t => t.id === id);
  if (index === -1) return false;

  tarefasDB.splice(index, 1);
  return true;
};

module.exports = {
  listarTarefas,
  buscarPorId,
  salvarTarefa,
  atualizarTarefa,
  deletarTarefa,
};
