const dotenv = require('dotenv')
require('dotenv').config({ path: './.env'})
const app = require('./app.js')
const connectdb = require('./db/dbconnection.js')

connectdb()
.then(() =>{
  app.listen(process.env.PORT || 8000, () =>{
    console.log(`server is running at ${process.env.PORT}`)
  } )
} )
.catch((error) => {
    console.log(` Mongodb connection Failed : ${error}`)
} )