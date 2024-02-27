import mongoose from "mongoose"

const connectToDb = async()=>{
  try{
const connection= await mongoose.connect("mongodb://127.0.0.1:27017/", { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions)
if (connection){
  console.log("Connected to database")
}
  }catch(error){
console.log(error)
  }
}

export default connectToDb