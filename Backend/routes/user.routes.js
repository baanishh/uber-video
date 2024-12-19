const express=require('express')
const router=express.Router()
const {body}=require('express-validator')
const userController=require('../controllers/user.controller')
const authMiddleware=require('../middlewares/auth.middleware')

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

//profile-user
router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

//logout-user
router.post('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports=router