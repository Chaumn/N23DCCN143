const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const studentRoutes = require('./routes/student.routes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/students', studentRoutes);

// Error Handler (đặt cuối cùng)
app.use(errorHandler);

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});