const Tarefa = require('../models/tarefaModel');

// Listar todas as tarefas
exports.listAll = (req, res) => {
  Tarefa.listar((err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
};

// Criar uma nova tarefa
exports.create = (req, res) => {
  const { id, titulo, descricao, status, criado_por } = req.body;

  // Validação simples
  if (!id || !titulo || !descricao || !status || !criado_por) {
    return res.status(400).json({ message: 'Dados incompletos para criar a tarefa.' });
  }

  const novaTarefa = { id, titulo, descricao, status, criado_por };

  Tarefa.criar(novaTarefa, (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(201).json({ message: 'Tarefa criada com sucesso!' });
  });
};

// Atualizar uma tarefa existente
exports.update = (req, res) => {
  const id = req.params.id;
  const { titulo, descricao, status } = req.body;

  if (!titulo || !descricao || !status) {
    return res.status(400).json({ message: 'Dados incompletos para atualizar a tarefa.' });
  }

  const dadosAtualizados = { titulo, descricao, status };

  Tarefa.atualizar(id, dadosAtualizados, (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ message: 'Tarefa atualizada com sucesso!' });
  });
};

// Remover uma tarefa
exports.remove = (req, res) => {
  const id = req.params.id;

  Tarefa.remover(id, (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ message: 'Tarefa removida com sucesso!' });
  });
};

// Buscar tarefas por termo
exports.search = (req, res) => {
  const termo = `%${req.query.termo || ''}%`;

  const sql = `
    SELECT t.*, u.username AS criado_por_nome
    FROM tarefas t
    JOIN usuario u ON u.id = t.criado_por
    WHERE t.titulo LIKE ? OR t.descricao LIKE ?
  `;

  db.query(sql, [termo, termo], (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
};
