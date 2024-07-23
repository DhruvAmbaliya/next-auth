import mongoose from "mongoose"

const dbConfig = () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected",()=>{
        console.log("mongoDB connected successfully")
    })

    connection.on("error",(err)=>{
        console.log("error"+ err)
        process.exit();
    })
  } catch (error) {
    console.log("error")
    console.log(error)
  }
}

export default dbConfig;