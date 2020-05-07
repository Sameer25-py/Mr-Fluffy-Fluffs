//router for routing within user routes
const router = require('express').Router();

const login  = require('./login');
const logout = require('./logout');
const cart   = require('./cart');
const customs  = require('./customs');
const user   = require('./user');
const reviews = require('./reviews');
const userAuth   = require('../../src/authentication/user');
const adminAuth = require('../../src/authentication/admin');
const exceptAuth = require('../../src/authentication/exception')

//all the routes related to user application
router.get('/',userAuth,user.get);
router.get('/cart',userAuth,cart.get);
router.get('/reviews',userAuth,reviews.getAll);
router.get('/customs',userAuth,customs.getUserCustoms);
router.get('/cart/history',userAuth,cart.getAll)
//router for ayan
router.get('/details',userAuth,user.details)

router.post('/login', login);
router.post('/verify',user.verify);
router.post('/logout',userAuth,logout);
router.post('/resend',user.resend);
router.post('/forget',user.forget_pass);

router.put('/',             user.put);
router.put('/cart',cart.put);	
router.put('/customs',userAuth, customs.put);

router.patch('/', userAuth ,user.patch);
router.patch('/verify-forget',exceptAuth,user.verify_forget);

router.delete('/',userAuth,user.remove);
router.delete('/cart/:itemid',userAuth,cart.remove);
//router.delete('/cart',userAuth,cart.removeAll);
router.delete('/customs/:customid',userAuth,customs.remove);
router.delete('/customs',userAuth,customs.removeAll);



module.exports = router;
