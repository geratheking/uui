import App from './src/app';
import config from './config';
import bodyParser from "koa-bodyparser";
import errorHandler from './src/middlewares/errorHandler';

const app = new App(
    config.port,
    [
        bodyParser(),
        errorHandler,
    ]
);

app.listen();