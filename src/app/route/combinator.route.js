import { Router } from "express";
import inputMiddleware from '../middleware/input.middleware.js';
import GeneratorController from "../../modules/generator/controller.js";
import GeneratorService from "../../modules/generator/service.js";

export default class GeneratorRouter {
	constructor() {
		const generatorService = new GeneratorService();
		const generatorController = new GeneratorController(generatorService);
		this.router = Router();
		this.router.post('/generate', inputMiddleware, generatorController.generator);
	}

	get getRouter() {
		return this.router;
	}
}