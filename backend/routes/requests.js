const express = require("express");
const router = express.Router();

const Work = require("../models/work.model");
const Hirer = require("../models/hirer.model");
const Worker = require("../models/worker.model");
const WorkRequest = require("../models/workRequest.model");

router.get("/friend_request/:workerId/:workId/send", async (req, res) => {
  try {
    const worker = await Worker.find({ _id: req.params.workerId });
    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }

    // if (req.userId == req.params.userId) {
    //   return res
    //     .status(400)
    //     .json({ error: "You cannot send friend request to yourself" });
    // }

    // if (user.friends.includes(req.userId)) {
    //   return res.status(400).json({ error: "Already Friends" });
    // }

    const workRequest = await WorkRequest.findOne({
      sender: req.body.hirerId,
      receiver: req.params.workerId,
    });

    if (workRequest) {
      return res.status(400).json({ error: "Work Request already send" });
    }

    const newWorkRequest = new WorkRequest({
      sender: req.body.hirerId,
      receiver: req.params.workerId,
      work: req.params.workId,
    });

    const save = await newWorkRequest.save();

    const receivingWorker = await WorkRequest.findById(save.id).populate(
      "receiver"
    );

    res
      .status(200)
      .json({ message: "Work Request Sended", worker: receivingWorker });

    const sender = await WorkRequest.findById(save.id).populate("sender");
    // let notification = await CreateNotification({
    //   worker: req.params.workerId,
    //   body: `${sender.sender.name} has send you friend request`,
    // });
    const senderData = {
      id: sender.id,
      // hirer: FilterUserData(sender.sender),
    };

    // if (worker.socketId) {
    //   req.io
    //     .to(worker.socketId)
    //     .emit("friend-request-status", { sender: senderData });
    //   req.io.to(worker.socketId).emit("Notification", { data: notification });
    // }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/friend_request/:requestId/accept", async (req, res) => {
  try {
    const workRequest = await WorkRequest.findOne({
      _id: req.params.requestId,
    });
    if (!workRequest) {
      return res
        .status(404)
        .json({ error: "Request already accepted or not sended yet" });
    }

    const sender = await Hirer.findById(workRequest.sender);
    // if (sender.friends.includes(friendsRequest.receiver)) {
    //   return res.status(400).json({ error: "already in your friend lists" });
    // }
    // sender.friends.push(req.userId);
    // await sender.save();

    // const currentUser = await User.findById(req.userId);
    // if (currentUser.friends.includes(friendsRequest.sender)) {
    //   return res.status(400).json({ error: "already  friend " });
    // }
    // currentUser.friends.push(friendsRequest.sender);
    // await currentUser.save();

    // const chunkData = FilterUserData(sender);

    await WorkRequest.deleteOne({ _id: req.params.requestId });
    res.status(200).json({ message: "Work Request Accepted", hirer: sender });

    // let notification = await CreateNotification({
    //   user: sender.id,
    //   body: `${currentUser.name} has accepted your friend request`,
    // });
    // if (sender.socketId) {
    //   let currentUserData = FilterUserData(currentUser);
    //   req.io.to(sender.socketId).emit("friend-request-accept-status", {
    //     user: currentUserData,
    //     request_id: req.params.requestId,
    //   });
    //   req.io.to(sender.socketId).emit("Notification", { data: notification });
    // }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/friend_request/:requestId/decline", async (req, res) => {
  try {
    const workRequest = await WorkRequest.findOne({
      _id: req.params.requestId,
    }).populate("sender");
    if (!workRequest) {
      return res
        .status(404)
        .json({ error: "Request already declined or not sended yet" });
    }
    await WorkRequest.deleteOne({ _id: req.params.requestId });

    res.status(200).json({ message: "Work Request Declined" });
    // if (friendsRequest.sender.socketId) {
    //   req.io
    //     .to(friendsRequest.sender.socketId)
    //     .emit("received-friend-request-decline", {
    //       requestId: req.params.requestId,
    //     });
    // }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
