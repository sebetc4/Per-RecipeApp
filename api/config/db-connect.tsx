import { connect, ConnectOptions, Mongoose } from 'mongoose';

declare global {
    var mongoose: {
        connection: null | Mongoose;
        promise: null | Mongoose;
    };
}

global.mongoose = {
    connection: null,
    promise: null,
};

export const dbConnect = async () => {
    if (global.mongoose.connection) {
        return global.mongoose.connection;
    } else {

        const user = process.env.MONGODB_USER;
        const password = process.env.MONGODB_PASSWORD;
        const database = process.env.MONGODB_DATABASE;
        const connectString = `mongodb+srv://${user}:${password}@cluster0.zsqpbcg.mongodb.net/${database}?retryWrites=true&w=majority`;
        try {

            const promise = await connect(connectString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: true,
            } as ConnectOptions);
            global.mongoose= {
                connection: promise,
                promise
            }
            console.log('MongoDB connected')
        } catch(err) {
            console.log('Error MongoDB connection' + err)
        }
    }
};