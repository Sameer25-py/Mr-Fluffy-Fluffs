const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Customer = require('../../src/models/Customer.model');
const bcrypt   = require('bcrypt');
const Code   = require('../../src/models/Code.model')
const cred     = require('../twilio')
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

const resend= (req,res)=>{
  send_login_sms(5,req.session.MobileNo,'Login',res)
}

const forget_pass = (req,res)=>{
  const filter={'Username':req.body.customer.Username,'Email':req.body.customer.Email,'MobileNo':req.body.customer.MobileNo}
  utility.getOne(Customer,filter).then(match=>{
          req.session.Username = req.body.customer.Username;
          req.session.MobileNo = req.body.customer.MobileNo;
          req.session.Email    = req.body.customer.Email;
          send_login_sms(5,req.body.customer.MobileNo,'Forget Password',res);
  }).catch(err=>{
    res.json({status:"False",msg:"Invalid credentials"})
  })
}

const verify_forget= (req,res) =>{

  const filter={'Username':req.session.Username,'Email':req.session.Email,'MobileNo':req.session.MobileNo}
    //hashing new pass
   const salt_iterations = 10;
      bcrypt.hash(req.body.customer.PassHash,salt_iterations,(err,hash) => {
        if(err) {
          res.json({status:'False',msg:'Error hashing user password.'});
        }
      else{

      utility.patchOne(Customer,filter,{$set:{PassHash:hash}},{multi:true})
      .then(customer =>{req.session.destroy();res.json({status:'True',msg:'Password Updated.'})})
      
      .catch(err => res.json(err)); 

      }
  });

}

const details = (req,res)=>{
  let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};
  utility.getOne(Customer,credentials).then(customer=>{
    //phone' : '+923009495206', 'address' : '136-D Sui Gas Society', 'payment': 'Cash on Delivery'
    let data={ 
        phone:customer.MobileNo,
        address:customer.Address,
        payment:'Cash on Delivery'

    }
    res.json([data])
  }).catch(err=>{
    res.json({status:"False",msg:'User details not found.'})
  })
}

const verify = (req,res) => {
  let data = {

        _id      : new mongoose.Types.ObjectId(),
        FullName : req.session.FullName,
        Username : req.session.Username,
        PassHash : req.session.PassHash,
        Address  : req.session.Address,
        Email    : req.session.Email,
        MobileNo : req.session.MobileNo,
        Verified : 1

};

utility.put(Customer,data).then(customer => {
    if(customer){
      res.json({status:"True",msg:"Customer Added Successfully"})
    }
    else{
      res.json({status:"False",msg:"Unable to Add Customer"})
    }
}).catch(err => res.json(err))
}

const remove = (req,res) => {
  let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};
  utility.removeOne(Customer,credentials)
  .then(customer => {
    req.session.destroy();
    res.json({status:'True',msg:'Customer removed.'});
  })
  .catch(err => res.json(err));

};

const patch = (req,res) => {
  let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};
  utility.patchOne(Customer,credentials,{$set:req.body.customer},{multi:true})
  .then(customer =>{
    if (req.body.customer.Email){
      req.session.Email = req.body.customer.Email
    } 
    if (req.body.customer.Username){
      req.session.Username= req.body.customer.Username
    }
    res.json({status:'True',msg:'Customer updated.'})
  })
  .catch(err => res.json(err)); 

};

const put = (req,res) => {
  

  if(!(req.body.customer.Email && req.body.customer.Username && req.body.customer.PassHash && req.body.customer.MobileNo))
  {
    res.json({status:'False',msg:'Required fields are not set.'});
    return;
  }

  utility.getOne(Customer,{Email:req.body.customer.Email})
  .then(customer => res.json({status:'False',msg:'Email already present.'}))
  .catch(err => {
    utility.getOne(Customer,{Username:req.body.customer.Username})
    .then(customer => res.json({status:'False',msg:'Username already present.'}))
    .catch(err => {
    utility.getOne(Customer,{MobileNo:req.body.customer.MobileNo}).then(customer=>{
      res.json({status:'False',msg:'MobileNo already present.'})
    }).catch(err=>{

    //hashing
     const salt_iterations = 10;
      bcrypt.hash(req.body.customer.PassHash,salt_iterations,(err,hash) => {
        if(err) {
          res.json({status:'False',msg:'Error hashing user password.'});
        }
        else{
            //setting cookies
            req.session.Username = req.body.customer.Username;
            req.session.PassHash = hash;
            req.session.MobileNo = req.body.customer.MobileNo;
            req.session.Email    = req.body.customer.Email;
            req.session.Address  = req.body.customer.Address;
            req.session.FullName = req.body.customer.FullName;

            //send code
            (async function (){
            await send_login_sms(5,req.body.customer.MobileNo,'Login',res)
            }());
        }
      });
    }); 
  });
});
};

const get = (req,res) => {

  let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};

  utility.getOne(Customer,credentials)
  .then(customer => res.json({status:'True',msg:'Customer found.',data:customer}))
  .catch(err => res.json(err));
};

module.exports = {details,remove,patch,put,get,verify,resend,forget_pass,verify_forget};
