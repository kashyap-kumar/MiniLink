// Om gam ganapataye namo namaha

const express = require("express");
const urlRoute = require("./routes/url");
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

app.use(express.json());
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

app.listen(PORT, () => console.log(`Server started at http://localhost:${3000}`));
