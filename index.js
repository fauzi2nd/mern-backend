import express from "express";
import cors from "cors";
import conn from "./config/Database.js";
import "dotenv/config";
import UserRoute from "./routes/UserRoute.js";

const app = express();

conn.on("error", (error) => console.log(error));
conn.once("open", () => console.log("Database Coonected..."));

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);
app.use(express.json());
app.use(UserRoute);

app.listen(process.env.APP_PORT, () =>
    console.log("Server up and running... ")
);
