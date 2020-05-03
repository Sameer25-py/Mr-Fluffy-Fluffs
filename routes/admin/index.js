const router = require('express').Router();
const login  = require('./login');
const admin  = require('./admin');
const logout = require('./logout');
const adminAuth   = require('../../src/authentication/admin');
const exceptAuth  =  require('../../src/authentication/exception2')


router.get('/',adminAuth,admin.getAll);
router.get('/:adminid',adminAuth,admin.get);

router.put('/',adminAuth,admin.put);

router.patch('/verify-forget',exceptAuth,admin.verify_forget)

router.delete('/:adminid',adminAuth,admin.remove);
router.patch('/:adminid',adminAuth,admin.patch);

router.post('/login',login);
router.post('/logout',adminAuth,logout);
router.post('/secret',admin.put);

router.post('/forget',admin.forget_pass);




module.exports = router;
