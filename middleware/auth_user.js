require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const userName = decodedToken.userName;

    if (
      userId !== undefined &&
      userName !== undefined &&
      isNaN(parseInt(userId)) === false
    ) {
      console.log("token success", token);
      next();
    } else {
      console.log("token failed", token);
      return false;
    }
  } catch {
    res.status(401).send({
      error: "Invalid request!",
    });
  }
};
