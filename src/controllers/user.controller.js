const asyncHandler = require("../utils/asyncHandler.js");
const user = require("../models/user.model.js");
const ApiError = require("../utils/apiError.js");
const jwt = require('jsonwebtoken')
// const {uploadOnCloudinary}  = require('../utils/FileUpload.js')
const ApiResponse = require("../utils/ApiResponse.js");
const { uploadOnCloudinary } = require("../utils/FileUpload.js");


const generateAccessAndRefereshTokens = async (userId) => {
  // console.log(`user id ${userId}`)
  try{
    

const User = await user.findById(userId)
// console.log(`user id ${User}`)
const  accessToken = User.generateAccessToken()
const refreshToken = User.generateRefreshToken()

// console.log(accessToken)
User.refreshToken = refreshToken

await User.save({ validateBeforeSave: false })
return {accessToken, refreshToken}
  }
  catch(error) {
throw new ApiError(500, `Something went wrong while generating access and refresh Tokens`)
  }
}
exports.registerUser = asyncHandler(async (req, res, next) => {
  // get user details from frontend
  // validations - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary , avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  const { fullname, email, username, password } = req.body;


 if (!fullname ||!email ||!password ||!username )  {
  return next(new  ApiError( 401, "Fill all fields"));
    // throw new ApiError(400, 'Please fill in all fields');
  
  
}

  const existingUser = await user.findOne({
    $or: [{ password }, { email }],
  });
  if (existingUser) {
    throw new ApiError(409, "password and Email Already exit")
  }
  
  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(avatarLocalPath)
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
}
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
  }

 

  const avatar = await  uploadOnCloudinary (avatarLocalPath);
 const coverImage= await uploadOnCloudinary(coverImageLocalPath)
 console.log(avatar)
  if (!avatar) {
    throw new ApiError(400, "Avatar is Requiredfdasdkj")
  }

  const User = await user.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const CreatedUser = await user.findById(User._id).select(
    " -password -refreshToken "
  );
  if (!CreatedUser) {
    throw new (500, "something went wronge While  registering the User")

  }
  return res.status(201).json(
    new ApiResponse(200, CreatedUser, " user Registered Successfully ")

  );
});
// Login controller
exports.loginuser = asyncHandler(async (req, res, next) => {
  // req body
  // username and Email
  //find User
  //check password
  //access and refresh token
  // send cookies
const {username, password, email}= req.body
if(!password && !email){
  throw new ApiError(400, "email and Password are Required")
}
const User = await user.findOne({
  $or: [{username}, {email}]
})

if(!User){
  throw new ApiError(401, "invalid Username and Password")
}
 const isPasswordValid = await User.isPasswordCorrect(password)
if(!isPasswordValid) {
  throw new ApiError(404, 'Password not Correct')
}
console.log(isPasswordValid)
const {accessToken, refreshToken} = await  generateAccessAndRefereshTokens(User._id)
 const loggedInUser = await user.findById(User._id).select("-password -refreshToken")

const options ={
  httpOnly:true,
  secure:true
}
res.status(200)
.cookie("accessToken", accessToken , options)
.cookie("refreshToken", refreshToken, options)
.json(
  new ApiResponse(
    200,
    {
      // User: loggedInUser, accessToken, refreshToken,
      user: loggedInUser, accessToken, refreshToken,
    },
    "User logged Sucessfully"
  )
  
)

} )

// LogOut functions
exports.logoutuser = asyncHandler( async(req, res, next ) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  }); 
})


// refresh Access token
exports.refreshAccessToken = asyncHandler (async (req, res, next) => {  
       const incomingRefreshToken= req.cookies.refreshToken || req.body.refreshToken

       if(!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
       }

      const decodeToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
       )
const  User= await user.findById(decodeToken?._id)
if(!User) {
  throw new ApiError(401, "Invalid refresh Token  ")
}


try{
  if(!incomingRefreshToken !== User?.id) {
    throw new ApiError(401, " Token is Expired or Invalid")
  }
  const options = {
    httpOnly : true,
    secure : true
  }
    const { accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(User.id)
  return res
  .status(200)
  .cookie("accessToken", accessToken,  options)
  .cookie("refreshToken", newRefreshToken, options)
  .json(
    new ApiError(
      200, 
      {accessToken, refreshToken: newRefreshToken},
      "Access token Refreshed  "
    )
  
    
  )
}
catch (error){
throw new ApiError(401, "error.message || Invalid refresh token ")
}


} )