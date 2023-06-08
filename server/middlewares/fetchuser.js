
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = async (req, res, next) => {
  const token = req.header('atoken');

  if (!token) {
    return res.status(401).send("Authenticate with a valid token");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id; // Add the user ID to req.userId
    console.log("User Id:", req.userId);
    next();
  } catch (error) {
    return res.status(401).send(error);
  }
};

module.exports = fetchuser;

