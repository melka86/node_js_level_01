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

// res.render("index", { title: "Home page" });
// index est le fichier index.ejs .
//on fait comme si on etait dans le dossier views. donc on va directement a home.

// Home Page
app.get("/", (req, res) => {
  res.render("index", {});
});

// Add user Page
app.get("/user/add.html", (req, res) => {
  res.render("user/add", {});
});

// View details user Page
app.get("/user/view.html", (req, res) => {
  res.render("user/view", {});
});

// Edit user Page
app.get("/user/edit.html", (req, res) => {
  res.render("user/edit", {});
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

