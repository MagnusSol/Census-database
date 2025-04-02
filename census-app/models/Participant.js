const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Participant = sequelize.define('Participant', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    validate: {
      isEmail: true
    }
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

const Work = sequelize.define('Work', {
  companyname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Home = sequelize.define('Home', {
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Participant.hasOne(Work);
Participant.hasOne(Home);
Work.belongsTo(Participant);
Home.belongsTo(Participant);

module.exports = { Participant, Work, Home };
