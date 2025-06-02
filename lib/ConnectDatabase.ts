import mongoose from "mongoose";

const DATABASE_URL=process.env.MONGO_URI;




if(!DATABASE_URL){
 throw new Error("");
}