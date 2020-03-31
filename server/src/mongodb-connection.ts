import mongoose from 'mongoose';

// const URI = '    ';
const URI = process.env.MONGODB_URI

const connectDb = async () => {
    if (mongoose.connections[0].readyState) return;
    // Using new database connection
    try {
        const connect = async () => {
            // @ts-ignore
            await mongoose.connect(URI, {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
            });
            return console.info(`Successfully connected to ${URI}`);
        }
        await connect();
        mongoose.connection.on('disconnected', connect);
        return;
    } catch (err) {
        console.error('Error connecting to database: ', err);
        throw new Error(`Error connecting to Database: ${err.message}`);
    }
}

export default connectDb;