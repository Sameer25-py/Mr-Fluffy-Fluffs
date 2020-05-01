const router = require('express').Router();

const login  = require('./login');
const logout = require('./logout');
const cart   = require('./cart');
const customs  = require('./customs');
const user   = require('./user');
const reviews = require('./reviews');
const userAuth   = require('../../src/authentication/user');
const adminAuth = require('../../src/authentication/admin');



router.get('/',userAuth,user.get);
router.get('/cart',userAuth,cart.get);
router.get('/reviews',userAuth,reviews.getAll);
router.get('/customs',userAuth,customs.getUserCustoms);

router.post('/login', login);
router.post('/verify',user.verify);
router.post('/logout',userAuth,logout);


router.put('/',             user.put);
router.put('/cart',userAuth,cart.put);
router.put('/customs',userAuth, customs.put);

router.patch('/', userAuth ,user.patch);

router.delete('/',userAuth,user.remove);
router.delete('/cart/:itemid',userAuth,cart.remove);
router.delete('/cart',userAuth,cart.removeAll);
router.delete('/customs/:customid',userAuth,customs.remove);
router.delete('/customs',userAuth,customs.removeAll);



module.exports = router;
