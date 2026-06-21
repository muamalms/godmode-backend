const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, protect } = require('../middleware/auth');
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'ادخل البيانات' });
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ success: false, message: 'بيانات خاطئة' });
    const token = generateToken(user._id);
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
router.get('/me', protect, (req, res) => res.json({ success: true, user: req.user }));
router.post('/register', protect, async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
module.exports = router;
