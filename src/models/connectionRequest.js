const mongoose=require('mongoose')

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true

    },
    status:{
        type:String,
        require:true,

        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
},{
    timestamps:true,
   
})
//because we are querying on both the Ids together while creating a connection request, to optimize it we've done this
connectionRequestSchema.index({fromUserId:1,toUserId:1})

//prati sala save event agakku munche, ee function run agatte
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;

    //Check if the fromUserId is same as toUserId

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error(": Cannot send connection request to yourself!!")
    }
    //next because this is a middleware
    next();
})

const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionRequestSchema)
module.exports=ConnectionRequest