const express = require('express');
const cors = require('cors');
const app = express();

// Permitir CORS apenas da origem específica
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  allowedHeaders: '*'
}));

app.use(express.json());

// Suas rotas
const tarefasRoutes = require('./routes/tarefas');
app.use('/api/tarefas', tarefasRoutes);

module.exports = app;