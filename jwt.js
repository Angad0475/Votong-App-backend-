const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

// JWT Authentication Middleware
const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token Not Found' });

    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }); // Example expiry
};


// Generate a token when this script is run directly
if (require.main === module) {
    // Example user data to include in the token payload
    const userData = {
        id: 1,
        username: 'exampleUser',
        email: 'user@example.com'
    };

    const token = generateToken(userData);
    console.log('Generated Token:', token);
}

module.exports = { jwtAuthMiddleware, generateToken };
