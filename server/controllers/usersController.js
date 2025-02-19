const pool = require("../config/db");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).send({ message: "Invalid email format" });
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await pool.query(
      `INSERT INTO users (username, email, password) VALUES (?,?,?)`,
      [username, email, hash]
    );

    res.status(201).json({ message: "Register successful" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .send({ message: "Username or email already exists" });
    }
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [results] = await pool.query(`SELECT * FROM users WHERE username=?`, [
      username,
    ]);

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const user_id = user.id;

    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) throw new Error("Incorrect password");
      let token = jwt.sign({ user_id }, supersecret);
      res
        .status(200)
        .json({ message: "Login successful, here is your token:", token });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send({
      message: "An internal error occurred during login",
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const [results] = await pool.query(
      `SELECT username FROM users WHERE id=?`,
      [req.user_id]
    );
    if (results.length === 0) {
      return res.status(404).send({ message: "Profile not found" });
    }
    res.send(results[0]);
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching profile" });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
