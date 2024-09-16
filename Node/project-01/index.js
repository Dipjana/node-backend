const express = require("express");
const users = require("./MOCK_DATA.json");
const path = require("path");

const {connectMongoDB} = require('./connection');
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter"); // Static Router
const { logReqRes } = require("./middlewares");

const app = express();
const port = 8000;
//  

// Connect to MongoDB
connectMongoDB("mongodb+srv://dipsundar_90:63m0DG1IY4efNnUJ@cluster0.gcyernc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares - Plugins

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes

app.use("/api/users", userRoute);

app.use("/url", urlRoute);

app.use("/", staticRoute)

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {urls: allUrls});
  });




app.listen(port, () => console.log("Server Started !"));
