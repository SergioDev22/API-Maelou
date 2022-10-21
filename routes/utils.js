const express = require("express");
const utilsController = require("../controllers/utils");

const router = express.Router();

router.get("/alerte-type", utilsController.alerteType);
router.get("/status-type", utilsController.statusType);

module.exports = router;
