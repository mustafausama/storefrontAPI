import { User } from "../models/user";
import { Order, OrderStore, STAT } from "../models/order";
import { DashboardQueries } from '../services/dashboard'
import supertest from "supertest";
import app from "../server";
import { Product } from "../models/products";
import jwt from "jsonwebtoken";

const request = supertest(app);
const store = new OrderStore();

const user: User = {
    firstName: 'Mustafa',
    lastName: 'Abdelrahman',
    username: 'HeaviBoi',
    password: 'password123'
}

const product: Product = {
    name: 'Couch',
    price: '299.99'
}


describe("Order endpoints and model", () => {
    let token: string;
    let product_id: string;
    let order_id: string;
    let user_id: string;
    beforeAll(async () => {
        const response = await request.post('/users/register').send(user)
        token = response.body;
        expect(token).toBeTruthy();
        const prod = await request.post('/products').set('Authorization', `Bearer ${token}`).send(product)
        product_id = prod.body.id;
        user_id = (<{ user: User }>jwt.decode(token)).user.id!
        const order: Order = {
            user_id,
            status: STAT.active
        }
        const result = await store.create(order)
        order_id = result.id!;
    })
    it("should add product to order", async () => {
        const result = await store.addProduct(3, order_id, product_id);
        expect(result).toBeTruthy()
    })
    it("returns current order by user", async () => {
        const dashboardStore = new DashboardQueries();
        const result = await dashboardStore.orderByUser(user_id);
    })
})
