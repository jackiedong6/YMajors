import express from "express";
import res from "express/lib/response.js";
import User from "../models/user.js";

export default class userCourseHandler {
  static async addCourse(courseCode, netId) {
    try {
      return await User.updateOne(
        { netId: netId },
        { $addToSet: { courseList: courseCode } },
        { upsert: true }
      );
    } catch (e) {
      console.error(`Unable to post course: ${e}`);
      return { error: e };
    }
  }

  static async updateMajor(major, netId) {
    try {
      return await User.updateOne({ netId: netId }, { major: major });
    } catch (e) {
      console.error(`Unable to post major ${e}`);
      return { error: e };
    }
  }
  static async deleteCourse(netId, courseCode) {
    try {
      const deleteCourse = await User.updateOne(
        { netId: netId },
        {
          $pullAll: {
            courseList: [courseCode],
          },
        }
      );
      return deleteCourse;
    } catch (e) {
      console.error(`Unable to delete course: ${e}`);
      return { error: e };
    }
  }
}
