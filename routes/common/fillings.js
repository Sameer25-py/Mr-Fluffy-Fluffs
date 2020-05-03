const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Filling  = require('../../src/models/Fillings.model');

const get = (req,res) => {

  utility.getOne(Filling,{Name:req.params.name})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const getAll = (req,res) => {

  utility.getAll(Filling,{})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

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

const patch = (req,res) => {

  utility.patchOne(Filling,{Name:req.params.name},{$set:req.body.filling},{multi:true})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const remove = (req,res) => {

  utility.removeOne(Filling,{Name:req.params.name})
  .then(data => res.json(data))
  .catch(err => res.json(err))

};


module.exports = {
  getAll,get,put,patch,remove
};
