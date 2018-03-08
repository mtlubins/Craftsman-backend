import {Middleware, NestMiddleware, ExpressMiddleware} from '@nestjs/common';

@Middleware()
export class CorsMiddleware implements NestMiddleware {
    resolve(): ExpressMiddleware {
        return (req, res, next) => {
            const allowedOrigins = ['http://localhost:3000'];
            if (allowedOrigins.indexOf(req.header('Origin'))) {
                res.header('Access-Control-Allow-Origin', req.header('Origin'));
                res.header('Access-Control-Allow-Headers', 'content-type');
                res.header('Access-Control-Allow-Methods', 'POST');
            }
            next();
        };
    }
}