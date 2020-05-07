const mongoose = require('mongoose');
const utility = require('../../src/Utility');
const Custom = require('../../src/models/Custom.model');
const Review   = require('../../src/models/Review.model');
//get all custom pancakes
const getCustoms = (req,res) => {

  utility.getAll(Custom,{})
  .then(customs => res.json({status:'True',msg:'Custom cakes found.',data:customs}))
  .catch(err => res.json(err));

};
//any custom pancakes of a particualar customer
const getCustom = (req,res) => {

  utility.getOne(Custom,{_id:req.params.customid})
  .then(custom => res.json({status:'True',msg:'Custom cake found.',data:custom}))
  .catch(err => res.json(err));

};
//get reviews for the pancakes of a particualr customer
const getCustomReviews = (req,res) => {

  utility.getAll(Review,{Pancake:req.params.customid})
  .then(reviews => res.json({status:'True',msg:'Reviews of custom cake found.',data:reviews}))
  .catch(err => res.json(err));

};

module.exports = {getCustom,getCustoms,getCustomReviews};
