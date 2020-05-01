const mongoose = require('mongoose');
const utility  = require('../../src/Utility');
const Cart     = require('../../src/models/Cart.model');

const get = (req,res) => {

let credentials = req.session.Email ? {Email:req.session.Email,PassHash:req.session.PassHash} : {Username:req.session.Username,PassHash:req.session.PassHash};

  utility.getOne(Cart,credentials)
  .then(cart => res.json({status:'True',msg:'Cart found.',data:cart}))
  .catch(err => res.json(err));

};

const put = (req,res) => {
  res.json({status:'False',msg:'In development.'});
};

const remove = (req,res) => {
  res.json(`remove ${req.params['item']} from cart of ${req.params['username']}`);
};

const removeAll = (req,res) => {

}

module.exports = {
  get,put,remove,removeAll
};
