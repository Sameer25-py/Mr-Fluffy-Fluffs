const mongoose = require('mongoose');
const Customer = require('../../src/models/Customer.model');

const remove = (req,res) => {

  try {

    Customer.deleteOne({Username:req.params.username}, (err,customer) => {

      if(err) {
        res.json({status:'False',msg:'Customer not present.'});
      }
      else {
        if(customer.deletedCount) {
          res.json({status:'True',msg:'Customer record deleted.'});
        }
        else {
          res.json({status:'False',msg:'Customer not present'});
        }
      }

    });

  }
  catch(Error) {
    res.json({status:'False',msg:'Internal Server Error.'});
  }

};

const patch = (req,res) => {

  try {

    Customer.updateOne({Username:req.params.username},{$set:req.body.customer},{multi:true}, (err,customer) => {

      if(err) {
        res.json({status:'False',msg:'Customer not present.'});
      }
      else {
        res.json({status:'True',msg:'Customer record updated.'});
      }

    });

  }
  catch(Error) {
    res.json({status:'False',msg:'Internal Server Error.'});
  }

};

const put = (req,res) => {

  try {

    Customer.findOne({Email:req.body.customer.Email}, (err,customer) => {
      if(err) {
        res.json({status:'False',msg:'Internal Database Error.'});
      }
      else {

        if(customer == null) {

          let newCustomer = new Customer({

            _id      : new mongoose.Types.ObjectId(),
            FullName : req.body.customer.FullName,
            Username : req.body.customer.Username,
            PassHash : req.body.customer.PassHash,
            Address  : req.body.customer.Address,
            Email    : req.body.customer.Email,
            MobileNo : req.body.customer.MobileNo

          });

          newCustomer.save((err,customer) => {
            if(err) {
              res.json({status:'False',msg:'Cannot add customer.'});
            }
            else {
              res.json({status:'True',msg:'Customer added.'});
            }
          });

        } else {
          res.json({status:'False',msg:'Customer already present.'});
        }
      }
    });

  }
  catch(Error) {
    res.json({status:'False',msg:'Internal Server Error.'});
  }

};

module.exports = {remove,patch,put};
