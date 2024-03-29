// Om gam ganapataye namo namaha

const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");

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
app.use(express.urlencoded({ extended: false })) // server supports form data
app.use(express.static("public"));

app.use("/", staticRoute);
app.use("/url", urlRoute);

// when someone visit a short link
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                'visitHistory': { timestamp: Date.now() }
            }
        }
    );
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
