const app = require('express')();
//routes for main paths
const admin   = require('./admin/index');
const user    = require('./user/index');
const guest   = require('./guest/index');
const common  = require('./common/index');

//routing  to respective router based on request.
app.use('/guest',guest);
app.use('/admin',admin);
app.use('/user',user);
app.use('/common',common);



module.exports = app;
