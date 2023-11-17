import mongoose from "mongoose"


export const connectDb = ()=> mongoose.connect(process.env.MONGO_URL, {
    dbName: "Api"
})
.then(()=>console.log("Database Conncected"))
.catch((e)=>console.log(e))