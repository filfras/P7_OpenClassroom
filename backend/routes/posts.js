const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/post')

router.get('/', auth, postCtrl.getAllPosts)
router.post('/', auth, multer, postCtrl.createPost)
router.get('/:id', auth, postCtrl.getOnePost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.post('/:id/like', auth, multer, postCtrl.likesAndDislikes) //Do I want this feature? Not mandatory, can be added later
router.delete('/:id', auth, postCtrl.deletePost)

module.exports = router
