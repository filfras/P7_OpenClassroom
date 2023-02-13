const sequelize = require('../config/db');
const Sequelize = require('sequelize');

const userModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,  
      validate: {
        notEmpty: true,
      },
    },
  })
  return User
}
//return User: To let the User model be used outside of the function and imported into other parts of the code.
module.exports = userModel(sequelize, Sequelize)





//find user by Login using their e-mail of username
/*
    User.findByLogin = async (login) => {
        let user = await User.findOne({
          where: { username: login },
        });
    
        if (!user) {
          user = await User.findOne({
            where: { email: login },
          });
        }
    
        return user;
      };

    return User;
  };
  */
