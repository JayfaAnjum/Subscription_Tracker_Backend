import User from "../models/user.model.js"
import AppError from "../utils/AppError.js"


export const getUserProfile  = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id).select("-password")
        if(!user){
            throw new AppError("User not found",404,"USER_NOT_FOUND")
        }

        res.status(200).json({
            success:true,
            message:"User profile retrieved successfully",
            user:user
        })

    }
    catch(error){
     next(error)
    }
}

export const deleteUser = async(req,res,next)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            throw new AppError("User not found",404,"USER_NOT_FOUND")
        }

        res.status(200).json({
            success:true,
            message:"user has been deleted successfully",
            deletedUser:user
        })

    }catch(error){
        next(error)

    }

}

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError("User not found",404,"USER_NOT_FOUND");
    }

    res.status(200).json({
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
