const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName age gender photoUrl about skills";

//getting  all the pending connection requests for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    //returns an array of connection requests
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    // .populate("fromUserId", ["firstName", "lastName"]);

    res.json({ message: "Data fetched successfully", connectionRequests });
  } catch (error) {
    res.statusCode(400).send("ERROR :" + error.message);
  }
});
//getting all the connection requests related to user, with accepted state
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,

          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequests.map((row) =>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
            return row.toUserId
        }
        return row.fromUserId
    });
    res.json({ message: "YouR accepted connection requests are", data });
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});
userRouter.get('/feed',userAuth,async (req,res)=>{
    try{
        
       
        const loggedInUser=req.user

        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50?50:limit
        const skip=(page-1)*limit;
        
        //find all the connection requests  either the user have sent or recieved
        const connectionRequests=await  ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId")
        const hideUsersFromFeed=new Set();
        connectionRequests.forEach(req=>{
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        
        const users=await User.find({
        $and:[   { _id:{$nin:Array.from(hideUsersFromFeed)}},
            {_id:{$ne:loggedInUser._id}}
        ],
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        
        res.send(users)
    }
    catch(error){
        res.status(400).json({message:error.message})

    }
})

module.exports = userRouter;


//FOR THE FEED API
 //user should see all the cards except
        //0.his own card
        //1.his connections already accepted
        //3.ignored people
        //4.already sent the connection request