const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.User,
  host: process.env.Host,
  database: process.env.DB,
  password: process.env.Pass,
  port: 5432
});

module.exports = { pool };
