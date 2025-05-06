const express = require("express");
const User = require("../models/user.js");
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const requestRouter = express.Router();

//status can either be ignore or interested-->you can't let any other values for status

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
     
      
      const fromUserId = req.user._id; //one who is logged in is sending the connection request
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      
      

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type:" + status });
      }

      /*
//moved this check to schema level
    if(toUserId.toString()===fromUserId.toString()){
      return res.status(400).send({message:"Cannot send the connection request to yourself"})
    }
      */

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not found" });
      }
      //IF there is an existing connectionRequest

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection request already exists!!" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName + "  " + status + "  " + toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR" + error.message);
    }
  }
);
//existing connection interested state alli ide andre, matra accept or reject madak agadu
//ond sala ignore maddre matte request kalsak agadilla
//yarara request kalsdaga, reciever ig ad barbeku, avn adna click maddaga, i url open agatte.. url alli status and requestId iratte??

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res, next) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      //validating the status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "status not allowed" });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request does not exist" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (error) {
      res.status(400).send("ERROR :" + error.message);
    }
  }
);
module.exports = requestRouter;
