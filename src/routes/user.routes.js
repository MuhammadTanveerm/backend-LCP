// const Router = require('Router')

const Router = require('express').Router
const { registerUser,
     loginuser,
      logoutuser,
       refreshAccessToken,
        changeCurrentPassword, 
        currentUser, 
        changeUserDetails,
        updateUserAvatar,
        updateUserCoverImage,
        getUserChannelProfile,
        getWatchHistory} = require('../controllers/user.controller.js')
const {verifyJWT} = require('../middlewareas/auth.middleware.js')
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
    router.route('/refres-token').post(refreshAccessToken)

    router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT, currentUser)
router.route("/update-account").patch(verifyJWT, changeUserDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

module.exports= router