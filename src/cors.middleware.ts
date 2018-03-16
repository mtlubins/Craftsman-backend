import {Middleware, NestMiddleware, ExpressMiddleware} from '@nestjs/common';

@Middleware()
export class CorsMiddleware implements NestMiddleware {
    resolve(): ExpressMiddleware {
        return (req, res, next) => {
            const allowedOrigins = ['http://localhost:3000'];
            if (allowedOrigins.indexOf(req.header('Origin'))) {
                // res.header('Access-Control-Allow-Origin', req.header('Origin'));
                // res.header('Access-Control-Allow-Headers', 'content-type');
                // res.header('Access-Control-Allow-Methods', 'POST');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
                res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization ');
            }
            next();
        };
    }
}