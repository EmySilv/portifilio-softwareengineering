const mysql = require('mysql2/promise');

// Cria um pool de conexões com suporte a async/await
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_gestaoecontrole'
});

module.exports = db;
