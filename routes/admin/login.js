const mongoose = require('mongoose');
const session  = require('express-session');
const utility = require('../../src/Utility');
const bcrypt  = require('bcrypt');
const Admin    = require('../../src/models/Admin.model');

const login = (req,res) => {

  if((req.session.Username || req.session.Email) && req.session.PassHash)
  {
    let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash}
    utility.getOne(Admin,credentials)
    .then(data => res.json({status:'False',msg:'Admin already logged in.'}))
    .catch(err => {
      req.session.destroy();
      res.json({status:'False',msg:'Admin credentials has been changed. Please log in again.'});
    });
  }
  else
  {
    let credentials = req.body.admin.Email ? {Email:req.body.admin.Email} : {Username:req.body.admin.Username};

    utility.getOne(Admin,credentials)
    .then(admin => {
      console.log(admin)
      bcrypt.compare(req.body.admin.PassHash,admin.PassHash, (err,match) => {
          if(match) {
            if(req.body.admin.Username) {
              req.session.Email = req.body.admin.Username;
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
};

module.exports = login;
