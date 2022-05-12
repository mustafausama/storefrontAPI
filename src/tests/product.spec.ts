import { Product, ProductStore } from "../models/products";
import supertest from "supertest";
import app from "../server";
import { User } from "../models/user";

const store = new ProductStore();
const request = supertest(app);

const product: Product = {
    name: 'Couch',
    price: '299.99'
}

const user: User = {
    firstName: 'Mustafa',
    lastName: 'Abdelrahman',
    username: 'HeaviBoi',
    password: 'password123'
}



describe("Product Model", () => {
    it("should craete a new product", async () => {
        const result = await store.create(product);
        expect(result).toBeTruthy();
    })

    it("should return the created product", async () => {
        const result = await store.show('1');
        expect(result.name).toEqual(product.name);
        expect(result.price).toEqual(product.price);
    })
})

describe("Product endpoints", () => {
    let token: string;
    beforeAll(async () => {
        const response = await request.post('/users/register').send(user)
        token = response.body;
        expect(token).toBeTruthy();
    })
    it("should return all products", async () => {
        const response = await request.get('/products')
        expect(response.body.length).toBeGreaterThanOrEqual(1)
    });
    it("should return a specific product", async () => {
        const response = await request.get('/products/1')
        expect(response.body).toEqual({ ...product, id: 1 })
    });
    it("should return a status 401 when token not provided", async () => {
        const response = await request.post('/products').send(product)
        expect(response.status).toEqual(401)
    });
    it("should create a product when token is provided", async () => {
        const response = await request.post('/products').set('Authorization', `Bearer ${token}`).send(product)
        expect(response.status).toEqual(200)
    })
})
