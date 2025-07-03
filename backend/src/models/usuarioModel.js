const db = require('../db');

const Usuario = {
  registrar: (usuario, callback) => {
    const sql = 'INSERT INTO usuario (id, username, email, senha) VALUES (?, ?, ?, ?)';
    db.query(sql, [usuario.id, usuario.username, usuario.email, usuario.senha], callback);
  },

  autenticar: (username, senha, callback) => {
    const sql = 'SELECT * FROM usuario WHERE username = ? AND senha = ?';
    db.query(sql, [username, senha], callback);
  },

  listar: (callback) => {
    db.query('SELECT id, username, email FROM usuario', callback);
  }
};

module.exports = Usuario;
