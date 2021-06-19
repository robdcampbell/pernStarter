const jwt = require("jsonwebtoken");
require("dotenv").config();
// const bcrypt = require('bcrypt')

//before our routes are hit, the middleware is going to access to the Req and Res
module.exports = async (req, res, next) => {
  try {
    const jwtToken = await req.header("token");
    // console.log(req.header("token"));
    if (!jwtToken) {
      return await res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    // "user" is obj-property created in jwtGenerator
    req.user = payload.user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Not Authorized");
  }
};
