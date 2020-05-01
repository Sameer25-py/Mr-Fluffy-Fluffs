const mongoose = require('mongoose');
URI = process.env.MONGODB_URI;

const db = mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true, useCreateIndex: true})
.then(() => {
  console.log('Connected to database.');
})
.catch((err) => {
  console.log('Error: Cannot connect to database.');
});

module.exports = db;
