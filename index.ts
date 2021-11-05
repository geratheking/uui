import App from './src/app';
import config from './config';
import bodyParser from "koa-bodyparser";
import errorHandler from './src/middlewares/errorHandler';
import isAdmin from "./src/middlewares/isAdmin";

const app = new App(
    config.port,
    [
        bodyParser(),
        errorHandler,
        isAdmin,
    ]
);

app.listen();