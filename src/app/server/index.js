import app from '../index.js';
import { ENV_VAR } from '../../constants/env.var.js';

export default function start() {
	return app.listen(ENV_VAR.APP_PORT, ENV_VAR.HOST, () => {
		console.log(`Server listen on PORT: ${ENV_VAR.APP_PORT}`);
	});
}