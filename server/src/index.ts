import express, { Request, Response, json } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import mongoose from 'mongoose';
import cors from 'cors';
import User, { IUser } from './models/users.model';
import { JwtService } from './utils/JwtService';

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

    app.get('/user', async (req: Request, res: Response) => {
        const accessToken = req.headers.authorization;
        const token = accessToken.replace('Bearer ', '');
        if (!accessToken) return res.sendStatus(401);
        const data: any = await new JwtService().decodeJwt(token);
        const { userId } = data;
        const user = await User.findById(userId);
        if (!user) return res.sendStatus(404);
        return res.json(user);
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
            if (!user) return res.status(404).send('No hay usuario con ese email.');
            const valid = await user.validPassword(password);
            if (valid) {
                const jwtData = { userId: user._id };
                const data = {
                    user,
                    accessToken: await new JwtService().getJwt(jwtData)
                };
                return res.json(data);
            }
            return res.status(400).send('Contraseña invalida.');
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