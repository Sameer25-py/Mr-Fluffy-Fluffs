const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Customer = require('../../src/models/Customer.model');
const bcrypt   = require('bcrypt');
const Code   = require('../../src/models/Code.model')
const twilio = require('twilio')(
  'ACb2072416a86aefe3b8916b81ad59123d',
  'b8318690acc795bcf97927c599f62b93'  
)

const generate= (x) => Math.floor(Math.random(1,9) * 99999 + 10000)

const send_login_sms=(x,target,res)=>{
  code= generate(x)
  twilio.messages.create({
  from:'+12512996973',
  to: target,
  body:`Mr.Fluffy Fluffs\n Login Verification Code: ${code.toString()}`
},(err,message)=>{
  if (err){
   res.json({status:'False',msg:'MobileNo not reachable'})
  }
  else if (message){
   res.json({status:'True',code:code})
  }
})
}

const verify = (req,res) => {
  let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};
  utility.getOne(Customer,credentials)
  .then(customer => {
    if(customer.Verified) {
      res.json({status:'True',msg:'Customer already verified.'});
    }
    else {
      local = 53683
      if (req.body.customer.code == local){
      utility.patchOne(Customer,credentials,{$set:{Verified:1}},{multi:true})
      .then(customer => res.json({status:'True',msg:'Customer verified.'}))
      .catch(err => res.json(err));
    }
    else{
      res.json({status:'False',msg:'Code Mismatch'})
    }
    }
  })
  .catch(err => res.json(err));
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
  .then(customer => res.json({status:'True',msg:'Customer updated.'}))
  .catch(err => res.json(err));

};

const put = (req,res) => {
  console.log(typeof req.body.customer.MobileNo)

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

    //hashing
     const salt_iterations = 10;
      bcrypt.hash(req.body.customer.PassHash,salt_iterations,(err,hash) => {
        if(err) {
          res.json({status:'False',msg:'Error hashing user password.'});
        }
        else{
          let data = {

            _id      : new mongoose.Types.ObjectId(),
            FullName : req.body.customer.FullName,
            Username : req.body.customer.Username,
            PassHash : hash,
            Address  : req.body.customer.Address,
            Email    : req.body.customer.Email,
            MobileNo : req.body.customer.MobileNo,
            Verified : 0

          };
          utility.put(Customer,data).then(customer => {
            req.session.Username = req.body.customer.Username;
            req.session.PassHash = hash;
            //send code
            (async function (){
            await send_login_sms(5,req.body.customer.MobileNo,res)
            }());
          
          }).catch(err => res.json(err))
        }
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

module.exports = {remove,patch,put,get,verify};
