import mongoose from "mongoose";

const MajorRequirementsSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
    component_families: Array,
  },
  {
    versionKey: false,
    collection: "MajorRequirements",
  }
);

const MajorRequirements = mongoose.model(
  "MajorRequirements",
  MajorRequirementsSchema
);

export default MajorRequirements;
