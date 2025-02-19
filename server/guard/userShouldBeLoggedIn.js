const pool = require("../config/db");
var jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");

  if (!token) {
    return res
      .status(401)
      .send({ message: "Acces denied. No token provided." });
  }

  jwt.verify(token, supersecret, (err, decoded) => {
    if (err) {
      const message =
        err.name === "TokenExpiredError"
          ? "Token expired. Please log in again."
          : "Invalid token. Please log in again.";
      return res.status(401).send({ message });
    }
    req.user_id = decoded.user_id;
    next();
  });
}

module.exports = userShouldBeLoggedIn;
