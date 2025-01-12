const express = require("express");
const { getCryptoStats } = require("../controllers/stats.controller");

const router = express.Router();

router.get("/", getCryptoStats);

module.exports = router;
