import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoURL = process.env.MONGO_URL;
const connectMongo = async () => {
  mongoose
    .connect(mongoURL, { useNewUrlParser: true })
    .then(() => console.log(`'MongoDB Connected!'`))
    .catch((err) => console.log(err));
};
export default connectMongo;
