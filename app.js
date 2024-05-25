const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));

const MyData = require("./models/myDataSchema");

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
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

    myData.save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.error(err);
    })
      });