// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { swaggerUi, specs } = require('./swagger');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check route
app.get('/', (req, res) => {
  res.send('LMS Backend Running ✅');
});

// Route registrations
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/courses', require('./routes/course.routes'));
app.use('/api/lessons', require('./routes/lesson.routes'));
app.use('/api/progress', require('./routes/progress.routes'));
app.use('/api/assessments', require('./routes/assessment.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));

app.use('/api/forums', require('./routes/forum.routes'));
app.use('/api/feedback', require('./routes/feedback.routes'));
app.use('/api/gamification', require('./routes/gamification.routes'));
app.use('/api/messages', require('./routes/message.routes'));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
