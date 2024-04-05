const mongoose = require('mongoose')
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const videoSchema= new mongoose.Schema(
    {
       videoFile:{
        type:String, // cloudinary url
        required: true
       },
       thumnail:{
        type:String, // cloudinary url
        required:true
       },
    title: {
            type:String,
            required:true

        },
        description:{
            type:String, 
            required:true
           },
           duration:{
            type:Number, // cloudinary url
            required:true
           },
           views:{
            type: Number, // cloudinary url
            default:0
           },
           isPublished:{
            type:Boolean, // cloudinary url
        defualt:true
           },
           owner: {
            type: Schema.Types.ObjectId,
            ref:"User"
           }
},
{
    timestamps:true,   
}
)

videoSchema.plugin(aggregatePaginate);
const Video = mongoose.model("Video", videoSchema)
module.exports = Video