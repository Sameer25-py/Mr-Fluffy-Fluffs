const mongoose = require('mongoose');
URI = process.env.MONGODB_URI;

//connecting and exporting database module hosted on heroku. 
const db = mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true, useCreateIndex: true})
.then(() => {
  console.log('Connected to database.');
})
.catch((err) => {
  console.log('Error: Cannot connect to database.');
});

module.exports = db;
