import AppError from "../utils/AppError.js";

const errorMiddleWare = (err,req,res,next)=>{
   
        let error = {...err };

        error.message= err.message

        if(err.name === 'CastError'){
        error = new AppError("Resource not found",404,"CAST_ERROR")
        }

        if(err.code === 11000){
           error =  new AppError("Duplicate field value entered",409,"DUPLICATE_KEY")
        }

        if(err.name === "ValidationError"){
            const message = Object.values(err.errors).map(val =>val.message)
           error =  new AppError(message,400,"VALIDATION_ERROR")
        }

        if (err.name === "TokenExpiredError") {
          error = new AppError("Session expired, please login again", 401, "TOKEN_EXPIRED")
         }
        
         res.status(error.statusCode || 500).json({success:false,error:error.message || "Server Error",errorcode:error.errorCode})
   
  
}
export default errorMiddleWare;