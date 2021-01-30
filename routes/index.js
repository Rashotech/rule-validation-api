// Required files
const express = require('express');
const validate = require('../middleware/error-handler');

// Required Controller
const base = require('../controllers/base-controller');
const validator = require('../controllers/validator-controller');

const router = express.Router();

//Base Route
router.get('/', base);

//Rule Validation Route
router.post('/validate-rule', validate, validator);

module.exports = router;