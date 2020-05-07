const mongoose = require('mongoose');
const utility = require('../../src/Utility');
const Customer = require('../../src/models/Customer.model');

//getting a particular user cred (only username and full name)
const get = (req,res) => {

  utility.getOne(Customer,{Username:req.params.userid})
  .then(customer => {

    let public_data = {
      FullName: customer.FullName,
      Username: customer.Username
    };

    res.json({status:'True',msg:'Customer found.',data:public_data});
  })
  .catch(err => res.json(err));
};

module.exports = {get};
