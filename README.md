# BookMyShow - React Frontend

React-based user interface for the BookMyShow movie ticket booking system.

## 📋 Features

- **User Authentication**: Register and login with email/password
- **Movie Browsing**: Search and browse available movies by genre, language
- **Theatre Listings**: View theatres filtered by city
- **Show Selection**: Select shows by date and time
- **Seat Booking**: Interactive 10x10 seat grid with real-time selection
- **Booking History**: View past bookings and booking details
- **Admin Panel**: Manage theatres, movies, and shows
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Java backend running on `localhost:8080`

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html           # HTML entry point
├── src/
│   ├── components/
│   │   └── Navbar.js        # Navigation component
│   ├── pages/
│   │   ├── Home.js          # Dashboard with statistics
│   │   ├── Register.js      # User registration
│   │   ├── Login.js         # User login
│   │   ├── AdminLogin.js    # Admin login
│   │   ├── Movies.js        # Movie browsing
│   │   ├── Theatres.js      # Theatre listings
│   │   ├── ShowDetail.js    # Show details for movie
│   │   ├── Booking.js       # Seat selection and booking
│   │   ├── MyBookings.js    # Booking history
│   │   └── AdminPanel.js    # Admin dashboard
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── App.js               # Main application component
│   ├── App.css              # Application styling
│   └── index.js             # React entry point
├── package.json             # Dependencies
└── README.md                # This file
```

## 🔗 API Integration

All backend endpoints are consumed through `src/services/api.js`. The service provides:

- `registerUser(userData)` - Register new user
- `loginUser(email, password)` - User login
- `registerAdmin(adminData)` - Register admin
- `loginAdmin(email, password)` - Admin login
- `getMovies()` - Fetch all movies
- `addMovie(movieData)` - Add new movie (admin)
- `getTheatres()` - Fetch all theatres
- `addTheatre(theatreData)` - Add new theatre (admin)
- `getShows(movieId)` - Get shows for movie
- `addShow(showData)` - Add new show (admin)
- `bookSeats(bookingData)` - Book seats
- `getUserBookings(userId)` - Get user's bookings
- `getStats()` - Get dashboard statistics

## 🎨 Styling

- **Modern Design**: Gradient backgrounds, smooth transitions
- **Responsive Layout**: Mobile-first approach
- **Interactive Elements**: Hover effects, active states
- **Color Scheme**: Professional blue/purple gradients

### Key CSS Classes

- `.container` - Main content wrapper
- `.grid` - Grid layout for cards
- `.card` - Card component
- `.btn` - Button styling
- `.form` - Form styling
- `.error` - Error message
- `.success` - Success message
- `.loading` - Loading indicator

## 🔐 Authentication

- User credentials stored in `localStorage`
- Token-based authentication with unique user IDs
- Protected routes requiring login
- Automatic redirect to login for unauthenticated users

## 📝 User Flows

### New User Flow
1. Register with name, email, phone, password
2. Login with credentials
3. Browse movies and theatres
4. Select movie → view shows → select seats → book
5. View booking history

### Admin Flow
1. Admin login
2. Access admin panel
3. Add theatres, movies, and shows
4. Manage content

## 🌍 Environment Variables

Optional `.env` file for configuration:
```
REACT_APP_API_BASE_URL=http://localhost:8080
```

## 🏗️ Build for Production

```bash
npm run build
```

Creates optimized build in `build/` directory ready for deployment.

## 🐛 Troubleshooting

**Backend not connecting?**
- Ensure Java backend is running on port 8080
- Check `src/services/api.js` for correct API base URL

**Port 3000 already in use?**
```bash
# On Windows (PowerShell)
netstat -ano | findstr :3000

# On macOS/Linux
lsof -i :3000
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📱 Features By Page

### Home
- Dashboard with system statistics
- Quick links to browse movies
- Summary cards with counts

### Movies
- Browse all available movies
- Search by title
- View movie details (genre, language, duration, rating)
- Navigate to show selection

### Theatres
- Browse all theatres
- Filter by city
- View theatre details and tax information

### Booking
- Interactive 10x10 seat grid
- Click seats to select/deselect
- Visual feedback for selected seats
- Choose payment mode
- Real-time price calculation

### My Bookings
- View booking history
- Display booking details
- Show booking status and confirmation

## 🤝 Support

For issues or questions about the frontend, refer to the backend documentation or contact the development team.

---

**Built with ❤️ using React & Modern Web Technologies**
