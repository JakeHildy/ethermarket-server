const express = require("express");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");

const router = express.Router();

function getToken(req) {
  return req.headers.authorization.split(" ")[1];
}

const authorize = (req, res, next) => {
  const token = getToken(req);
  if (!token) return res.status(403).json({ error: "No token. Unauthorized." });
  if (jwt.verify(token, process.env.JWT_KEY)) {
    req.decode = jwt.decode(token);
    next();
  } else {
    res.status(403).json({ error: "Not Authorized." });
  }
};

router.route("/follow/:id").patch(authorize, userController.followListing);
router.route("/simple/:id").get(userController.getSimpleProfile);
router.route("/:id").get(authorize, userController.getProfile);

module.exports = router;
