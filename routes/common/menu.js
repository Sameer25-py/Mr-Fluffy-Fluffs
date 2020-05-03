const mongoose = require('mongoose');
const Pancake  = require('../../src/models/Pancake.model');
const utility  = require('../../src/Utility');


const get = (req,res) => {

  utility.getOne(Pancake,{_id:req.params.item})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const getAll = (req,res) => {

  utility.getAll(Pancake,{})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const put = (req,res) => {

  let data = {
  _id         : new mongoose.Types.ObjectId(),
  Name        : req.body.pancake.Name,
  Description : req.body.pancake.Description,
  Price       : req.body.pancake.Price
};

utility.getOne(Pancake,{Name:req.body.pancake.Name}).then(cake=>{
    res.json({status:"False",msg:"Pancake with same name already Exists."})
}).catch(err=>{
  utility.put(Pancake,data)
  .then(data => res.json({status:"True",msg:"Pancake added"}))
  .catch(err => res.json(err));
});
};

const patch = (req,res) => {

  utility.patchOne(Pancake,{Name:req.params.item},{$set:req.body.pancake},{multi:true})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const remove = (req,res) => {

  utility.removeOne(Pancake,{Name:req.params.item})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};


module.exports = {
  getAll,get,put,patch,remove
};
