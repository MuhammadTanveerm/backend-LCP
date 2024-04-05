const cloudinary = require('cloudinary').v2;
const fs = require('fs')


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_CLOUD_SECRET
});


const uploadOnCloudinary = async (localFile) => {
try {
    if(!localFile) return null
    //upload the file on cloudinary
   const response= await cloudinary.uploader.upload
    (localFile, {
        resource_type: "auto"
    })
    // file has been uploaded  successfully
console.log(`file is uploaded on cloudinary `, response.url)
return response
} catch (error) {
    fs.unlinkSync(localFile)
    // remove the temporary saved file as uploaded operation got  failed
    return null
}
}


// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });


module.exports = uploadOnCloudinary 