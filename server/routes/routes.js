const express = require("express");
const router = express.Router();
const googleRoute = require('./auth')
const eventRoute = require('./events')
router.use("/google", googleRoute);
router.use("/events", eventRoute);

module.exports = router;
