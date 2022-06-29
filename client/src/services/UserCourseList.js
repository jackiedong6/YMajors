import axios from "../utils/axios.js";

class UserCourseService {
  async add(name) {
    const body = { text: name };
    await axios.post("/user/courses", body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  async addCourseToSemester(name, semester) {
    await axios.post(
      "/user/courses/semester",
      { name: name, semester: semester },
      {
        params: { name: name, semester: semester },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  }
  async delete(name) {
    await axios.delete("/user/courses", {
      data: { text: name },
    });
  }

  async deleteCourseFromSemester(name, semester) {
    await axios.delete("/user/courses/semester", {
      headers: {},
      params: { name: name, semester: semester },
    });
  }
}

export default new UserCourseService();
