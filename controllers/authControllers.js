const pool = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// SignUp
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check exiting user
    const [exiting] = await pool.execute(
      "SELECT * FROM users  WHERE email = ?",
      [email],
    );

    if (exiting.length > 0) {
      return res.status(400).json({ Message: "user already exits" });
    }

    // Hashing
    const hashPassword = await bcrypt.hash(password, 10);

    console.log(password);
    console.log(hashPassword);

    // insert
    const [result] = await pool.execute(
      "INSERT INTO users (name , email , password) VALUES ( ? , ? , ?)",
      [name, email, hashPassword],
    );
    res.status(201).json({ Message: "User Created...." });
  } catch (error) {
    res.status(200).json({ Error: error.message });
  }
};

// Login
exports.login = async (req, res) => {

try {
    const { email, password } = req.body;

  const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email
  ]);

  if (users.length === 0) {
    return res.status(400).json({ message: "Invaild credentials.." });
  }

  // console.log(users[0]);

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ Message: "Invaild credentials" });
  }

  const token = jwt.sign({name: user.name },process.env.JWT_SECRET);

  res.json({
    Message:"User loged in..",
    token
  });
} 
  catch (error) {
    res.status(500).json({Error : error.message});
}

};




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmFtZSIsImlhdCI6MTc3MjU1MTQyN30.cJ5FmgEbuErPujnwNzGlu-X7bkmV4EX11XD2wGSRGvc