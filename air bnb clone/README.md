# Airbnb Clone MERN Stack

A full-stack web application built with MongoDB, Express.js, React.js, and Node.js that enables property owners to list accommodations and travelers to search, view, and book properties.

## Features

- 🔐 User authentication with JWT
- 🏠 Property listing management with image uploads (Cloudinary)
- 🔍 Property search and filtering by location, price, and amenities
- 📅 Booking system with availability checking
- 📱 Responsive design for all devices (mobile, tablet, desktop)
- 🛡️ Secure API with validation and error handling
- 💳 Real-time booking price calculation

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Multer for file uploads

### Frontend
- React 18 with Hooks
- React Router for navigation
- Axios for API calls
- Context API for state management
- CSS3 with responsive design

## Project Structure

```
airbnb-clone-mern/
├── server/              # Backend Node.js/Express application
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Context providers
│   │   ├── services/    # API services
│   │   ├── utils/       # Utility functions
│   │   ├── hooks/       # Custom hooks
│   │   └── App.jsx      # Root component
│   └── index.html       # HTML template
└── README.md            # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account (for image uploads)

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd airbnb-clone-mern
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/airbnb-clone
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace the Cloudinary credentials with your actual values from your [Cloudinary Dashboard](https://cloudinary.com/console).

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

### For Property Owners

1. **Register/Login**: Create an account or log in
2. **List Property**: Click "List Property" in the navbar
3. **Add Details**: Fill in property information (title, description, location, price, amenities)
4. **Upload Images**: Upload up to 10 images of your property
5. **Manage Listings**: View, edit, or delete your properties from the Dashboard

### For Travelers

1. **Search Properties**: Use the search bar on the home page or browse all properties
2. **Filter Results**: Apply filters for location, price range, and amenities
3. **View Details**: Click on a property to see full details and images
4. **Check Availability**: Select check-in and check-out dates
5. **Book Property**: Complete the booking (requires login)
6. **Manage Bookings**: View and cancel bookings from your Dashboard

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property (protected)
- `PUT /api/properties/:id` - Update property (protected)
- `DELETE /api/properties/:id` - Delete property (protected)
- `GET /api/properties/user/my-properties` - Get user's properties (protected)

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/user` - Get user's bookings (protected)
- `GET /api/bookings/property/:propertyId` - Get property bookings (protected)
- `POST /api/bookings/check-availability` - Check availability
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)

### Upload
- `POST /api/upload/images` - Upload images (protected)

## Database Models

### User
- email (unique, required)
- password (hashed, required)
- name (required)
- timestamps

### Property
- owner (ref: User, required)
- title (required)
- description (required)
- location (required, indexed)
- price (required, positive number)
- amenities (array)
- images (array of URLs)
- timestamps

### Booking
- traveler (ref: User, required)
- property (ref: Property, required)
- checkIn (required)
- checkOut (required)
- totalPrice (required)
- status (enum: active/cancelled/completed)
- timestamps

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env)
- `VITE_API_URL` - Backend API base URL

## Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Set environment variables in your hosting platform
2. Ensure MongoDB is accessible (use MongoDB Atlas for cloud database)
3. Update `FRONTEND_URL` to your deployed frontend URL
4. Deploy using `npm start`

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build the production bundle: `npm run build`
2. Set `VITE_API_URL` to your deployed backend URL
3. Deploy the `dist` folder

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT token authentication with expiration
- Protected API routes with authentication middleware
- Input validation and sanitization
- CORS configuration
- Error handling without exposing sensitive data
- File upload validation (type and size limits)

## Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px - 767px)
- Tablets (768px - 1024px)
- Desktops (1024px+)

All touch targets are minimum 44x44 pixels for mobile accessibility.

## Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check all environment variables are set correctly
- Verify port 5000 is not in use

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check `VITE_API_URL` in client/.env
- Check browser console for CORS errors

### Image upload fails
- Verify Cloudinary credentials are correct
- Check file size (max 5MB per image)
- Ensure file format is JPEG, PNG, or WebP

### Database connection fails
- Check MongoDB is running: `mongod --version`
- Verify DATABASE_URL format
- For MongoDB Atlas, ensure IP whitelist is configured

## License

ISC

## Support

For issues and questions, please open an issue in the repository.

---

Built with ❤️ using the MERN Stack
