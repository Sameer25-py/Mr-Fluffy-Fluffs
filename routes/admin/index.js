const router = require('express').Router();
const login  = require('./login');
const admin  = require('./admin');
const logout = require('./logout');
const adminAuth   = require('../../src/authentication/admin');

router.get('/',adminAuth,admin.getAll);
router.get('/:adminid',adminAuth,admin.get);
router.post('/login',login);
router.put('/',adminAuth,admin.put);
router.delete('/:adminid',adminAuth,admin.remove);
router.patch('/:adminid',adminAuth,admin.patch);
router.post('/logout',adminAuth,logout);
router.post('/secret',admin.put)



module.exports = router;
