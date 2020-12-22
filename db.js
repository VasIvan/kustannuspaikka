const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'DBVarna93',
  host: 'localhost',
  database: 'ensacondb',
  port: 5432,
});

module.exports = pool;
