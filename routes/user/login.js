const mongoose = require('mongoose');
const session  = require('express-session');
const utility = require('../../src/Utility');
const bcrypt  = require('bcrypt');
const Customer = require('../../src/models/Customer.model');

const login = (req,res) => {

  if((req.session.Username || req.session.Email) && req.session.PassHash)
  {
    let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash}
    utility.getOne(Customer,credentials)
    .then(customer => res.json({status:'False',msg:`Customer ${customer.Username} already logged in.`}))
    .catch(err => {
      req.session.destroy();
      res.json({status:'False',msg:`Customer ${customer.Username}'s credentials has been changed. Please log in again.`});
    });


  }
  else
  {
    let credentials = req.body.customer.Email ? {Email:req.body.customer.Email} : {Username:req.body.customer.Username};
    utility.getOne(Customer,credentials)
      bcrypt.compare(local_hash,customer.PassHash, (err,match) => {
          if(match) {
            if(req.body.customer.Username) {
              req.session.Username = req.body.customer.Username;
            }
            else {
              req.session.Email = req.body.customer.Email;
            }
          req.session.PassHash = customer.PassHash;
          res.json({status:'True',msg:`Customer ${customer.Username} logged in.`});
        }
        else {
          res.json({status:'False',msg:'Invalid username or password.'});
        }
      }).catch(err => {
      res.json({status:'False',msg:'Invalid username or password.'});
    });
    
  }
};

module.exports = login;
