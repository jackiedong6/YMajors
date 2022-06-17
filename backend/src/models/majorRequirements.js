import mongoose from "mongoose";

// MajorRequirements schema defining the structure of a major requirements document
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

// Provides interfact to the database for CRUD operations
const MajorRequirements = mongoose.model(
  "MajorRequirements",
  MajorRequirementsSchema
);

export default MajorRequirements;
