//Connection file to mongo db
import mongoose from "mongoose";

const MONGO_URI = "";
const source = process.env.MONGO_URI;

// connect to mongodb
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(source, {
            useNewUrlParser: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};

export default connectDB;