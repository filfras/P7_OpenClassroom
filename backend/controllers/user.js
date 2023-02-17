const bcrypt = require('bcrypt')
const User = require('../models/user')
const Post = require('../models/post')
const jwt = require('jsonwebtoken')

const passwordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.signup = async (req, res, next) => {
  try {
    const hash = await passwordHash(req.body.password);
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    await user.save();
    res.status(201).json({
      message: 'User added successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to create user.',
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        error: 'User not found!',
      });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({
        error: 'Incorrect password!',
      });
    }
    const token = jwt.sign({ id: user._id }, 'RANDOM_TOKEN_SECRET', {
      expiresIn: '24h',
    });
    res.status(200).json({
      id: user._id,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to login.',
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    //sequelize method to query the DB and find the ID by their primary key (PK)

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Find all the posts made but the user
    const posts = await Post.findAll({
      where: { userId: user.id },
    });

    // Delete the posts
    await Promise.all(posts.map(posts => posts.destroy()));

    // Delete the user
    await user.destroy();
    //sequelize method to delete a record from the DB

    return res.status(200).json({ message: "User and posts deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
