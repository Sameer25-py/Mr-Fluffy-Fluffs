const mongoose = require('mongoose');
const utility = require('../Utility');
const Admin   = require('../models/Admin.model');
const Customer = require('../models/Customer.model');

const basicAuth = (req,res,next) => {
  if(req.session.GuestId)
  {
    next();
  }
  else if((req.session.Username || req.session.Email) && req.session.PassHash)
  {
    let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};
    utility.getOne(Customer,credentials)
    .then(customer => {
      if(customer.Verified) {
        next();
      }
      else {
        res.json({status:'False',msg:'Phone verification required.'});
      }
    })
    .catch(err => {
      utility.getOne(Admin,credentials)
      .then(result => next())
      .catch(err => res.json(err));
    });
  }
  else {
    res.json({status:'False',msg:'Basic authentication (guest,customer or admin) required.'});
  }
};

module.exports = basicAuth
