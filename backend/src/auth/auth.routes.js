import express from "express";
import passport from "passport";
import User from "../models/user.js";

const router = express.Router();

router.get("/auth/check", (req, res) => {
  if (req.user) {
    console.log(req.user);
    User.findOne({ netId: req.user }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          auth: true,
          user: req.user,
          courseList: docs.courseList,
          major: docs.major,
        });
      }
    });
  } else {
    res.json({ auth: false, id: null });
  }
});

router.get(
  "/auth/cas",
  passport.authenticate("cas", { failureRedirect: "api/auth/login/failed" }),
  function (req, res) {
    req.logIn(req.user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("http://localhost:3000/home");

      // INSTEAD OF JUST REDIRECTING, SET USER NETID ON A COOKIE
      // RETRIEVE THE COOKIE FROM /auth/login/success
    });
  }
);

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed to Login with CAS",
  });
});

router.get("/auth/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    } else {
      return res.json({ success: true });
    }
  });
});

export default router;
