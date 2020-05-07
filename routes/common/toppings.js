const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Topping  = require('../../src/models/Toppings.model');
//standard functions for managing toppings/addons
const get = (req,res) => {

  utility.getOne(Topping,{_id:req.params.name})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const getAll = (req,res) => {

  utility.getAll(Topping,{})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const put = (req,res) => {

  let data = {
  _id         : new mongoose.Types.ObjectId(),
  Name        : req.body.topping.Name,
  Price       : req.body.topping.Price
};

utility.getOne(Topping,{Name:req.body.topping.Name}).then(topping=>{
    res.json({status:"False",msg:"Topping with same name already Exists."})
}).catch(err=>{
  utility.put(Topping,data)
  .then(data => res.json({status:"True",msg:"Topping added"}))
  .catch(err => res.json(err));
});

};
  
const patch = (req,res) => {

  utility.patchOne(Topping,{_id:req.params.name},{$set:req.body.topping},{multi:true})
  .then(data => res.json({status:"True",msg:"Item updated"}))
  .catch(err => res.json(err));

};

const remove = (req,res) => {

  utility.removeOne(Topping,{_id:req.params.name})
  .then(data => res.json({status:"True",msg:"Item deleted"}))
  .catch(err => res.json(err));

};

module.exports = {
  getAll,get,put,patch,remove
};
