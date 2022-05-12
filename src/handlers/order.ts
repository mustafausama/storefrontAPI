import express, { Request, Response } from 'express';
import { Order, OrderStore, STAT } from '../models/order';

import jwt from 'jsonwebtoken'
import { User } from '../models/user';
import { stat } from 'fs/promises';
const { JWT_SECRET } = process.env;

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
    let user_id;
    try {
        const authHeader = req.headers.authorization!
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET)
        const decoded = jwt.decode(token);
        user_id = <string>(<{ user: User }>decoded).user.id;
    } catch (err) {
        res.status(401).send("Unauthorised");
        return
    }
    const order: Order = {
        user_id,
        status: STAT.active
    }
    const result = await store.create(order)
    res.json(result)
}

const addProdcut = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization!
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET)
    } catch (err) {
        res.status(401).send("Unauthorised");
        return
    }
    const { order_id } = req.params;
    const { produt_id, quantity } = req.body;
    const result = await store.addProduct(quantity, order_id, produt_id);
    res.json(result)
}

const order_routes = (app: express.Application) => {
    app.post('/orders', create)
    app.post('/orders/:id/products', addProdcut)

}

export default order_routes;

