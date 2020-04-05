import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User, { IUser } from './models/users.model';

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {

    const port = Number(process.env.PORT || 4000);

    await connectToDb();

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World 🌎');
    });

    app.post('/users', async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const user: IUser = new User(data);
            await user.setPassword(data.password);
            await user.save();
            res.json(user);
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    });

    app.post('/login', async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user: IUser = await User.findOne({ 'email': email }).exec();
            const valid = await user.validPassword(password);
            if (valid) {
                return res.send('Contraseña valida!')
            } else {
                return res.send('Contraseña incorrecta');
            }
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    });



    // start the Express server
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
})();