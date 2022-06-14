import app from "./server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userCourseHandler from "./user/user.course.handler.js";
// import majorsDAO from "./dao/majorsDAO.js"

dotenv.config("../.env");

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    dbName: "CourseSmart",
  })

  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    console.log("Connected to Mongoose");
    // await coursesDAO.injectDB(client)
    // await majorsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`Listening on port ${port}.`);
    });
  });
