const express = require("express");
const mongoose = require("mongoose");

module.exports = async (url) => {
  try {
    const options = { dbname: "Chessgame" };
    await mongoose.connect(url, options);
    console.log("connected to db");
  } catch (error) {
    console.log("Something went wrong connecting to db");
  }
};
