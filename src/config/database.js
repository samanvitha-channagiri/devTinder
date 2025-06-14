const mongoose=require ('mongoose')


const connectDB=async()=>{
   try{
     await mongoose.connect(process.env.MONGO_URI);
   }catch(error){
    console.log("db connection failed",error.message);
    
   }
     
   
   
    
};

module.exports=connectDB

