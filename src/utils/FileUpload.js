const cloudinary = require('cloudinary').v2;
const fs = require('fs')
// const dotenv = require('dotenv')

          
// cloudinary.config({ 
//   cloud_name: 'dzyjit5iy', 
//   api_key: '538423668551343', 
//   api_secret: 'rBWeLWBsW1tHWAIb3--Tl6ALmRU' 
// // });
// import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dzyjit5iy', 
  api_key: '538423668551343', 
  api_secret: 'rBWeLWBsW1tHWAIb3--Tl6ALmRU' 
});

exports.uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
       console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}





// module.exports = {uploadOnCloudinary}