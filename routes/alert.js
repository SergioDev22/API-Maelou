const express = require("express");
const auth = require("../middleware/auth_user");
const alertController = require("../controllers/alert");

const router = express.Router();

router.post("/", auth, alertController.sendAlert);
router.get("/", alertController.getAllAlertNotClosed);
router.patch("/:id", alertController.changeStatusAlert);
router.patch("/close/:id", alertController.markAlerteAsClosed);

module.exports = router;
