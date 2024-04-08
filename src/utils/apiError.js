class ApiError extends Error {
    constructor(
        statuscode, 
        message="something went Wrong",
        errors= [ ],
        stack=""
        ){
super(message )
this.statuscode = statuscode,
this.data=null,
this.message=message,
this.data=false,
this.errors= errors

if(stack)  {
    this.stack= stack
} else {
Error.captureStackTrace(this, this.constructor)
}
    }
}

module.exports = ApiError