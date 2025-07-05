// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { swaggerUi, specs } = require('./swagger');

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check
app.get('/', (req, res) => {
  res.send('LMS Backend Running ✅');
});

// Routes
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

module.exports = app;
