const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Filling  = require('../../src/models/Fillings.model');

//getting particular filling
const get = (req,res) => {

  utility.getOne(Filling,{Name:req.params.name})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};
//getting all the fillings
const getAll = (req,res) => {

  utility.getAll(Filling,{})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};
//puttting new filling
const put = (req,res) => {

  let data = {
  _id   : new mongoose.Types.ObjectId(),
  Name  : req.body.filling.Name,
  Price : req.body.filling.Price
};

  utility.put(Filling,data)
  .then(data => res.json(data))
  .catch(err => res.json(err));

};
//patching existing filling
const patch = (req,res) => {

  utility.patchOne(Filling,{Name:req.params.name},{$set:req.body.filling},{multi:true})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};
//remove fillign
const remove = (req,res) => {

  utility.removeOne(Filling,{Name:req.params.name})
  .then(data => res.json(data))
  .catch(err => res.json(err))

};


module.exports = {
  getAll,get,put,patch,remove
};
