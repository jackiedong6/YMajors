import MajorRequirements from "../models/majorRequirements.js";

export default class majorRequirementsHandler {
  static async getMajorRequirements(majorName) {
    try {
      return await MajorRequirements.findOne({ name: majorName });
    } catch (e) {
      console.error(`Unable to post course: ${e}`);
      return { error: e };
    }
  }
}
