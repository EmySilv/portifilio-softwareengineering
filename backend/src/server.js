const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const tarefaRoutes = require('./routes/tarefaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/tarefas', tarefaRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API de Tarefas rodando...');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
