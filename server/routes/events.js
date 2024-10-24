const express = require('express');
const { events } = require('../controllers/events');
const router = express.Router();

router.get("/", events);

module.exports = router;
