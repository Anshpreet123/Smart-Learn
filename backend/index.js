const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/db/index');

const app = express();
dotenv.config({
  path: './src/config/.env',
});

// mongoose database connection
connectDB()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection failed');
    process.exit(1);
  });

const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// google auth routes
const passport = require('passport');
const session = require('express-session');
require('./src/utils/passport.js'); // Import passport configuration

app.use(
  session({
    secret: 'your_secret_key', // Use a strong secret key
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    // Redirect user or send a token, for example:
    res.redirect('/dashboard'); // Or send a JWT token here
  },
);

// Logout Route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// google auth ends

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || PORT}`);
});

app.get('/', async (req, res) => {
  res.send('Hello World');
});

// Using user routes
const usersRoutes = require('./src/routes/users.routes');
app.use('/api/v1/users', usersRoutes);

// Using course routes
const coursesRoutes = require('./src/routes/courses.routes');
app.use('/api/v1/courses', coursesRoutes);
