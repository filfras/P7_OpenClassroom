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

const postModel = (sequelize, { DataTypes }) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      ...validationRules.notEmpty,
      ...validationRules.allowNull,
    },
    content: {
      type: DataTypes.TEXT,
      ...validationRules.notEmpty,
      ...validationRules.allowNull,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  });
}

module.exports = postModel(sequelize, Sequelize);