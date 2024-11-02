// Import the required modules
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Root route for the server
app.get('/', (req, res) => {
    res.send('Welcome to the Orphanage Website Server!');
});

// Endpoint to handle volunteer form submission
app.post('/submit-volunteer', (req, res) => {
    const { name, email, phone, message } = req.body;
    
    console.log(`Received volunteer application from:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `);

    // Send a JSON response confirming successful receipt
    res.status(200).json({ success: true, message: 'Application received!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
