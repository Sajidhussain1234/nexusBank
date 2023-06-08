const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const JWT_SECRET = process.env.JWT_SECRET; // the value of JWT_SECRET is a string which will be yours singnature.

// Route: 01
// Creating a new user using POST method :  '/api/auth/user'   -: Does not require auth (login require nh h)

const signup = async (req, res) => {
  // Finds the validation errors in this request, if there are error return bad request and errors and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const { firstName, lastName, email, mobileNumber, password } = req.body;
  try {
    // check weather the user with the same email exist already
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(403)
        .json({ error: "Sorry the user with this email already exist" });
    }
    // creating secure password
    const salt = await bcrypt.genSalt(10); // making salt using genSalt method
    const encryptedPassword = await bcrypt.hash(password, salt); //converting plain password into hash and adding salt
    //creating user in db
    const user = await User({
      firstName,
      lastName,
      email,
      mobileNumber,
      password: encryptedPassword,
    });
    await user.save();
    // console.log(user._id);

    // getting id of user and adding json web token with that id and sent as reponse
    const payload = {
      id: user._id
       // user: { id: user._id},
    };
    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({ message: "Congrats! Account created successfully", user,  authToken });
  } catch (error) {
    res.status(500).send(error);
  }
};


// authenticating a user using method POST:  '/api/auth/login'   -: Does not require login

const login = async (req, res) => {
  // Finds the validation errors in this request, if therer are error return bad request and errors and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const { email, password } = req.body;
  try {
    // check weather the user with the same email exist
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
    // .compare function return true or false on the basis of given parameter. The first parameter must be the password which user given at the time of login, and the second parameter (user.password) will be the password of that specific user, which want to login. It comes from the database. if both matched user will login
    const comparePassord = await bcrypt.compare(password, user.password);  
    console.log(comparePassord)
    if (!comparePassord) {
      // console.log(user.password)
      return res.status(400).json({ error: "Invalid password" });
    }
    // getting id of above users -- This will be the payload for authToken
    const payload = {
      id: user._id
      // user: { id: user._id},
    };
    const authToken = jwt.sign(payload, JWT_SECRET);
    res.json({ message: "Login successfully", authToken });
  } catch (error) {
    res.status(500).send(error);
  }
};


// Providing user detail to user using method POST:  '/api/auth/getuser'   -: Login require

// const getUser =  async(req, res) => {
//   console.log("Main controller")
//   console.log(req.userId)
//     try {
//       const userId = req.userId;
//       const user = await User.findById(userId)//.select("-password");
//       console.log(user);
//       res.status(200).json({message:"call within getting user"}); 
//       // res.json(user);
//     } catch (error) {
//         res.status(500).send(error);
//     }
//   };

const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password"); // "-password" it mean without password all fields
    console.log(user);   
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while retrieving the user" });
  }
};


module.exports = {
  signup,
  login,
  getUser
};
