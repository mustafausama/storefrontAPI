import Client from '../database'

export enum STAT {
    active = 'active',
    complete = 'complete'
}

export type Order = {
    id?: string;
    user_id: string,
    status: STAT
}

export class OrderStore {
    async create(p: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *'
            const result = await conn.query(sql, [p.user_id, p.status]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create order: ${err}`)
        }
    }
    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
            const conn = await Client.connect();
            const result = await conn.query(sql, [quantity, orderId, productId])
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error("Cannot add product" + err);
        }
    }
}