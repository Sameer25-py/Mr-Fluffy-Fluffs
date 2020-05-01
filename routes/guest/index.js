const router = require('express').Router();
const {uuid} = require('uuidv4');

router.post('/login', (req,res) => {
  if(req.session.GuestId) {
    res.json({status:'False',msg:'Guest already logged in.',GuestId:req.session.GuestId});
  }
  else {

    if((req.session.Username || req.session.Email) && req.session.PassHash) {
      res.json({status:'False',msg:'User already logged in. Cannot login as a guest now.'});
      return;
    }

    req.session.GuestId = uuid();
    res.json({status:'True',msg:`Guest logged in. Guest ID:${req.session.GuestId}`,GuestId:req.session.GuestId});
  }

});

router.post('/logout', (req,res) => {
  if(req.session.GuestId) {
    req.session.destroy();
    res.json({status:'True',msg:'Guest logged out.'});
  }
  else {
    res.json({status:'False',msg:'Guest not logged in.'});
  }
});

module.exports = router;
