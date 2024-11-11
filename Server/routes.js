//routes.js

const express = require('express');
const controller = require('./controller');

const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.post('/generate-qr', controller.generateQR);

module.exports = router;