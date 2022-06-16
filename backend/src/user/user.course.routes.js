import express from "express";
import userCourseHandler from "./user.course.handler.js";

const router = express.Router();

router.post("/user/courses", async function (req, res, next) {
  try {
    const courseCode = req.body.text;
    const addCourse = await userCourseHandler.addCourse(courseCode, req.user);
    res.json({ status: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/user/major", async function (req, res, next) {
  try {
    const major = req.body.text;
    const updateMajor = await userCourseHandler.updateMajor(major, req.user);
    res.json({ status: "success", new_major: { updateMajor } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/user/courses", async function (req, res, next) {
  try {
    const courseCode = req.body.text;
    console.log(courseCode);
    const netId = req.user;
    const deletedResponse = await userCourseHandler.deleteCourse(
      netId,
      courseCode
    );
    res.json({ status: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
