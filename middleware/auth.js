const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer ')) token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'غير مصرح' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user || !req.user.active) return res.status(401).json({ success: false, message: 'الحساب غير نشط' });
    next();
  } catch (err) { res.status(401).json({ success: false, message: 'رمز غير صالح' }); }
};
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ success: false, message: 'ليس لديك صلاحية' });
  next();
};
exports.generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
