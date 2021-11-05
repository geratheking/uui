import App from './src/app';
import config from './config';
import Router from 'koa-router';
import bodyParser from "koa-bodyparser";
import errorHandler from './src/middlewares/errorHandler'

const app = new App(
    config.port,
    [
        bodyParser(),
        errorHandler,
    ],
    new Router(),
);

app.listen();