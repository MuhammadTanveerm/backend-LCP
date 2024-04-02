require('dotenv').config({ path: './env'})


const mongoose = require('mongoose')

const connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://newuser:newuser@cluster0.rnik6eh.mongodb.net/backend-lcb`);
        console.log(`\nMongo db connected !! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Not connected`, error);
        process.exit(1);
    }
}

module.exports= connectdb;