const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const multer = require('multer'); // multer is a middleware use for uploading files.

// { dest: 'public/users/images/'} this destination refere to the path in your backend where your image will show
const upload = multer({ dest: 'public/images/'});

//Route:02 /Get single by /transaction/:Id 
router.get("/:id", controller.getUser);

//Route:01 /Create user
router.post("/", controller.createUser);


//Route:03 /Update user
router.put("/:id", upload.single('image'), controller.updateUser); 

//Route:03 /Delete user
router.delete("/:id", controller.deleteUser); 
 

module.exports = router;

