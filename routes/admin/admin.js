const mongoose  = require('mongoose');
const utility   = require('../../src/Utility');
const bcrypt    = require('bcrypt');
const Admin    = require('../../src/models/Admin.model');
const cred     = require('../twilio')
const Cart   = require('../../src/models/Cart.model')
const twilio = require('twilio')(
  cred.S_ID,
  cred.AUTH  
)

const generate= (x) => Math.floor(Math.random()*90000) + 10000;

const send_login_sms=(x,target,type,res)=>{
  code= generate(x)
  twilio.messages.create({
  from:'+12512996973',
  to: target,
  body:`Mr.Fluffy Fluffs\n ${type} Verification Code: ${code.toString()}`
},(err,message)=>{
  if (err){
    console.log(err)
   res.json({status:'False',msg:'MobileNo not reachable'})
  }
  else if (message){
   res.json({status:'True',code:code})
  }
})
}

const get = (req,res) => {

  let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};

  utility.getOne(Admin,credentials)
  .then(admin => res.json({status:'True',msg:'Admin found.',data:admin}))
  .catch(err => res.json(err));

}

const getAll = (req,res) => {

  utility.getAll(Admin,{})
  .then(data => res.json(data))
  .catch(err => res.json(err));

}
const forget_pass = (req,res)=>{
  const  filter = {"Username":req.body.admin.Username,"Email":req.body.admin.Email};
  utility.getOne(Admin,filter).then(admin=>{
      req.session.Username  = filter.Username
      req.session.Email     = filter.Email
        
      send_login_sms(5,req.body.admin.MobileNo,"Admin Forget Password",res);

  }).catch(err=>{
    res.json({status:"False",msg:"Invalid Credentials"})
  });

}
const verify_forget= (req,res) =>{

  const filter={'Username':req.session.Username,'Email':req.session.Email}
    //hashing new pass
   const salt_iterations = 10;
      bcrypt.hash(req.body.admin.PassHash,salt_iterations,(err,hash) => {
        if(err) {
          res.json({status:'False',msg:'Error hashing Admin password.'});
        }
      else{
      utility.patchOne(Admin,filter,{$set:{PassHash:hash}},{multi:true})
      .then(customer =>{req.session.destroy();res.json({status:'True',msg:'Password Updated.'})})
      .catch(err => res.json(err)); 
      };
  });
};


const remove = (req,res) => {

  utility.removeOne(Admin,{_id:req.params.adminid})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const patch = (req,res) => {

  utility.patchOne(Admin,{_id:req.params.adminid},{$set:req.body.admin},{multi:true})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const put = (req,res) => {

  const salt_iterations = 10;
  bcrypt.hash(req.body.admin.PassHash,salt_iterations, (err,hash) => {
    if(err) {
      res.json({status:'False',msg:'Cannot hash admin password.'});
    }
    else {
      let data = {
        _id      : new mongoose.Types.ObjectId(),
        FullName : req.body.admin.FullName,
        Username : req.body.admin.Username,
        PassHash : hash,
        Email    : req.body.admin.Email
      };
      filter = {Username:req.body.admin.Username,Email:req.body.admin.Email};
      utility.getOne(Admin,filter).then(match=>{
        res.json({status:"False",msg:"Admin with similar credentials already exists"})
      }).catch(err=>{

      utility.put(Admin,data)
      .then(data => res.json({status:"True",msg:"Admin added"}))
      .catch(err => res.json(err));
    });
    }
  });

};
const manage_orders = (req,res)=>{
  utility.patchOne(Cart,{Tracking_ID:req.params.id},{$set:req.body.order},{multi:true})
  .then(success=>{
    res.json({status:"True",msg:"Order state updated"})
  }).catch(err=>{
    res.json({status:"False",msg:"Order state cannot be updated"})
  })
}
const get_orders = (req,res)=>{
  utility.getAll(Cart,{}).then(orders=>{
    res.json({status:"True",msg:orders})
  }).catch(err=>{
    console.log(err)
    res.json({status:"False",msg:"Order history not Found."})
  })
};

module.exports = {get_orders,manage_orders,remove,patch,put,getAll,get,forget_pass,verify_forget};
