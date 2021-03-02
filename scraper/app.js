const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const Instabot = require("./instabot");
const CommentsScraper = require('./scrapers/comments');
const bot = new Instabot(process.env.USERNAME, process.env.PW, headless=false);

// test comments
const testComments = require('./test_comments.json');

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

(async () => {
    // await bot.start();
    // await bot.login();
})();

app.get("/api/comments", (req, res) => {
    const url = req.query.url;
    let status = 200;
    let comments = [];
    
    // init comments scraper
    if (bot.loggedIn){
        let commentsScraper = new CommentsScraper(bot.page, url);

        // go to insta post
        commentsScraper.scrape()
            .then(comments => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(comments);
            })
            .catch(err => res.status(500).send(err));
    }else{
        res.status(500).send("Failed to get comments.");
    }
});

app.get("api/likes", (req, res) => {
    url = req.query.url;

    if (url) {

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