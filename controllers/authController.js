const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

   
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await User.create({ name, email, password: hashedPassword });

    
    const token = generateToken(user._id);

  
    res.status(201).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

   
    const token = generateToken(user._id);

   
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
