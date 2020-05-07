const session = require('express-session');
//logging out user
const logout = (req,res) => {
  //destroying session
  req.session.destroy();
  res.json({status:'True',msg:'User logged out.'});

};

module.exports = logout;
