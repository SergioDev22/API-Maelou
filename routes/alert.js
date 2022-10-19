const express = require("express");
const auth = require("../middleware/auth_user");
const alertController = require("../controllers/alert");

const router = express.Router();

router.post("/send", auth, alertController.sendAlert);

module.exports = router;
