import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendWelcomeEmail } from './controllers/emailController.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Twirl & Tie Backend API is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Email routes
app.post('/api/send-welcome-email', sendWelcomeEmail);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'Twirl & Tie Email Service',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Twirl & Tie Backend server is running on port ${PORT}`);
  console.log(`📧 Email service is ready!`);
});