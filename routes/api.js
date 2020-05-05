const app = require('express')();

const admin   = require('./admin/index');
const user    = require('./user/index');
const guest   = require('./guest/index');
const common  = require('./common/index');


app.use('/guest',guest);
app.use('/admin',admin);
app.use('/user',user);
app.use('/common',common);



module.exports = app;
