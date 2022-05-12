import Client from '../database'
import { Order, STAT } from '../models/order'

export class DashboardQueries {
    async orderByUser(user_id: string): Promise<any> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id'
            const result = await conn.query(sql)
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Unable to get the current cart: ${err}`)
        }
    }
}
