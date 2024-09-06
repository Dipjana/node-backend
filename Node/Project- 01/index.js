const express = require("express");
const users = require("./MOCK_DATA.json");


const {connectMongoDB} = require('./connection');
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const port = 8000;
app.get("/", (req, res) => {
    res.end("Hello From Server");
});

// Connect to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0")
    .then(() => console.log("Connected to MongoDB"))

// Middlewares - Plugins
app.use(logReqRes("log.txt"));

// Routes


app.use("/user", userRouter);


app.listen(port, () => console.log("Server Started !"));
