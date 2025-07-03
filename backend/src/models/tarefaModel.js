const db = require('../db');

const Tarefa = {
  listar: (callback) => {
    const sql = `SELECT t.*, u.username AS criado_por_nome
                 FROM tarefas t
                 JOIN usuario u ON u.id = t.criado_por`;
    db.query(sql, callback);
  },

  criar: (tarefa, callback) => {
    const sql = 'INSERT INTO tarefas (id, titulo, descricao, status, criado_por) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [tarefa.id, tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.criado_por], callback);
  },

  atualizar: (id, dados, callback) => {
    const sql = 'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?';
    db.query(sql, [dados.titulo, dados.descricao, dados.status, id], callback);
  },

  remover: (id, callback) => {
    const sql = 'DELETE FROM tarefas WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Tarefa;
