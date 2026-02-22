# Quick Setup Guide - Airbnb Clone MERN Stack

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Step 2: Configure Environment Variables

**Backend** - Update `server/.env`:
```env
DATABASE_URL=mongodb://localhost:27017/airbnb-clone
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
CLOUDINARY_CLOUD_NAME=your_actual_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_actual_cloudinary_api_key
CLOUDINARY_API_SECRET=your_actual_cloudinary_api_secret
```

**Frontend** - `client/.env` is already configured for local development.

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (if not running)
# On macOS with Homebrew:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# On Windows:
# MongoDB should start automatically as a service
```

### Step 4: Get Cloudinary Credentials

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Go to Dashboard
4. Copy your Cloud Name, API Key, and API Secret
5. Update them in `server/.env`

### Step 5: Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:3000

## ✅ Verify Installation

1. Open http://localhost:3000 in your browser
2. You should see the Airbnb Clone home page
3. Try registering a new account
4. Create a property listing
5. Search for properties

## 📁 Project Structure Overview

```
airbnb-clone-mern/
├── server/                 # Backend API
│   ├── models/            # Database models (User, Property, Booking)
│   ├── controllers/       # Business logic
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, validation, error handling
│   └── config/            # Database, Cloudinary config
│
├── client/                # Frontend React App
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API calls
│   │   ├── context/      # Auth context
│   │   └── utils/        # Helper functions
│   └── index.html
│
└── README.md             # Full documentation
```

## 🎯 Key Features Implemented

### Backend (Complete)
✅ User authentication with JWT
✅ Property CRUD operations
✅ Booking system with availability checking
✅ Image upload to Cloudinary
✅ Input validation and sanitization
✅ Error handling middleware
✅ MongoDB database with Mongoose

### Frontend (Complete)
✅ User registration and login
✅ Property search with filters
✅ Property details with image gallery
✅ Booking form with date selection
✅ User dashboard (properties & bookings)
✅ Property creation and editing
✅ Responsive design (mobile, tablet, desktop)
✅ Protected routes

## 🔧 Common Issues & Solutions

### Issue: Backend won't start
**Solution:** 
- Check if MongoDB is running
- Verify all environment variables in `server/.env`
- Make sure port 5000 is not in use

### Issue: Frontend can't connect to backend
**Solution:**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `client/.env`
- Look for CORS errors in browser console

### Issue: Image upload fails
**Solution:**
- Verify Cloudinary credentials are correct
- Check file size (max 5MB)
- Ensure file format is JPEG, PNG, or WebP

### Issue: Database connection error
**Solution:**
- Start MongoDB: `brew services start mongodb-community` (macOS)
- Check DATABASE_URL format in `.env`
- For MongoDB Atlas, whitelist your IP address

## 📱 Testing the Application

### As a Property Owner:
1. Register/Login
2. Click "List Property"
3. Fill in property details
4. Upload images (requires Cloudinary setup)
5. View your properties in Dashboard
6. Edit or delete properties

### As a Traveler:
1. Browse properties on home page
2. Use search and filters
3. Click on a property to view details
4. Select dates and check availability
5. Book the property (requires login)
6. View bookings in Dashboard
7. Cancel bookings if needed

## 🌐 API Endpoints

### Authentication
- POST `/api/auth/register` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user

### Properties
- GET `/api/properties` - List all (with filters)
- GET `/api/properties/:id` - Get one
- POST `/api/properties` - Create (auth required)
- PUT `/api/properties/:id` - Update (auth required)
- DELETE `/api/properties/:id` - Delete (auth required)

### Bookings
- POST `/api/bookings` - Create booking (auth required)
- GET `/api/bookings/user` - Get user bookings (auth required)
- POST `/api/bookings/check-availability` - Check dates
- PUT `/api/bookings/:id/cancel` - Cancel (auth required)

### Upload
- POST `/api/upload/images` - Upload images (auth required)

## 🎨 Customization

### Change Colors
Edit the CSS files in `client/src/components/` and `client/src/pages/`
Primary color: `#FF385C` (Airbnb pink)

### Add More Amenities
Edit `client/src/utils/constants.js` - AMENITIES array

### Modify Validation Rules
Edit `server/utils/validators.js` and `client/src/utils/validation.js`

## 📚 Next Steps

1. **Add More Features:**
   - User reviews and ratings
   - Property favorites/wishlist
   - Advanced search (map view, date range)
   - Payment integration (Stripe)
   - Email notifications

2. **Improve Security:**
   - Rate limiting
   - Email verification
   - Two-factor authentication
   - Password reset functionality

3. **Deploy to Production:**
   - Backend: Heroku, Railway, or Render
   - Frontend: Vercel or Netlify
   - Database: MongoDB Atlas

## 💡 Tips

- Use MongoDB Compass to view your database
- Use Postman to test API endpoints
- Check browser DevTools Console for errors
- Use React DevTools for debugging components

## 📞 Need Help?

- Check the full README.md for detailed documentation
- Review the code comments in the source files
- Check MongoDB and Cloudinary documentation
- Ensure all dependencies are installed correctly

---

**Happy Coding! 🎉**
