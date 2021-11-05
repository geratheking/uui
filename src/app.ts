import Koa, { Middleware } from 'koa';
import Router from 'koa-router';
import initRoutes from './routes';
import DataBase from './db';

class App {
    public app: Koa;
    public port: number;

    constructor(port: number, middlewares: Middleware[], router: Router){
        this.app = new Koa();
        this.port = port;
        this.app.context.db = new DataBase();
        this.initMiddlewares(middlewares);

        initRoutes(router)
        this.app.use(router.routes())
        this.app.use(router.allowedMethods());
    }

    private initMiddlewares(middlewares: Middleware[]) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware)
        })
    }

    public listen() {
        this.app.on('error', (err: Error) => {
            console.log('Error ', err);
        }).listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;