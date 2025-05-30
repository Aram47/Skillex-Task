import { HTTP_STATUS } from '../../constants/http/statusCodes.js';
import { HTTP_MESSAGE } from '../../constants/http/messages.js';

export default function inputMiddleware(req, res, next) {
	const { items, length } = req.body;

	if (!Array.isArray(items) || typeof length !== 'number') {
		return res.status(HTTP_STATUS.ERROR.BAD_REQUEST).json({ 
			error: HTTP_MESSAGE.ERROR.BAD_REQUEST 
		});
	}
	next();
}