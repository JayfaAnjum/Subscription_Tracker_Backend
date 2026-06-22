import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:8,
        maxLength:100
    },
    price:{
        type:Number,
        required:true,
        min:[0,"price must be greater than 0"],
    },
    currency:{
        type:String,
        enum:["USD","EUR","GBP"],
        default:"USD"
    },
    frequency:{
        type:String,
        enum:["daily","weekly","monthly","yearly"]
    },
    category:{
        type:String,
        enum:["sports","news","entertainment","lifestyle","technology","finance","politics","others"],
        required:true
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value) => value <= new Date(),
            message: "Start date must be in the past"

        }

    },

    renewaldate:{
        type:Date,
        validate:{
            validator:function(value) {
                return value >= new Date();
           
            },
          message: "Renewal date must be after the start date"
        }

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }

},{timestamps:true});


subscriptionSchema.pre("save", async function () {
  if (!this.renewaldate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365
    };

    this.renewaldate = new Date(this.startDate);
    this.renewaldate.setDate(
      this.renewaldate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.renewaldate < new Date()) {
    this.status = "expired";
  }
});
const Subscription = mongoose.model("Subscription",subscriptionSchema)
export default Subscription;

