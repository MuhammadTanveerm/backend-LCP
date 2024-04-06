// const Router = require('Router')

const Router = require('express').Router
const { registerUser } = require('../controllers/user.controller.js')
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
module.exports= router