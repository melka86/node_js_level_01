const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Auto refresh:

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const MyData = require("./models/myDataSchema");

app.get("/", (req, res) => {
  MyData.find()
    .then((result) => {
      res.render("home", { title: "Home page", posts: result });
    })
    .catch((err) => {
      console.error(err);
    });
  // res.render("home", { title: "Home page" });
  // home est le fichier home.ejs .
  //on fait comme si on etait dans le dossier views. donc on va directement a home.
});

app.get("/index.html", (req, res) => {
  res.send("<h1>data sent correctly</h1> ");
});

mongoose
  .connect(
    "mongodb+srv://medelkaoukabi:DbJ7bE2fV7YgofPD@cluster0.zptjtqy.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.post("/", (req, res) => {
  // console.log(req.body)
  // const myData = new MyData (req.body);
  const myData = new MyData({
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  });

  myData
    .save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.error(err);
    });
});
