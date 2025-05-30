import mysql from 'mysql2/promise';
import { ENV_VAR } from '../../constants/env.var.js';

let connection = null;

export default async function connectDB() {
	try {
		connection = await mysql.createConnection({
			host: ENV_VAR.DB_HOST,
			port: ENV_VAR.DB_PORT,
			user: ENV_VAR.DB_USER,
			password: ENV_VAR.DB_PASSWORD,
			database: ENV_VAR.DB_NAME,
		})
	} catch (err) {
		console.log('MySql connection error ', err);
		exit(1);
	}
}

export function getConnection() {
  if (!connection) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return connection;
}

