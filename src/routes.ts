import { Express } from 'express'
import user from './handlers/user';
import product from './handlers/product';
import dashboard from './handlers/dashboard';
import order_routes from './handlers/order';

class Routing {
    api(app: Express) {
        user(app);
        product(app);
        dashboard(app);
        order_routes(app)
    }
}

export default new Routing();