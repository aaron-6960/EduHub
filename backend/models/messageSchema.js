import mongoose from "mongoose";
const Schema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
      },
    },
    group: String,
    sender: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageSchema = mongoose.model("messageSchema", Schema);
export default messageSchema;
