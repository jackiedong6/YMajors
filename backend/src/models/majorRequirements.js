import mongoose from "mongoose";

const MajorRequirementsSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
    component_families: Array,
  },
  {
    versionKey: false,
    collection: "MajorRequirements2",
  }
);

const MajorRequirements = mongoose.model(
  "MajorRequirements2",
  MajorRequirementsSchema
);

export default MajorRequirements;
