import Router from 'koa-router';
import usersController from './controllers/usersController'

const initRoutes = (router: Router): void => {
    router.get('/users', usersController.getItems);
    router.post('/users', usersController.createItem);
    router.delete('/users/:itemId', usersController.deleteItem);
}

export default initRoutes;