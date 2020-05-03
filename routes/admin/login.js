const mongoose = require('mongoose');
const session  = require('express-session');
const utility = require('../../src/Utility');
const bcrypt  = require('bcrypt');
const Admin    = require('../../src/models/Admin.model');

const login = (req,res) => {

    let credentials = req.body.admin.Email ? {Email:req.body.admin.Email,PassHash} : {Username:req.body.admin.Username};

    utility.getOne(Admin,credentials)
    .then(admin => {
      bcrypt.compare(req.body.admin.PassHash,admin.PassHash, (err,match) => {
          if(match) {
            if(req.body.admin.Username) {
              req.session.Username = req.body.admin.Username;
            }
            else {
              req.session.Email = req.body.admin.Email;
            }
          req.session.PassHash = admin.PassHash;
          res.json({status:'True',msg:'Admin logged in.'});
        }
        else {
          res.json({status:'False',msg:'Invalid username or password.'});
        }
      });
    })
    .catch(err => {
      console.log(err)
      res.json({status:'False',msg:'Invalid username or password.'});
    });
  }


module.exports = login;
