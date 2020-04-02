import express, { Request, Response } from 'express';

const app = express();

(async () => {

    const port = Number(process.env.PORT || 4000);

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World 🌎');
    });

    // start the Express server
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
})();