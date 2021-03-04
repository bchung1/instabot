const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const Instabot = require("./instabot");

// scrapers
const CommentsScraper = require('./scrapers/comments');
const LikesScraper = require('./scrapers/likes');

const bot = new Instabot(process.env.USERNAME, process.env.PW, headless=false);

// test comments
const testComments = require('./test_comments.json');

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

(async () => {
    await bot.start();
    await bot.login();
})();

app.get("/api/comments", async (req, res) => {
    const url = req.query.url;
    let status = 200;
    let comments = [];
    
    // init comments scraper
    if (bot.loggedIn){
        let commentsScraper = new CommentsScraper(bot.page, url);

        // go to insta post
        await bot.goTo(url);

        // scrape post
        commentsScraper.scrape()
            .then(comments => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(comments);
            })
            .catch(err => res.status(500).send(err));
    }else{
        res.status(500).send("Instabot not logged in.");
    }
});

app.get("/api/likes", async (req, res) => {
    url = req.query.url;

    if (url) {
        if (bot.loggedIn){
            // go to page
            await bot.goTo(url);

            // get likes
            let scraper = new LikesScraper(bot.page);
            let likes = await scraper.scrapeLikes();
            res.send(likes).status(200);
        }else{
            res.status(500).send("Instabot not logged in.");
        }
    }else{
        res.status(500).send("Missing required parameter \"url\".")
    }
});

app.get("/api/comments/test", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(testComments);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})