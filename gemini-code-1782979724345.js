const express = require('express');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 3000;

// CloudWatch ke liye Logs Setup (Winston Logger)
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' }) // Yeh file CloudWatch read karega
    ],
});

// Main Route (Homepage)
app.get('/', (req, res) => {
    logger.info('Homepage visited successfully');
    res.send('<h1>Hazrat Ali! Apki Node.js Application EC2 par chal rahi hai! 🚀</h1>');
});

// Test Route for Errors (CloudWatch Alert testing ke liye)
app.get('/error', (req, res) => {
    logger.error('Something went wrong on this route!');
    res.status(500).send('Error occurred!');
});

// Server Start
app.listen(PORT, () => {
    logger.info(`Application started on port ${PORT}`);
    console.log(`Server is running on http://localhost:${PORT}`);
});