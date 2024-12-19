const express=require('express')
const router=express.Router()
const {body}=require('express-validator')
const userController=require('../controllers/user.controller')

//register-user
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage("First name must be at lest 3 character long"),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
],
userController.registerUser
)

//login-user
router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage('password must be at least 6 character long')
],
userController.loginUser
)

module.exports=router