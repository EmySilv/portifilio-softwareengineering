const db = require('../db');

const Tarefa = {
  listar: (callback) => {
    const sql = `SELECT t.*
                 FROM tarefas t
                 `;
    db.query(sql, callback);
  },

  criar: (tarefa, callback) => {
    const sql = 'INSERT INTO tarefas (id, titulo, descricao, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [tarefa.id, tarefa.titulo, tarefa.descricao, tarefa.status], callback);
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
