const Booking = require('../models/Booking');
const Property = require('../models/Property');

const checkAvailability = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut } = req.body;

    if (!propertyId || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Please provide propertyId, checkIn, and checkOut dates'
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const overlappingBookings = await Booking.find({
      property: propertyId,
      status: 'active',
      $or: [
        { checkIn: { $lte: checkInDate }, checkOut: { $gt: checkInDate } },
        { checkIn: { $lt: checkOutDate }, checkOut: { $gte: checkOutDate } },
        { checkIn: { $gte: checkInDate }, checkOut: { $lte: checkOutDate } }
      ]
    });

    const available = overlappingBookings.length === 0;

    res.status(200).json({
      success: true,
      available,
      message: available ? 'Property is available' : 'Property is not available for selected dates'
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking availability'
    });
  }
};

const createBooking = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut } = req.body;

    if (!propertyId || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Please provide propertyId, checkIn, and checkOut dates'
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date must be before check-out date'
      });
    }

    if (checkInDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past'
      });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    const overlappingBookings = await Booking.find({
      property: propertyId,
      status: 'active',
      $or: [
        { checkIn: { $lte: checkInDate }, checkOut: { $gt: checkInDate } },
        { checkIn: { $lt: checkOutDate }, checkOut: { $gte: checkOutDate } },
        { checkIn: { $gte: checkInDate }, checkOut: { $lte: checkOutDate } }
      ]
    });

    if (overlappingBookings.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Property is not available for selected dates'
      });
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * property.price;

    const booking = await Booking.create({
      traveler: req.user._id,
      property: propertyId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('property', 'title location images')
      .populate('traveler', 'name email');

    res.status(201).json({
      success: true,
      booking: populatedBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating booking'
    });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ traveler: req.user._id })
      .populate('property', 'title location images price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings'
    });
  }
};

const getPropertyBookings = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view bookings for this property'
      });
    }

    const bookings = await Booking.find({ property: req.params.propertyId })
      .populate('traveler', 'name email')
      .sort({ checkIn: 1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Get property bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching property bookings'
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.traveler.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking'
    });
  }
};

module.exports = {
  checkAvailability,
  createBooking,
  getUserBookings,
  getPropertyBookings,
  cancelBooking
};
