const express = require("express");
const { handleUserSignUp, handleDirectAccess, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignUp);
router.get("/", handleDirectAccess); // Handling direct access to /url by browser
router.post("/login", handleUserLogin);

module.exports = router;