const { response, json } = require("express");
const userModel = require("../models/UserModal");
const bcrypt = require("bcrypt");
const {
  comparePasswordHash,
  generatePasswordHash,
} = require("../utlisfiles/bscrpt");
const { generateAccessToken } = require("../utlisfiles/jwt");
const genreModel = require("../models/genreModel");
// const UserModal = require("../models/UserModal");
//!--------------------------------------------------------------------------------
const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "incorrect password/email combination",
      });
    }
    const validatePassword = await comparePasswordHash(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({
        message: "incorrect password",
      });
    }

    const accessToken = generateAccessToken(user._id);
    res.status(200).json({
      message: "Login successful completed",
      email: user.email,
      title: user.userName,
      accessToken,
    });
    console.log("=================");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//!---------------------------------------------------------------------------------
const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { userName, password } = req.body;
    const isExist = await userModel.findOne({ userName });
    if (!isExist) {
      res.status(404).json({ message: "User already exists" });
    }
    const hashPassword = await generatePasswordHash(password);
    const newUser = await userModel.create({
      ...req.body,
      password: hashPassword,
    });
    console.log(newUser, "===========================");
    res.json(newUser);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
//!-----------------------------------------------------------------------------------
const AllWatchLatter = async (req, res) => {
  try {
    console.log(req.userId, "foo");
    //  const data = userModel.find(title)
    // const user = await userModel.movies.findOne({ title });
    // if(!user){
    //   res.json("error")
    //   console.log("alert");
    // }
    var watchLatter = await userModel
      .find({ _id: req.userId })
      .select("movies")
      .populate({
        path: "movies",
        populate: {
          path: "genre",
          model: genreModel, // Replace "GenreModel" with the actual name of your Genre model
        },
      });

    res.json(watchLatter);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
//!-----------------------------------------------------------------------------------

const addWatchLatter = async (req, res) => {
  try {
    const userId = req.userId;
    const movieId = req.body.movieId;

    const user = await userModel.findById(userId);

    if (user.movies.includes(movieId)) {
      // Movie ID already exists in the array, do not add again
      res.status(201).json({message:"already in watchLatter"});
      console.log(user, "===");
    } else {
      const watchLaterList = await userModel.findByIdAndUpdate(
        userId,
        {
          $addToSet: { movies: movieId },
        },
        { new: true }
      );

      res.json(watchLaterList);
      console.log(watchLaterList, "===");
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = { login, signup, addWatchLatter, AllWatchLatter };
