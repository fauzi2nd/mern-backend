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
        origin: "*",
        methods: ["GET", "POST"]
    })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', (req, res) => {
    res.send("hello world");
});

app.use(express.json());
app.use(UserRoute);
//https://super-caramel-7e7c51.netlify.app/
app.listen(process.env.APP_PORT, () =>
    console.log(`Server berjalan pada ${app.server}`)
);
