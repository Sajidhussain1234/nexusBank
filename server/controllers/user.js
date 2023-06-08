const User = require("../models/User");
const fs = require('fs');

// GET request to retrieve a user's information
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST request to create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, email, mobileNumber, password } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT request to update an existing user's information
const updateUser = async (req, res) => {
  const file = req.file;
  try {
    console.log("file object which i uploading", file);
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    // Generate a unique filename or identifier for the image
    const fileExtension = file.originalname.split(".").pop();
    const imageName = `${Date.now()}.${fileExtension}`;

      // Save the image in the backend with the generated name
      const imagePath = `public/users/images/${imageName}`;
      fs.renameSync(file.path, imagePath);

       // Update the image field in the database
       user.image = imageName;
       const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "picture uploaded successfully", updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE request to remove a user from the system
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
