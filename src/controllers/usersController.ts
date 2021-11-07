import Koa from 'koa';
import validate from '../utils/validator';

const usersController = {
    async getItems(ctx: Koa.Context) {
        ctx.body = await ctx.app.context.userService.getUsers();
    },
    async createItem(ctx: Koa.Context) {
        const validationError = validate.createUserValidation(ctx.request.body);
        if (validationError.length) {
            ctx.status = 400;
            ctx.body = validationError.join(', ');
        }

        const { id, name, age } = await ctx.app.context.userService.createUser(
            ctx.request.body
        );

        ctx.body = `User ${name} (${age} y.o) created. ID: ${id}`;
    },
    async deleteItem(ctx: Koa.Context) {
        const { name } = await ctx.app.context.userService.deleteUser(ctx.params.itemId);
        ctx.status = 200;
        ctx.body = `${name} removed`;
    },

};

export default usersController;