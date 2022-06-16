import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    netId: String,
    major: String,
    courseList: Array,
  },
  {
    versionKey: false,
    collection: "Users",
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
