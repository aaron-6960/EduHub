import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  group: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
});

const Grp = mongoose.model("Grp", Schema);
export default Grp;
