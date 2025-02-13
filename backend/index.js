const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
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

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || PORT}`);
});

app.get('/', async (req, res) => {
  res.send('Hello World');
});
