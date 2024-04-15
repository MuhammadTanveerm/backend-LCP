// const Router = require('Router')

const Router = require('express').Router
const { registerUser, loginuser, logoutuser } = require('../controllers/user.controller.js')
// const {verifyJwt} = require('../middlewareas/auth.middleware.js')
const upload = require('../middlewareas/multer.middleware.js')

const router = Router()

router.route('/register').post(
    upload.fields([{
        name:"avatar",
        maxCount:1,
    },
    {
        name:"coverImage",
        maxCount:1
    }]),
    registerUser)

    router.route('/login').post(loginuser)
    //secured route
    // router.route('/logout').post(verifyJwt,  logoutuser)
    router.route('/logout').post(logoutuser)

module.exports= router