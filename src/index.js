require('dotenv').config({ path: './env'})
const connectdb = require('./db/dbconnection.js')

connectdb()