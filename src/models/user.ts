import Client from '../database'
import bcrypt from 'bcrypt'

const pepper: string = process.env.BCRYPT_PASSWORD!;
const saltRounds: string = process.env.SALT_ROUND!;


export type User = {
    id?: string;
    username: string;
    firstName: string;
    lastName: string;
    password?: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT id, username, firstName, lastName FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw Error(`Cannot fetch users: ${err}`);
        }
    }
    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT id, username, firstName, lastName FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw Error(`Cannot fetch users: ${err}`);
        }
    }
    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users(username, firstName, lastName, password_digest) VALUES($1, $2, $3, $4) RETURNING id, username';
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.username, u.firstName, u.lastName, hash]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw Error(`Cannot create user: ${err}`);
        }
    }
    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT id, username, firstName, lastName, password_digest FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt.compareSync(password + pepper, user.password_digest))
                    return user;
            }
            return null
        } catch (err) {
            throw Error(`Cannot autheticate user: ${err}`);
        }

    }
}