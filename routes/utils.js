const express = require("express");
const utilsController = require("../controllers/utils");

const router = express.Router();

router.get("/alerte-type", utilsController.alerteType);

module.exports = router;
