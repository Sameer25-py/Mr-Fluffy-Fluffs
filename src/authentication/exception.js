const mongoose = require('mongoose');
const utility = require('../Utility');
const Customer = require('../models/Customer.model');

const exceptionAuth=(req,res,next)=>{
  if (req.session.UserName && req.session.Email && req.session.MobileNo){
  const filter={'Username':req.body.customer.Username,'Email':req.body.customer.Email,'MobileNo':req.body.customer.MobileNo}
  utility.getOne(Customer,filter).then(match=>{
        next()

  }).catch(err=>res.json(err))
  }
}

module.exports = exceptionAuth