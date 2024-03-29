const express = require("express");
const { handleGenerateNewShortURL, handleDirectAccess, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get("/", handleDirectAccess); // Handling direct access to /url by GET request
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;