const express = require("express");
const authAdmin = require("../middleware/auth_admin");
const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/login", adminController.login);
router.post("/register", authAdmin, adminController.register);

module.exports = router;
