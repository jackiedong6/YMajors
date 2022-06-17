import mongoose from "mongoose";

// UserSchema defining the document structure of a user
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

// Creates the interface for CRUD operations
const User = mongoose.model("User", UserSchema);

export default User;
