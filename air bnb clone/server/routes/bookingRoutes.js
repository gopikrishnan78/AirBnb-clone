const express = require('express');
const router = express.Router();
const {
  checkAvailability,
  createBooking,
  getUserBookings,
  getPropertyBookings,
  cancelBooking
} = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post('/check-availability', checkAvailability);

router.post('/', auth, createBooking);
router.get('/user', auth, getUserBookings);
router.get('/property/:propertyId', auth, getPropertyBookings);
router.put('/:id/cancel', auth, cancelBooking);

module.exports = router;
