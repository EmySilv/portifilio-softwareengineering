const db = require('../database/db');

exports.listAll = (req, res) => {
  const sql = `SELECT t.*, u.username AS criado_por_nome
               FROM tarefas t
               JOIN usuario u ON u.id = t.criado_por`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { id, titulo, descricao, status, criado_por } = req.body;
  const sql = 'INSERT INTO tarefas (id, titulo, descricao, status, criado_por) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [id, titulo, descricao, status, criado_por], (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(201).json({ message: 'Tarefa criada com sucesso!' });
  });
};

exports.update = (req, res) => {
  const { titulo, descricao, status } = req.body;
  const id = req.params.id;
  const sql = 'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?';
  db.query(sql, [titulo, descricao, status, id], (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ message: 'Tarefa atualizada com sucesso!' });
  });
};

exports.remove = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM tarefas WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ message: 'Tarefa removida com sucesso!' });
  });
};
