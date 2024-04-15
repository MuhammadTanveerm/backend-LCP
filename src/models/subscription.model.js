
 const mongoose = require('mongoose')

 const subscriptionSchema = new mongoose.Schema({
    subscribe:{
        type:Schema.Types.ObjectId ,// who subscribe to the channel
        ref: "User"
    },
    channel :{
        type:Schema.Types.ObjectId,
        ref: "User"
    }
    

 },{
    timestamps:true
})

const   subscriptions = mongoose.model("Subscription", subscriptionSchema)
module.exports= subscriptions