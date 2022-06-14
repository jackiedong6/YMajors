import MajorRequirements from "../models/majorRequirements.js";

export default class majorRequirementsHandler {
  static async getMajorRequirements({ filters = null } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      }
    }
    let cursor;

    try {
      cursor = await MajorRequirements.findOne(query);
      return cursor;
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { majorRequirements: [] };
    }
  }
}
