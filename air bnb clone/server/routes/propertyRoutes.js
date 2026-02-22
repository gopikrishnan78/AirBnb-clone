const express = require('express');
const router = express.Router();
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getUserProperties
} = require('../controllers/propertyController');
const auth = require('../middleware/auth');

router.get('/', getProperties);
router.get('/:id', getPropertyById);

router.post('/', auth, createProperty);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);
router.get('/user/my-properties', auth, getUserProperties);

module.exports = router;
