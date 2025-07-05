const tarefaService = require('../services/tarefaService');

const listar = (req, res) => {
  const tarefas = tarefaService.listarTodas();
  res.json(tarefas);
};

const buscarPorId = (req, res) => {
  const id = req.params.id;
  const tarefa = tarefaService.buscarTarefaPorId(id);
  if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
  res.json(tarefa);
};

const criar = (req, res) => {
  try {
    const novaTarefa = tarefaService.criarTarefa(req.body);
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const atualizar = (req, res) => {
  const id = req.params.id;
  const tarefaAtualizada = tarefaService.atualizarTarefa(id, req.body);
  if (!tarefaAtualizada) return res.status(404).json({ message: 'Tarefa não encontrada' });
  res.json(tarefaAtualizada);
};

const deletar = (req, res) => {
  const id = req.params.id;
  const sucesso = tarefaService.deletarTarefa(id);
  if (!sucesso) return res.status(404).json({ message: 'Tarefa não encontrada' });
  res.status(204).send();
};

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};
