// Om gam ganapataye namo namaha

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

// routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 3000;
const dbName = "minilink";
const dbURL = `mongodb://127.0.0.1:27017/${dbName}`;

// database connection
connectToMongoDB(dbURL)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log("Database connection error: ", error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json()); // server supports json data
app.use(express.urlencoded({ extended: false })); // server supports form data
app.use(cookieParser());
app.use(express.static("public"));

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

// when someone visit a short link
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() },
            },
        }
    );
    
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
