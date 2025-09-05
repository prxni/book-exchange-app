# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
A full-stack book exchange application where users can list books, browse available books, and request exchanges with other users. Built with React frontend, Node.js/Express backend, MongoDB database, and Cloudinary for image storage.

## Development Commands

### Client (React + Vite)
```bash
# Navigate to client directory and install dependencies
cd client && npm install

# Start development server (runs on localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Server (Node.js + Express)
```bash
# Navigate to server directory and install dependencies
cd server && npm install

# Start development server with auto-reload (runs on localhost:3000)
npm start

# Note: Uses nodemon for auto-reloading during development
```

### Full Application Setup
```bash
# Start MongoDB locally (required)
mongod

# Terminal 1: Start backend
cd server && npm start

# Terminal 2: Start frontend
cd client && npm run dev
```

## Architecture Overview

### Backend Structure
- **Models**: MongoDB schemas using Mongoose
  - `User`: User profiles with authentication, book lists, and exchange history
  - `Book`: Book listings with owner, condition, and availability status
  - `ExchangeRequest`: Manages book exchange requests between users
  - `Tokens`: JWT refresh token storage

- **Routes**: RESTful API endpoints
  - `/api/auth/*`: Authentication (signup, login, refresh, logout)
  - `/api/user/*`: User profile management and image uploads
  - `/api/book/*`: CRUD operations for books (Note: route exists but not mounted in server.js)
  - `/api/exchange/*`: Exchange request management (Note: route exists but not mounted in server.js)

- **Authentication**: JWT-based with access tokens (5min) and refresh tokens (1hr)
- **Image Upload**: Cloudinary integration with Multer for profile pictures and book images
- **Database**: MongoDB with Mongoose ODM

### Frontend Structure
- **React Router**: Client-side routing with protected routes
- **Context API**: `AuthContext` for global authentication state
- **Axios Interceptors**: Automatic token refresh and request authentication
- **Styling**: Tailwind CSS for component styling
- **Components**: 
  - Reusable UI components (Header, Dropdown, ProfileDropdown)
  - Page components (Home, Login, Signup, Profile)
  - Layout system for consistent page structure

### Data Flow
1. User authentication via JWT tokens stored in cookies
2. Authenticated requests automatically include Bearer tokens
3. Book listings and exchange requests linked via MongoDB ObjectIds
4. Image uploads processed through Cloudinary with automatic resizing
5. User profiles track current posts, post history, and purchase history

## Key Integration Points

### Authentication Flow
- Login/signup generates access + refresh tokens
- `axiosJWT` interceptor handles automatic token refresh
- `authenticate` middleware validates requests server-side
- Routes are protected both client-side (React Router) and server-side (middleware)

### Image Upload Pipeline
- Frontend uses Multer for file handling
- `resizeAndUploadImage` middleware processes images (400x400, 100% quality, JPG format)
- Cloudinary stores images and returns URLs
- URLs stored in user profiles and book documents

### Book Exchange System
- Users create book listings with genre, condition, and images
- Other users can send exchange requests with messages
- Book owners can accept/reject requests
- Accepted exchanges update book status and user histories

## Environment Configuration
Server requires `.env` file with:
- `MONGOURI`: MongoDB connection string
- `ACCESS_KEY`: JWT access token secret
- `REFRESH_KEY`: JWT refresh token secret  
- `CLOUDINARY_CLOUD_NAME`: Cloudinary account name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Development Notes

### Missing Route Mounts
The server has book and exchange route files but they're not mounted in server.js. To enable full functionality:
```javascript
// Add to server.js
const bookRouter = require('./routes/book')
app.use('/api/book', bookRouter)

const exchangeRouter = require('./routes/exchange')  
app.use('/api/exchange', exchangeRouter)
```

### Genre/Tag System
Both User and Book models define allowed genres/tags with slight differences:
- User tags: 9 predefined categories for user interests
- Book genres: 12 categories including additional ones like 'Historical', 'Comics', 'Poetry'

### Client-Server Communication
- Client expects server on `localhost:3000`
- Client dev server runs on `localhost:5173` (Vite default)
- CORS enabled for cross-origin requests during development

### Authentication Cookie Management
- Access token stored in 'auth' cookie
- Refresh token stored in 'ref' cookie  
- Automatic cleanup on logout or token refresh failure
