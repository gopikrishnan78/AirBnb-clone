const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required']
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required'],
    validate: {
      validator: function(value) {
        return value > this.checkIn;
      },
      message: 'Check-out date must be after check-in date'
    }
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price must be positive']
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active'
  }
}, {
  timestamps: true
});

bookingSchema.index({ property: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ traveler: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
