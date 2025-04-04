const express = require('express');
const cors = require('cors');
const sequelize = require('../config/database');
const participantRoutes = require('../routes/participants');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/participants', participantRoutes);

const PORT = process.env.DB_PORT;

async function initializeApp() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    
    await sequelize.sync();
    console.log('Database synchronized');

    // Create admin user
    const { Admin } = require('../models/Admin');
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('P4ssword', 10);
    await Admin.findOrCreate({
      where: { username: 'admin' },
      defaults: { password: hashedPassword }
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
}

initializeApp();

module.exports = app;
