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
connectMongoDB("mongodb+srv://dipsundar_90:63m0DG1IY4efNnUJ@cluster0.gcyernc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))

// Middlewares - Plugins
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);


app.listen(port, () => console.log("Server Started !"));
