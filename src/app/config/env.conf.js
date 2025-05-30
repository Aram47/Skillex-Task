import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

export default function configEnv() {
	const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
	
	config({
		path: join(__dirname, '..', '..', `.env.${process.env.NODE_ENV}`), 
	});
}