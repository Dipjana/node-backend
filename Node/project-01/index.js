const express = require("express");
const users = require("./MOCK_DATA.json");


const {connectMongoDB} = require('./connection');
const userRouter = require("./routes/user");
const urlRouter = require("./routes/url");
const URL = require("./models/url");
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
app.use(express.json());
app.use(logReqRes("log.txt"));

// Routes

app.use("/api/users", userRouter);

app.use("/url", urlRouter);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.end(`
      <html>
      <head></head>
      <body>
      <ol>${allUrls.map((url) => `<li>${url.shortId} - <a href="http://localhost:8000/url/${url.shortId}" target="_blank">${url.redirectURL}</a> - ${url.visitHistory.length}</li>`)}</ol>
      </body>
      </html>
      `)
  });




app.listen(port, () => console.log("Server Started !"));
