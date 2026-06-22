import mongoose from 'mongoose'
import {MONGODB_URI,NODE_ENV} from '../config/env.js'

if(!MONGODB_URI){
    throw new Error(`Please define the MONGODB_URI environment inside ${NODE_ENV}`)
}

const connectToDatabase = async ()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log(`Database connected successfully,${MONGODB_URI}`)

    }catch(error){
    console.log("error message is",error.message)
    }

}
export default connectToDatabase;