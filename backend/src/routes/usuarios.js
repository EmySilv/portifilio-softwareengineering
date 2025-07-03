const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/', controller.listAll);

module.exports = router;
