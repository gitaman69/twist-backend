# Twirl & Tie Backend - Email Service

A Node.js Express backend service for handling email notifications for the Twirl & Tie Paranda website.

## Features

- 📧 Welcome email functionality with beautiful HTML templates
- 🚀 Express.js REST API
- 🔒 Environment variable configuration
- 🎨 Custom branded email templates for Twirl & Tie
- ✅ Input validation and error handling
- 🌐 CORS enabled for frontend integration

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your email credentials:
```env
USER=your-email@gmail.com
USER_PASS=your-app-password
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Important:** For Gmail, you need to use an "App Password" instead of your regular password:
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account settings > Security > App passwords
3. Generate a new app password for "Mail"
4. Use this app password in the `USER_PASS` field

### 3. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST `/api/send-welcome-email`

Sends a welcome email to a new subscriber.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "User Name" // optional
}
```

**Success Response:**
```json
{
  "message": "Welcome email sent successfully",
  "success": true,
  "messageId": "email-message-id",
  "recipient": "user@example.com"
}
```

**Error Response:**
```json
{
  "error": "Error sending email",
  "success": false,
  "details": "Error details"
}
```

### GET `/api/health`

Health check endpoint to verify the service is running.

**Response:**
```json
{
  "status": "healthy",
  "service": "Twirl & Tie Email Service",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Frontend Integration

To integrate with your React frontend, update the email signup component to call the backend:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (email) {
    try {
      const response = await fetch('http://localhost:5000/api/send-welcome-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name: '' }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};
```

## Email Template Features

The welcome email includes:
- 🎨 Beautiful branded design matching Twirl & Tie aesthetics
- 📱 Responsive HTML template
- ✨ Gradient backgrounds and modern styling
- 🏛️ Cultural heritage messaging
- 💎 Premium brand positioning
- 📧 Both HTML and plain text versions

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords for Gmail (not your regular password)
- Keep your email credentials secure
- Consider using environment-specific configurations for production

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**: Make sure you're using an app password for Gmail
2. **CORS errors**: Check that `FRONTEND_URL` matches your frontend URL
3. **Port conflicts**: Change the `PORT` in `.env` if 5000 is already in use

### Testing the Email Service:

You can test the email endpoint using curl:

```bash
curl -X POST http://localhost:5000/api/send-welcome-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Use a proper email service (SendGrid, AWS SES, etc.) instead of Gmail
3. Set up proper logging and monitoring
4. Use HTTPS for all communications
5. Implement rate limiting for the email endpoint