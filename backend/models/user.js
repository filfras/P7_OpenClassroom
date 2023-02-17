const sequelize = require('../config/db');
const Sequelize = require('sequelize');

const validationRules = {
  allowNull: {
    allowNull: false,
  },
  notEmpty: {
    validate: {
      notEmpty: true,
    },
  },
};

const userModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    firstName: {
      type: DataTypes.STRING,
      ...validationRules.notEmpty,
      ...validationRules.allowNull,
    },
    lastName: {
      type: DataTypes.STRING,
      ...validationRules.notEmpty,
      ...validationRules.allowNull,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      ...validationRules.notEmpty,
      ...validationRules.allowNull,
    },
    password: {
      type: DataTypes.STRING,
      ...validationRules.notEmpty,
      ...validationRules.allowNull,
    },
  })
  return User
}
//return User: To let the User model be used outside of the function and imported into other parts of the code.
module.exports = userModel(sequelize, Sequelize)
