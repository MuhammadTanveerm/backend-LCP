const ApiError = require("../utils/apiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require('jsonwebtoken')
const user = require('../models/user.model.js')
exports.verifyJwt = asyncHandler( async(req, res, next) => {

    try {
       const Token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
console.log(Token)
        if(!Token) {
            throw new ApiError(402, "Unauthorized Request")
        }
    const decodeToken = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET)
    const User = await user.findById(decodeToken._id).select("-password -refreshToken")
    
    if(!User){
        //Next Video Discussion about  Frontend
        throw new ApiError(401, "Invalid Access Token")
    }
    req.User= User
    next() 

    } catch (error) {
        throw new  ApiError(401, error.message || "invalid Token access")
    }
}) 