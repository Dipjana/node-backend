const URL = require('../models/url');


async function handleGenerateShortURL(req, res) {
    const body = req.body
    if(!body.url) return res.status(400).json({error : "URL is required"})
    const shortID = shortid( );
    await URL.create({
        shortId: shortID,
        redirectURL : body.url,
        visitHistory : []
    }) 

    return res.status(201).json({shortId : shortID})
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

async function handleGetShortUrlList(req, res) {
 
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
      );
    return res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics,
    handleGetShortUrlList
}
