import express from 'express';
import cors from 'cors';
import GeneratorRoute from '../route/combinator.route.js';
import configEnv from "./env.conf.js";
import connectDB from "./db.conf.js";
import app from "../index.js";

export default async function initConfigs() {
	configEnv();
	await connectDB();
	
	app.use(express.json());
	app.use(cors());

	const generatorRoute = new GeneratorRoute();
	app.use('/', generatorRoute.getRouter);
}