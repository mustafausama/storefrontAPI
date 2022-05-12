import Client from '../database'

export type Product = {
    id?: string;
    name: string,
    price: string
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql);
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot fetch products: ${err}`)
        }
    }
    async show(id: string): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot fetch product: ${err}`)
        }
    }
    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'
            const result = await conn.query(sql, [p.name, p.price]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create product: ${err}`)
        }
    }
}