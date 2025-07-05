const tarefaRepository = require('../repositories/tarefaRepository');

const listarTodas = () => {
  return tarefaRepository.listarTarefas();
};

const buscarTarefaPorId = (id) => {
  return tarefaRepository.buscarPorId(id);
};

const criarTarefa = (dados) => {
  // Validações básicas
  if (!dados.titulo || dados.titulo.trim() === '') {
    throw new Error('Título é obrigatório');
  }
  const novaTarefa = {
    titulo: dados.titulo,
    descricao: dados.descricao || '',
    status: dados.status || 'pendente',
  };
  return tarefaRepository.salvarTarefa(novaTarefa);
};

const atualizarTarefa = (id, dados) => {
  return tarefaRepository.atualizarTarefa(id, dados);
};

const deletarTarefa = (id) => {
  return tarefaRepository.deletarTarefa(id);
};

module.exports = {
  listarTodas,
  buscarTarefaPorId,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
};
