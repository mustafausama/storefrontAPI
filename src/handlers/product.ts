import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';

import jwt from 'jsonwebtoken'
const JWT_SECRET: string = process.env.JWT_SECRET!;

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const result = await store.index();
    res.json(result)
}

const show = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await store.show(id);
    res.json(result)
}

const create = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization!
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET)
    } catch (err) {
        res.status(401).send("Unauthorised");
        return
    }
    const product: Product = {
        name: req.body.name,
        price: req.body.price
    }
    const result = await store.create(product)
    res.json(result)
}

const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create)
}

export default product_routes;

