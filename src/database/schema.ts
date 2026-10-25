import Db from './connection.js';

Db.exec(`
CREATE TABLE IF NOT EXISTS user (
  id STRING PRIMARY KEY
  )`);

Db.exec(`
CREATE TABLE IF NOT EXISTS guild (
  id STRING PRIMARY KEY,
  prefix STRING
  )`);