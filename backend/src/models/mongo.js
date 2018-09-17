const mongoose =   require("mongoose");
const configDB = require('../config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, {
  useMongoClient: true
}); // connect to our database

// create instance of Schema
const Schema =   mongoose.Schema;
// create schema
const userSchema  = new Schema({
  "userEmail" : String,
  "userPassword" : String
});
// create model if not exists.
module.exports = mongoose.model('user', userSchema);
