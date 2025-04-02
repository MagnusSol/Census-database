const basicAuth = require('basic-auth');
const bcrypt = require('bcrypt');
const { Admin } = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
  const credentials = basicAuth(req);

  if (!credentials) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    const admin = await Admin.findOne({ where: { username: credentials.name } });
    if (!admin || !await bcrypt.compare(credentials.pass, admin.password)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Authentication error' });
  }
};

module.exports = authMiddleware;
