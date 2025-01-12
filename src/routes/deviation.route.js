const express = require("express");
const { getPriceDeviation } = require("../controllers/deviation.controller");

const router = express.Router();

router.get("/", getPriceDeviation);

module.exports = router;
