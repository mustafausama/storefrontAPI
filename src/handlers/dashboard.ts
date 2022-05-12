import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'

import jwt from 'jsonwebtoken'
import { User } from '../models/user';
const JWT_SECRET: string = process.env.JWT_SECRET!;
const dashboardRoutes = (app: express.Application) => {
    app.get('/order-by-user', orderByUser)
}

const dashboard = new DashboardQueries()

const orderByUser = async (req: Request, res: Response) => {
    let user_id: string;
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
    const orderByUser = await dashboard.orderByUser(user_id)
    res.json(orderByUser)
}


export default dashboardRoutes
