import { workflowClient } from "../config/upstash.js"
import Subscription from "../models/subscription.model.js"
import { SERVER_URL } from "../config/env.js"

export const createSubscription = async (req, res, next) => {
  try {
   
    let workFlowRunId=""
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user?.id
    });

    console.log(" Subscription created");
    console.log(subscription);

    
      const result = await workflowClient.trigger({
         url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        body: ({
          subscriptionId: subscription._id
        }),
        headers: {
          "content-type": "application/json"
        },
        retries: 0
      });

      console.log("Workflow triggered:", result);
      workFlowRunId=result?.workflowRunId;
    
    
    return res.status(201).json({
      success: true,
      data: subscription,
      workflowRunId: workFlowRunId
    });

  } catch (error) {
    console.error("CREATE SUBSCRIPTION ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getUserSubscripitions = async(req,res,next)=>{

    try{
        if(req.user.id !== req.params.id){
            const error = new Error("You are not the owner of this account");
            error.status = 401
            throw error;
        }

        const subsrciptions = await Subscription.find({user:req.params.id})

        res.status(200).json({success:true,data:subsrciptions})


    }catch(error){
        next(error)
    }
}

export const getUserSingleSubscription = async(req,res,next)=>{
  try{
    const subscription = await Subscription.findById(req.params.id)
    if(!subscription){
      const error = new Error("Subscription not found")
      error.status=400
      throw error;
    }

    res.status(200).json({
      success:true,
      Subscription:subscription
    })

  }
  catch(error){
   next(error)
  }
}

export  const deleteUserSingleSubscription =async(req,res,next)=>{
  try{
    const deleteedSubscription = await Subscription.findByIdAndDelete(req.params.id)
    if(!deleteedSubscription){
       const error = new Error("Subscription not found")
      error.status=400
      throw error;
    }

    res.status(200).json({
      success:true,
      message:"Subscription was successfully deleted"
    })

  }
  catch(error){

  }
}





