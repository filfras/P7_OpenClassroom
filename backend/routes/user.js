const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.post('/deleteuser', auth, userCtrl.deleteUser) //need to add authentication here (to be done later)

module.exports = router
