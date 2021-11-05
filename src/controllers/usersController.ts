import Koa from 'koa';
import validate from '../utils/validator';

const usersController = {
    async getItems(ctx: Koa.Context) {
        ctx.body = await ctx.app.context.db.getUsers();
    },
    async createItem(ctx: Koa.Context) {
        const validationError = validate.createUserValidation(ctx.request.body);
        if (validationError.length) {
            ctx.status = 400;
            ctx.body = validationError.join(', ');
            return;
        }
        //auth validation could be a middleware
        if (ctx.headers.authorization === 'admin') {
            const { id, name, age } = await ctx.app.context.db.createUser(
                ctx.request.body
            );

            ctx.body = `User ${name} (${age} y.o) created. ID: ${id}`;
        } else {
            ctx.status = 401;
            ctx.body = 'not enough permissions';
        }
    },
    async deleteItem(ctx: Koa.Context) {
        if (ctx.headers.authorization === 'admin') {
            await ctx.app.context.db.deleteUser(ctx.params.itemId);
            ctx.status = 204;
            ctx.body = 'Removed';
        } else {
            ctx.status = 401;
            ctx.body = 'not enough permissions';
        }
    },

};

export default usersController;