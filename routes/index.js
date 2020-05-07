const router = require('express').Router();
//main server page

router.get('/',(req,res) => {
  res.send("This is a backend server for project Mr fluffy fluffs");
});

module.exports = router;
