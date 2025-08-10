const mongoose=require("mongoose")

const connectDb=async()=>{
    try{
        const connect=await mongoose.connect(process.env.DBI_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log(`✅Mongodb connected:${connect.connection.host}`)

    }
    catch(error){
        console.log("❌Mongodb connection error",error)
        process.exit(1)
    }
}

module.exports=connectDb