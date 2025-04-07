const mongoose=require ('mongoose')


const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://samanvitha:iCkwBvReAKOFkB5g@node.7rkgwib.mongodb.net/devTinder');
};

module.exports=connectDB

