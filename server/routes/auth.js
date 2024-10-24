const express = require('express')
const { googleAuth, googleRedirect } = require("../controllers/auth");
const router = express.Router();

router.get("/", googleAuth);
router.get("/redirect", googleRedirect);

module.exports = router;
