//chama o express do outro arquivo para iniciar o servidor
const express = require('./src/app');

// configura a porta do servidor, se não houver uma variável de ambiente PORT, usa a porta 3000
const PORT = process.env.PORT || 3000;

// inicia o servidor na porta definida
express.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});