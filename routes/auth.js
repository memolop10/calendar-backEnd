/*
    User Routes / auth 
    host + /api/auth 
 */


const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const { validatedFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

// rutas
router.post( 
  '/new', 
  [//middleware
    check('name','name is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','password should be 6 characteres').isLength({ min: 6 }),
    validatedFields
  ], 
  createUser )

router.post( 
  '/', 
  [
    check('email','email is required').isEmail(),
    check('password','password should be 6 characteres').isLength({ min: 6 }),
    validatedFields
  ] ,
  userLogin 
)

router.get( '/renew', validateJWT, revalidateToken )

module.exports = router;