class AppError extends Error{

    constructor(message,statusCode=500,errorCode = "Error"){
        super(message)
        this.statusCode=statusCode;
        this.errorCode=errorCode;
        this.isOperational = true
        this.stack
        
    }
}
export default AppError;