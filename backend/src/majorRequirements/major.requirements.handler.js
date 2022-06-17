import MajorRequirements from "../models/majorRequirements.js";

/**
 * Class handling API for retrieving majorrequirements from the database
 */
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
