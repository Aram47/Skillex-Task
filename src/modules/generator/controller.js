import { HTTP_STATUS } from '../../constants/http/statusCodes.js'
import { HTTP_MESSAGE } from '../../constants/http/messages.js';

export default class GeneratorController {
	constructor(generatorService) {
		this.generatorService = generatorService;
	}
	
	generator = async (req, res) => {
		try {
			const { items, length } = req.body;

			const result = await this.generatorService.generator({ items, length });

			res.status(HTTP_STATUS.SUCCESS.OK).json(result);
		} catch (err) {
			console.error(err);
			res.status(HTTP_STATUS.ERROR.INTERNAL_SERVER_ERROR).json({ 
				error: HTTP_MESSAGE.ERROR.INTERNAL_SERVER_ERROR, 
			});
		}
	}
}