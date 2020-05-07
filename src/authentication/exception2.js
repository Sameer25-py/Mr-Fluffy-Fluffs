const mongoose = require('mongoose');
const utility = require('../Utility');
const Admin = require('../models/Admin.model');

//exceptionauth for admin forget password protocol
const exceptionAuth=(req,res,next)=>{
  if (req.session.Username && req.session.Email){
  const filter={'Username':req.session.Username,'Email':req.session.Email}
  //searching database
  utility.getOne(Admin,filter).then(match=>{
        next()

  }).catch(err=>res.json(err))
  }
  else{
		res.json({status:"False",msg:"Some Cookies were Missing"})
	}

}

module.exports = exceptionAuth