const asyncHandler = require('../utils/asyncHandler.js')



exports.registerUser =  asyncHandler ( async ( req, res, next) => {
  await  res.status(200).json({
        message: "Product Created ",
        
      });
})