const asyncHandler = require("../utils/asyncHandler.js");
const user = require("../models/user.model.js");
const ApiError = require("../utils/apiError.js");
// const {uploadOnCloudinary}  = require('../utils/FileUpload.js')

const ApiResponse = require("../utils/ApiResponse.js");
const { uploadOnCloudinary } = require("../utils/FileUpload.js");
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
  return next(new  ApiError("Fill all fields", 401));
    // throw new ApiError(400, 'Please fill in all fields');
  
  
}

  const existingUser = await user.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "UserName and Email Already exit")

  }
  //  const coverImageLocalPath =  req.files?.coverImage[0]?.path
  
  const avatarLocalPath = req.files?.avatar[0]?.path;
 
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
}


  const avatar = await uploadOnCloudinary(avatarLocalPath);
 const coverImage= await uploadOnCloudinary(coverImageLocalPath)
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
