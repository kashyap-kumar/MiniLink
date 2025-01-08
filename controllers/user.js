const { v4: uuidv4 } = require("uuid");
const URL = require("../models/url");
const User = require("../models/user");
const { setUser } = require("../services/auth");

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    await User.create({ name, email, password });
    const allUrls = await URL.find({});

    return res.render("home", {
        urls: allUrls,
    });
}

function handleDirectAccess(req, res) {
    // Send a 405 Method Not Allowed status code
    res.status(405).send("Method Not Allowed");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    const allUrls = await URL.find({});

    if (!user) return res.render("login", { error: "Invalid username or password" });

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    
    return res.render("home", {
        urls: allUrls,
    });
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
    handleDirectAccess,
};
