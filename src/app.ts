import Koa, { Middleware } from 'koa';
import Router from 'koa-router';
import initRoutes from './routes';
import UserService from './services/userService';

class App {
    public app: Koa;
    public port: number;
    private readonly router: Router;

    constructor(port: number, middlewares: Middleware[]){
        this.app = new Koa();
        this.port = port;
        this.app.context.userService = new UserService();
        this.initMiddlewares(middlewares);
        this.router = new Router();
        initRoutes(this.router);
        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods());
    }

    private initMiddlewares(middlewares: Middleware[]) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;