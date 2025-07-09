const db = require('../database/db');

const listarTarefas = async () => {
  const [rows] = await db.query('SELECT * FROM tarefas');
  return rows;
};

const buscarPorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM tarefas WHERE id = ?', [id]);
  return rows[0];
};

const salvarTarefa = async (tarefa) => {
  const sql = 'INSERT INTO tarefas (titulo, descricao, status, data) VALUES (?, ?, ?, NOW())';
  const [result] = await db.query(sql, [tarefa.titulo, tarefa.descricao, tarefa.status]);
  return { id: result.insertId, ...tarefa, data: new Date() };
};

const atualizarTarefa = async (id, dados) => {
  const sql = 'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?';
  const [result] = await db.query(sql, [dados.titulo, dados.descricao, dados.status, id]);
  return result.affectedRows > 0 ? { id, ...dados } : null;
};

const deletarTarefa = async (id) => {
  const [result] = await db.query('DELETE FROM tarefas WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  listarTarefas,
  buscarPorId,
  salvarTarefa,
  atualizarTarefa,
  deletarTarefa,
};