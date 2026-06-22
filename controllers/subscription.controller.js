import { workflowClient } from "../config/upstash.js"
import Subscription from "../models/subscription.model.js"
import { SERVER_URL } from "../config/env.js"

export const createSubscription = async (req, res, next) => {
  try {
    // 1. Create subscription

    let workFlowRunId=""
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user?.id
    });

    console.log("✅ Subscription created");
    console.log(subscription);

    // 2. Trigger QStash workflow
   
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

      console.log("✅ Workflow triggered:", result);
      workFlowRunId=result?.workflowRunId;
    
    // 3. Response
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


// QStash does this:

// Accepts your request ✔
// Creates a workflow job ✔
// Assigns it a unique ID ✔
// Starts running it in background ✔