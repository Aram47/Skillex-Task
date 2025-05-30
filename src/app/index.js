import express from 'express';
import server from './server/index.js';
import initConfigs from './config/init.config.js';

export default express();

initConfigs().then(server);