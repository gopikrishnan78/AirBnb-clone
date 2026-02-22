const express = require('express');
const router = express.Router();
const { uploadImages } = require('../controllers/uploadController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/images', auth, upload.array('images', 10), uploadImages);

module.exports = router;
