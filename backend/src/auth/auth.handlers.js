import express from "express";
import passport from "passport";
import { Strategy as CasStrategy } from "passport-cas2";
import User from "../models/user.js";
import mongoose from "mongoose";

export const passportConfig = async (passport) => {
  passport.use(
    new CasStrategy(
      {
        version: "CAS2.0",
        casURL: "https://secure.its.yale.edu/cas",
      },

      async function (req, profile, done) {
        User.findOne({ netId: profile.id }, async (err, doc) => {
          if (err) throw err;
          if (doc) console.log("Existing User");
          if (!doc) {
            const newUser = new User({
              netId: profile.id,
            });
            await newUser.save();
            console.log("User Created");
          }
        });
        done(null, profile.id);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
