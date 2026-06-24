import AppError from "../utils/AppError.js";

const errorMiddleWare = (err,req,res,next)=>{
   
        let error = {...err };

        error.message= err.message

        if(err.name === 'CastError'){
        error = new AppError("Resource not found",404,"CAST_ERROR")
        }

        if(err.code === 11000){
           error =  new AppError("Duplicate field value entered",400,"DUPLICATE_KEY")
        }

        if(err.name === "validationError"){
            const message = Object.values(err.errors).map(val =>val.message)
           error =  new AppError(message,400,"VALIDATION_ERROR")
        }
        
         res.status(error.statusCode || 500).json({success:false,error:error.message || "Server Error",errorcode:error.errorCode})
   
  
}
export default errorMiddleWare;