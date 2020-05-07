const mongoose = require('mongoose');
const utility = require('../Utility');
const Customer = require('../models/Customer.model');


const userAuth = (req,res,next) => {
    //checking customer credentials stored as cookies.
    if((req.session.Username || req.session.Email) && req.session.PassHash)
    {
      let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash}
      //searching database
      utility.getOne(Customer,credentials)
      .then(customer => {
        if(customer.Verified) {
          //forwarding to next function
          next();
        }
        else {
          res.json({status:'False',msg:'Phone number verification required.'});
        }
      })
      .catch(err => res.json(err));
  }
  else
   {
    res.json({status:'False', msg:'You must be logged in to access this feature.'});
    return;
  }

};

module.exports = userAuth;
