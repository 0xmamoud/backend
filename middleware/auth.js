const jwt = require("jsonwebtoken");
require("dotenv").config();

const PASSWORD = process.env.NODE_APP_TOKEN_PASSWORD;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, PASSWORD);
    const userId = decodedToken.userId;
    req.ath = {
      userId,
    };
  } catch (error) {
    res.status(401).json({ error });
  }
};
