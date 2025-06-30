const express = require('express');
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const tarefasRoutes = require('./routes/tarefas');

app.use(express.json());
app.use('/usuarios', usuariosRoutes);
app.use('/tarefas', tarefasRoutes);

module.exports = app;
