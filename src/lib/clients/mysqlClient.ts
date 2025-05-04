import { config as loadEnv } from 'dotenv';

loadEnv(); // Load from .env when not using Vite

const {
  MYSQL_HOST,
  MYSQL_PORT = '3306',
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;

if (!MYSQL_HOST || !MYSQL_DATABASE || !MYSQL_USER || !MYSQL_PASSWORD) {
  throw new Error('Missing MySQL connection environment variables');
}

export async function getDB() {
  const mysql = await import('mysql2/promise');
  return mysql.createConnection({
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
  });
}
