const env_vars      = require('dotenv').config()
const db            = require('./src/db_connection');
const express       = require('express');
const app           = express();
const server        = require('http').createServer(app);
const router        = require('express').Router();
const session       = require('express-session');
const index         = require('./routes/index');
const api           = require('./routes/api');
const session_store = require('connect-mongo')(session);
const {uuid}        = require('uuidv4');
const mongoose      = require('mongoose');
const morgan        = require('morgan')

const session_options = {
    secret:"123",
    saveUninitialized:true,
    resave:true,
    name:'fluffy_fluffs_session_id',
    cookie: {
      maxAge:60*60*24*1000, // valid for 30 minutes only
      httpOnly:true,
      secure:false, // for production use true
      sameSite:true
    },
    rolling:true,
    store:new session_store({mongooseConnection:mongoose.connection}),
    genid: function(req) {
      return uuid();
    }
}

app.use(morgan('dev'))
app.use(session(session_options));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',index);
app.use('/api',api);
port = process.env.PORT || 8080;

server.listen(port);
