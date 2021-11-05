import Koa from 'koa';

const isAdmin = async (ctx: Koa.Context, next: Koa.Next) => {
    if (ctx.headers.authorization === 'admin') {
        return next();
    } else {
        ctx.status = 401;
        ctx.body = 'not enough permissions';
    }
}

export default isAdmin