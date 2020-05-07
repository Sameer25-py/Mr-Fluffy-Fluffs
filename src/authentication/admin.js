const mongoose = require('mongoose');
const utility = require('../Utility');
const Admin   = require('../models/Admin.model');


const adminAuth = (req,res,next) => {
  
  //checking cookie creentails validity
  if((req.session.Username || req.session.Email) && req.session.PassHash)
  { 
    let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};
    
    //searching in database
    utility.getOne(Admin,credentials)
    .then(result => { next(); }) 
    .catch(err => { res.json(err)});
  }
  else
  {
    res.json({status:'False', msg:'Admin privileges required.'});
  }

};

module.exports = adminAuth;
