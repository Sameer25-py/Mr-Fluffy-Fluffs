const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Cart     = require('../../src/models/Cart.model');
const Customer = require('../../src/models/Customer.model');
const Order    = require('../../src/models/Order.model');
const Pancake  = require('../../src/models/Pancake.model');
const Topping  = require('../../src/models/Toppings.model');
const cred     = require('../twilio')
const twilio = require('twilio')(
  cred.S_ID,
  cred.AUTH  
)
const generate= (x) => Math.floor(Math.random()*90000) + 10000;

const send_login_sms=(code,target,res)=>{

  twilio.messages.create({
  from:'+12512996973',
  to: target,
  body:`Mr.Fluffy Fluffs\n Your order has been placed. Order TrackingID: ${code.toString()}`
},(err,message)=>{
  if (err){
    console.log(err)
   res.json({status:'False',msg:'MobileNo not reachable'})
  }
  else if (message){
   res.json({status:'True',code:code,msg:"Order has been placed."})
  }
})
}




const get = (req,res) => {

let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};

  utility.getOne(Cart,credentials)
  .then(cart => res.json({status:'True',msg:'Cart found.',data:cart}))
  .catch(err => res.json(err));

};

const put = (req,res) => {
	let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};

	cart = req.body.cart.items;
	code = generate(5)
	let data={
		_id         : new mongoose.Types.ObjectId(),
		Subtotal    : req.body.cart.Subtotal,
		Deliveryfee : req.body.cart.Deliveryfee,
		Date        : new Date().toISOString().slice(0,10),
		Total       : req.body.cart.Subtotal + req.body.cart.Deliveryfee,
		Pancakes    : req.body.cart.Pancakes,
		Status      : "Pending",
		Tracking_ID : code,
		MobileNo	: req.body.cart.MobileNo,
		Address     : req.body.cart.Address
	};
	utility.put(Cart,data).then(success=>{
		send_login_sms(code,req.body.cart.MobileNo,res)

	}).catch(err=>{
		res.json({status:"False",msg:"Unable to Place order."})	
	})
	

};

const remove = (req,res) => {
  res.json(`remove ${req.params['item']} from cart of ${req.params['username']}`);
};

const removeAll = (req,res) => {

}

module.exports = {
  get,put,remove,removeAll
};
