const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Review   = require('../../src/models/Review.model');
const Customer = require('../../src/models/Customer.model');
//getting all reviews if a customer
const getAll = (req,res) => {

  let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};

  utility.getOne(Customer,credentials)
  .then(customer => {
    utility.getAll(Review,{PostedBy:customer._id})
    .then(reviews => res.json({status:'True',msg:'Reviews found.',data:reviews}))
    .catch(err => res.json(err));
  })
  .catch(err => res.json(err));
};

module.exports = {getAll};
