import express, { Express, Request, Response } from 'express'
import cors from 'cors';
import Routing from './routes';

const app: Express = express()
const address: string = "127.0.0.1:3000"

app.use(cors())
app.use(express.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

Routing.api(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app
