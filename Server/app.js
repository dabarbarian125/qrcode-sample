const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the Client directory
app.use(express.static(path.join(__dirname, 'Client')));

// Use router for API endpoints
app.use('/api', router);  // Only use '/api' for API routes to avoid conflicts with static files

// Route for serving index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
