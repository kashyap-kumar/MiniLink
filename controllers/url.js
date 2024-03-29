const { nanoid } = require("nanoid"); // for generating random unique id
const URL = require("../models/url");

// for creating new short id or url
async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url)
        return res.status(400).json({ error: "url is required" });

    const shortId = nanoid(8);

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    })

    const allUrls = await URL.find({});

    return res.render("home", { id: shortId, urls: allUrls });
    // return res.json({ id: shortId });
}

function handleDirectAccess(req, res) {
    // Send a 405 Method Not Allowed status code
    res.status(405).send("Method Not Allowed");
};

// for analytics
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleDirectAccess,
    handleGetAnalytics
}