const express = require("express");
const auth = require("../middleware/auth_user");
const authAdmin = require("../middleware/auth_admin");
const alertController = require("../controllers/alert");

const router = express.Router();

router.post("/", auth, alertController.sendAlert);
router.get("/my-alert", auth, alertController.getAlerPerUser);
router.get("/", authAdmin, alertController.getAllAlertNotClosed);
router.patch("/:id", authAdmin, alertController.changeStatusAlert);
router.patch("/close/:id", authAdmin, alertController.markAlerteAsClosed);

module.exports = router;
