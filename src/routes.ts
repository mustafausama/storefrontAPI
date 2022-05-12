import { Express } from 'express'
import user from './handlers/user';
import product from './handlers/product';
import dashboard from './handlers/dashboard';

class Routing {
    api(app: Express) {
        user(app);
        product(app);
        dashboard(app);
    }
}

export default new Routing();