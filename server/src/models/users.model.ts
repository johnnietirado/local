import mongoose, { Document } from 'mongoose';

// Aquí empezamos a ver el poder de mongoose
export interface IUser extends Document {
    email: string,
    password: string
}

const UserSchema = new mongoose.Schema<IUser>({
    email: { unique: true, required: true, type: String },
    password: { required: true, type: String },
});

export default mongoose.models.Users || mongoose.model('users', UserSchema);