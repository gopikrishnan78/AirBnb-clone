const Property = require('../models/Property');

const createProperty = async (req, res) => {
  try {
    const { title, description, location, price, amenities, images } = req.body;

    if (!title || !location || !price) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, location, and price'
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number'
      });
    }

    const property = await Property.create({
      owner: req.user._id,
      title,
      description,
      location,
      price,
      amenities: amenities || [],
      images: images || []
    });

    res.status(201).json({
      success: true,
      property
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating property'
    });
  }
};

const getProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, amenities } = req.query;

    let query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (amenities) {
      const amenitiesArray = Array.isArray(amenities) ? amenities : [amenities];
      query.amenities = { $all: amenitiesArray };
    }

    const properties = await Property.find(query).populate('owner', 'name email');

    res.status(200).json({
      success: true,
      count: properties.length,
      properties
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching properties'
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      property
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching property'
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    const { title, description, location, price, amenities, images } = req.body;
    
    if (title) property.title = title;
    if (description) property.description = description;
    if (location) property.location = location;
    if (price) property.price = price;
    if (amenities) property.amenities = amenities;
    if (images) property.images = images;

    await property.save();

    res.status(200).json({
      success: true,
      property
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating property'
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting property'
    });
  }
};

const getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties
    });
  } catch (error) {
    console.error('Get user properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user properties'
    });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getUserProperties
};
