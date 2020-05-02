const mongoose = require('mongoose');
const utility = require('../Utility');
const Customer = require('../models/Customer.model');

const exceptionAuth=(req,res,next)=>{
  if (req.session.Username && req.session.Email && req.session.MobileNo){
  const filter={'Username':req.session.Username,'Email':req.session.Email,'MobileNo':req.session.MobileNo}
  utility.getOne(Customer,filter).then(match=>{
        next()

  }).catch(err=>res.json(err))
  }
  else{
		res.json({status:"False",msg:"Some Cookies were Missing"})
	}

}

module.exports = exceptionAuth