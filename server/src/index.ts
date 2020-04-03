import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from './models/users.model';

const app = express();

const mongoUri = 'mongodb://localhost:27017/local-app';

const connectToDb = async () => {
    try {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('\nNos conectamos a la base de datos - 🙌\n')
    } catch (err) {
        console.log(err);
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {

    const port = Number(process.env.PORT || 4000);

    await connectToDb();

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World 🌎');
    });

    app.post('/users', async (req: Request, res: Response) => {
        const data = req.body;
        const user = new User(data);
        await user.save();
        res.json(user);
    });



    // start the Express server
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
})();