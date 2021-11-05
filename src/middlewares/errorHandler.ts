import Koa from 'koa';

//global catch
const errorHandler = async (ctx: Koa.Context, next: Koa.Next) => {
    try {
        await next();
    } catch (err: any) {
        // if (err.specificError) {
        //     do some actions
        // }

        ctx.status = err.status || 500;
        ctx.body = err.message || "unspecified error";
        ctx.app.emit('error', err, ctx);
    }
}

export default errorHandler