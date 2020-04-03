import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 100;

// Aquí empezamos a ver el poder de mongoose
export interface IUser extends Document {
    first: string,
    last: string,
    email: string,
    password: string,
    setPassword: (unhashedPw: string) => Promise<void>,
    validPassword: (pw: string) => Promise<boolean>
}

const UserSchema = new mongoose.Schema<IUser>({
    first: { required: true, type: String },
    last: { required: true, type: String },
    email: { unique: true, required: true, type: String },
    password: { required: true, type: String },
});

UserSchema.method('setPassword', async function (this: IUser, unhashedPw: string) {
    this.password = await bcrypt.hash(unhashedPw, saltRounds);
});

UserSchema.method('validPassword', async function (this: IUser, pw: string) {
    return await bcrypt.compare(pw, this.password);
});

export default mongoose.models.Users || mongoose.model('users', UserSchema);