import { EMAIL_PASSWORD } from "./env.js";
import nodemailer from "nodemailer"

export const accountEmail = 'jayfamubarak@gmail.com';
export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'jayfamubarak@gmail.com',
        pass:EMAIL_PASSWORD
    }

})