require('dotenv').config();
const express = require('express');
const cors = require('cors');
const JobCreationFormRoutes = require('./routes/JobCreationForm')


const app = express();
const PORT = process.env.PORT || 4000; // Use environment variable for port

// Middleware
app.use(cors());
app.use(express.json());

// Use the routes from the separate route file
app.use('/api', JobCreationFormRoutes); 


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});
