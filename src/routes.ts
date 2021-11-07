import Router from 'koa-router';
import isAdmin from "./middlewares/isAdmin";
import usersController from './controllers/usersController'

const initRoutes = (router: Router): void => {
    router.get('/users', usersController.getItems);
    router.post('/users', isAdmin, usersController.createItem);
    router.delete('/users/:itemId', isAdmin, usersController.deleteItem);
}

export default initRoutes;