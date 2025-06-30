const db = require('../database/db');

exports.register = (req, res) => {
  const { id, username, email, senha } = req.body;
  const sql = 'INSERT INTO usuario (id, username, email, senha) VALUES (?, ?, ?, ?)';
  db.query(sql, [id, username, email, senha], (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  });
};

exports.login = (req, res) => {
  const { username, senha } = req.body;
  const sql = 'SELECT * FROM usuario WHERE username = ? AND senha = ?';
  db.query(sql, [username, senha], (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length > 0) {
      res.json({ message: 'Login bem-sucedido!', user: results[0] });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas!' });
    }
  });
};

exports.listAll = (req, res) => {
  db.query('SELECT id, username, email FROM usuario', (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
};
