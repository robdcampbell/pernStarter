const router = require("express").Router();
const pool = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// adding user to database
// REGISTER ROUTE
router.post("/register", validInfo, async (req, res) => {
  try {
    // 1). destructure the req.body {email, name, password}

    const { name, email, password } = await req.body;

    // 2). Check if user exists (if yes, throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("User Already Exists!");
    }

    // 3). Bcrypt the users password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4). Enter the new user into Database

    const newUser = await pool.query(
      `INSERT INTO users(user_name, user_email, user_password) VALUES($1,$2, $3) RETURNING *`,
      [name, email, bcryptPassword]
    );
    //res.status(200).json(newUser.rows[0]);

    // 5). Generating our JWT token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error...");
  }
});

// LOGIN ROUTE
router.post("/login", validInfo, async (req, res) => {
  try {
    // 1. Destructure req.body

    const { email, password } = await req.body;

    // 2. Check if user exists (if not, throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      res.status(401).json("Password or Email are incorrect");
    }

    // 3. Check if incoming password is the same as database password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      res.status(401).json("Password or Email is incorrect");
    }

    // 4. Give user the JWT token
    const token = jwtGenerator(user.rows[0].user_id);

    res.status(200).json({ token });
  } catch (error) {
    console.error(`${error.message}`);

    res.status(500).json("Server error...");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error...");
  }
});

module.exports = router;
