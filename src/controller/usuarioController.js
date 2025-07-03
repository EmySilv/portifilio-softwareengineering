const Usuario = require('../models/usuarioModel');

exports.register = (req, res) => {
  Usuario.registrar(req.body, (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  });
};

exports.login = (req, res) => {
  const { username, senha } = req.body;
  Usuario.autenticar(username, senha, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length > 0) {
      res.json({ message: 'Login bem-sucedido!', user: results[0] });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas!' });
    }
  });
};

exports.listAll = (req, res) => {
  Usuario.listar((err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
};
