const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

function createUser(req, res) {
  const { username: name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(404).send("name, email and password is required");
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return res.json(err);
    bcrypt.hash(password, salt, function (err, password) {
      if (err) return res.json(err);
      const newUser = userModel({ name, email, password });
      newUser
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(409).json(err);
        });
    });
  });
}

async function validateUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).send("email and passward is required");
  }


  const User = await userModel.findOne({ email });

  bcrypt.compare(password, User?.password, function (err, result) {
    if (result) {
      var token = jwt.sign(
        { name: User.name, email: User.email, role: "User" },
        process.env.JWT_SECRET_KEY
      );
      // console.log(token);
      res.cookie("access_token", token, {
        httpOnly: false,
        secure: false,
      });
      res.cookie("user_id", User._id, {
        httpOnly: false,
        secure: false,
      });
      return res.status(200).json({
        status: "success",
        msg: "This User is authenticated.",
        data: User,
      });
    } else {
      return res
        .status(404)
        .json({ status: "failed", msg: "Email or Password is incorrect" });
    }
  });
}

async function getUser(req, res) {
  const userID = req.params.userID;
  const { name, email, role } = res.locals.token;
  userModel
    .findById(userID)
    .select("-password")
    .then((User) => {
      if (!(email && email == User.email))
        return res.json({ err: "user does not exist" });
      return res.json({ data: User });
    })
    .catch(() => {
      return res.json({ err: "user does not exist!" });
    });
}

function updateUser() {}

function deleteUser() {}

module.exports = {
  validateUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
