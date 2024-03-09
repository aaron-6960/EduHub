import express from "express";
import messageSchema from "../models/messageSchema.js";

const router = express.Router();

router.post("/addMsg", async (req, res) => {
  const { msg, grp, from } = req.body;
  const data = await messageSchema.create({
    message: { text: msg },
    group: grp,
    sender: from,
  });
});

router.post("/readMsg", async (req, res) => {
  try {
    const { grp } = req.body;
    const messages = await messageSchema
      .find({ group: { $all: grp } })
      .sort({ updatedAt: 1 });
    const projectedMsg = messages.map((msg) => {
      return {
        sender: msg.sender,
        content: msg.message.text,
      };
    });
    res.send(projectedMsg);
  } catch {}
});

export default router;
