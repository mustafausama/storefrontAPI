import { User, UserStore } from "../models/user";
import supertest from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";

const store = new UserStore();
const request = supertest(app);

const user: User = {
    firstName: 'Mustafa',
    lastName: 'Abdelrahman',
    username: 'HeaviBoi',
    password: 'password123'
}


describe("User Model", () => {
    let user_id: string;
    it("should return a list of users when calling index", async () => {
        const result = await store.index();
        expect(result).toBeTruthy();
    })

    it("should craete a new user", async () => {
        const result = await store.create(user);
        user_id = result.id!;
        expect(result).toBeTruthy();
    })

    it("should return a specific user", async () => {
        const result = await store.show(user_id);
        expect(result.username).toEqual(user.username);
    })
})

describe("User endpoints", () => {
    let token: string;
    let user_id: string;
    beforeAll(async () => {
        const response = await request.post('/users/register').send(user)
        token = response.body;
        user_id = (<{ user: User }>jwt.decode(token)).user.id!
        expect(token).toBeTruthy();
        expect(user_id).toBeTruthy();
    })
    it("should login using the registered user data", async () => {
        const response = await request.post('/users/login').send({ username: user.username, password: user.password })
        expect(response.body).toBeTruthy()
    })
    it("should return a status 401 when token not provided", async () => {
        const response = await request.get('/users')
        expect(response.status).toEqual(401)
    });
    it("should return all users when token provided", async () => {
        const response = await request.get('/users').set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200)
    });
    it("should return a specific user", async () => {
        const response = await request.get('/users/' + user_id).set('Authorization', `Bearer ${token}`)
        expect(response.body.username).toEqual(user.username)
    })
})
