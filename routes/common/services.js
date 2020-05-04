const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Service  = require('../../src/models/Service.model');

const get = (req,res) => {

  utility.getOne(Service,{_id:req.params.name})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const getAll = (req,res) => {

  utility.getAll(Service,{})
  .then(data => res.json(data))
  .catch(err => res.json(err));

};

const put = (req,res) => {

  let data =   {
    _id     : new mongoose.Types.ObjectId(),
    Name    : req.body.service.Name,
    Status  : req.body.service.Status
    }

    utility.put(Service,data)
    .then(data => res.json({status:"True",msg:"Service added."}))
    .catch(err => res.json(err));

};

const patch = (req,res) => {

  utility.patchOne(Service,{_id:req.params.name},{$set:req.body.service},{multi:true})
  .then(data => res.json({status:"True",msg:"Service updated"}))
  .catch(err => res.json(err)); 
};

const remove = (req,res) => {

  utility.removeOne(Service,{_id:req.params.name})
  .then(data => res.json({status:"True",msg:"Service removed"}))
  .catch(err => res.json(err));

};


module.exports = {
  getAll,get,put,patch,remove
};
