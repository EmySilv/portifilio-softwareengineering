const express = require('express');
const router = express.Router();
const tarefasController = require('../controller/tarefasController');

router.get('/', tarefasController.listar);         // Listar todas
router.get('/:id', tarefasController.buscarPorId); // Buscar por id
router.post('/', tarefasController.criar);         // Criar
router.put('/:id', tarefasController.atualizar);   // Atualizar
router.delete('/:id', tarefasController.deletar);  // Deletar

module.exports = router;
