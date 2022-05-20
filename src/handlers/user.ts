import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

import jwt from 'jsonwebtoken'
const JWT_SECRET: string = process.env.JWT_SECRET!;

const store = new UserStore();

const index = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization!
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET)
    } catch (err) {
        res.status(401).send("Unauthorised");
        return
    }
    const result = await store.index();
    res.json(result)
}

const show = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization!
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET)
    } catch (err) {
        res.status(401).send("Unauthorised");
        return
    }
    const { id } = req.params
    const result = await store.show(id);
    res.json(result)
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }
    const result = await store.create(user);
    const token = jwt.sign({ user: result }, process.env.JWT_SECRET as string);
    res.json(token)
}

const register = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }
    const result = await store.create(user);
    const token = jwt.sign({ user: result }, process.env.JWT_SECRET as string);
    res.json(token)
}

const login = async (req: Request, res: Response) => {
    const result = await store.authenticate(req.body.username, req.body.password);
    if (!result) {
        res.status(400).send("Invalid credentials");
        return;
    }
    const token = jwt.sign({
        user: {
            id: result.id,
            username: result.username,
            firstName: result.firstName,
            lastName: result.lastName
        }
    }, process.env.JWT_SECRET as string);
    res.send(token)
}

const user_routes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users/', create);
    app.post('/users/register', register);
    app.post('/users/login', login);
}

export default user_routes;

