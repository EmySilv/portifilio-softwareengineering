const tarefaRepository = require('../repositories/tarefaRepository');

const listarTodas = async () => {
  return await tarefaRepository.listarTarefas();
};

const buscarTarefaPorId = async (id) => {
  return await tarefaRepository.buscarPorId(id);
};

const criarTarefa = async (dados) => {
  if (!dados.titulo || dados.titulo.trim() === '') {
    console.error('Erro: título está vazio ou indefinido');
    throw new Error('Título é obrigatório');
  }
  const novaTarefa = {
    titulo: dados.titulo,
    descricao: dados.descricao || '',
    status: dados.status || 'pendente',
  };
  return await tarefaRepository.salvarTarefa(novaTarefa);
};

const atualizarTarefa = async (id, dados) => {
  return await tarefaRepository.atualizarTarefa(id, dados);
};

const deletarTarefa = async (id) => {
  return await tarefaRepository.deletarTarefa(id);
};

module.exports = {
  listarTodas,
  buscarTarefaPorId,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
};
