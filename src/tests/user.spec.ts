import { User, UserStore } from "../models/user";
import supertest from "supertest";
import app from "../server";

const store = new UserStore();
const request = supertest(app);

const user: User = {
    firstName: 'Mustafa',
    lastName: 'Abdelrahman',
    username: 'HeaviBoi',
    password: 'password123'
}


describe("User Model", () => {
    it("should return a list of users when calling index", async () => {
        const result = await store.index();
        expect(result).toBeTruthy();
    })

    it("should craete a new user", async () => {
        const result = await store.create(user);
        expect(result).toBeTruthy();
    })
})

describe("User endpoints", () => {
    let token: string;
    beforeAll(async () => {
        const response = await request.post('/users/register').send(user)
        token = response.body;
        expect(token).toBeTruthy();
    })
    it("should return a status 401 when token not provided", async () => {
        const response = await request.get('/users')
        expect(response.status).toEqual(401)
    });
    it("should return all users when token provided", async () => {
        const response = await request.get('/users').set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
    });
    it("should return the registerd user", async () => {
        const response = await request.get('/users/2').set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
    })
})
