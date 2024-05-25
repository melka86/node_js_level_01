 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const articleSchema = new Schema({
  userName: String, // String is shorthand for {type: String} and type is the name in the input.
  userEmail: String,
  userPassword: String,
});
 
 
// Create a model based on that schema
const MyData = mongoose.model("Article", articleSchema);
 
 
// export the model
module.exports = MyData;