import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGO_CLOUD;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_DATABASE,
};

try {
  mongoose.connect(uri, options);
} catch (error) {
  console.log(error);
  process.exit(1);
}

const conn = mongoose.connection;

export default conn;