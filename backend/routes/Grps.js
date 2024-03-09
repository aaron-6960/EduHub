import express from "express";
import Grp from "../models/groupsSchema.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { grp, user } = req.body;
  console.log(user);
  if (!grp) {
    return res.status(400).send("Enter Groupname");
  } else {
    const groupDB = await Grp.findOne({ group: grp });
    if (groupDB) return res.status(400).send("Group already exists");
    try {
      const userDB = await User.findOne({ username: user });
      if (!userDB) {
        return res.status(404).send("User not found");
      }

      if (userDB.chatgrps.includes(grp)) {
        return res.status(400).send("Group already exists for this user");
      }

      userDB.chatgrps.push(grp);
      await userDB.save();

      const newGroup = new Grp({ group: grp });
      await newGroup.save();
      res.status(201).json(newGroup);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

router.post("/join", async (req, res) => {
  const { grp, user } = req.body;
  if (!grp) {
    return res.status(400).send("Enter Groupname");
  } else {
    const groupDB = await Grp.findOne({ group: grp });
    if (!groupDB) return res.status(400).send("Group not found");
    try {
      const userDB = await User.findOne({ username: user });
      console.log(userDB)
      if (!userDB) {
        return res.status(404).send("User not found");
      }

      if (userDB.chatgrps.includes(grp)) {
        return res.status(400).send("Group already exists for this user");
      }

      userDB.chatgrps.push(grp);
      console.log(userDB)
      await userDB.save();

      res.status(201).send(grp);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

export default router;
