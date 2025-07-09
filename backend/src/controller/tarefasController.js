const tarefaService = require('../services/tarefaService');

const listar = async (req, res) => {
  try {
    const tarefas = await tarefaService.listarTodas();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar tarefas', error: error.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const tarefa = await tarefaService.buscarTarefaPorId(id);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefa', error: error.message });
  }
};

const criar = async (req, res) => {
  console.log('Corpo recebido no backend:', req.body);
  try {
    const novaTarefa = await tarefaService.criarTarefa(req.body);
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const tarefaAtualizada = await tarefaService.atualizarTarefa(id, req.body);
    if (!tarefaAtualizada) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(tarefaAtualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletar = async (req, res) => {
  try {
    const id = req.params.id;
    const sucesso = await tarefaService.deletarTarefa(id);
    if (!sucesso) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message });
  }
};

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};
