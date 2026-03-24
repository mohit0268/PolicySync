const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

// Search by username
router.get('/search', policyController.searchPolicy);

// Aggregation
router.get('/aggregate', policyController.aggregatePolicies);

module.exports = router;