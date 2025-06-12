// const express = require('express');
// const router = express.Router();
// const { calculateAverage } = require('../controllers/averageController');

// router.post('/', calculateAverage);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { fetchAndCalculateAverage } = require('../controllers/averageController');

// Route: /stocks/:ticker?minutes=m&aggregation=average
router.get('/stocks/:ticker', fetchAndCalculateAverage);

module.exports = router;

