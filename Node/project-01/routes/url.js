const express = require("express");
const { handleGenerateShortURL, handleGetAnalytics, handleGetShortUrlList } = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateShortURL);
router.get('/:shortId', handleGetShortUrlList);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;