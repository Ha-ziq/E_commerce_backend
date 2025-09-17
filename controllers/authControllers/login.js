import User from '../../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: 'invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: 'invalid credentials' });

    const token = jwt.sign(
      { id: user._id, name: user.username, role: user.role }, // payload
      process.env.JWT_SECRET, // secret
      { expiresIn: '1h' } // expiry (good practice)
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.username,
        cart: user.cart,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error logging in ', error: error.message });
  }
};

export const restricted = async (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.json('success   ');
  } else {
    console.log('error not verified');
  }
};
