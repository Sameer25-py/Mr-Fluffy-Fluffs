const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Cart     = require('../../src/models/Cart.model');
const Customer = require('../../src/models/Customer.model');
const Order    = require('../../src/models/Order.model');
const Pancake  = require('../../src/models/Pancake.model');
const Topping  = require('../../src/models/Toppings.model');



const get = (req,res) => {

let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};

  utility.getOne(Cart,credentials)
  .then(cart => res.json({status:'True',msg:'Cart found.',data:cart}))
  .catch(err => res.json(err));

};

const put = (req,res) => {
	cart = req.body.cart.items;
	let data={
		_id         : new mongoose.Types.ObjectId(),
		Subtotal    : req.body.cart.Subtotal,
		Deliveryfee : req.body.cart.Deliveryfee,
		Date        : new Date().toISOString().slice(0,10),
		Total       : req.body.cart.Subtotal + req.body.cart.Deliveryfee,
		Pancakes    : req.body.cart.Pancakes,
		Status      : "Pending"
	};
	utility.put(Cart,data).then(success=>{
		res.json({status:"True",msg:"Order has been Placed."})
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
