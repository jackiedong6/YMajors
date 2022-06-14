import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import { passportConfig } from "./auth/auth.handlers.js";
import auth_routes from "./auth/auth.routes.js";
import user_course_routes from "./user/user.course.routes.js";
import major_requirement_routes from "./majorRequirements/major.requirements.routes.js";

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();

app.set("trust proxy", true);

app.use(cors(corsOptions));

app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 10 * 60 * 1000,
    },
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use("/api", auth_routes);
app.use("/api", major_requirement_routes);
app.use("/api", user_course_routes);
// app.use("/api/v1/coursesmart", courses)
// app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
