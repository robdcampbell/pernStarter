const jwt = require("jsonwebtoken");
// get access to all environment variables
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
