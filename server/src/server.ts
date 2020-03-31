import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import path from 'path';


// Init express
const app = express();


// Add middleware/settings/routes to express.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/refresh-token', async (req: Request, res: Response) => {
    try {
        // const authorization = "authorization";
        // const authHeader = req.headers[authorization];
        // if (!authHeader) return res.send(null);

        res.send('TODO: Refresh token 😁');
    } catch (err) {
        console.log(err);
        res.send(null);
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World");
});

// Export express instance
export default app;
