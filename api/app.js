const express = require('express')
const app = express()

const Instabot = require("./instabot");
const CommentsScraper = require('./scrapers/comments');
const bot = new Instabot(process.env.USERNAME, process.env.PW, headless=false);

const port = process.env.PORT || 3000;

(async () => {
    let postUrl = process.argv[2];
    await bot.start();
    await bot.login();
})();

app.get("/comments", (req, res) => {
    const url = req.query.url;
    let status = 200;
    let comments = [];
    
    // init comments scraper
    if (bot.loggedIn){
        let commentsScraper = new CommentsScraper(bot.page, url);

        // go to insta post
        commentsScraper.scrape()
            .then(comments => {
                res.status(200);
                res.send(comments);
            })
            .catch(err => res.status(500).send(err));
    }else{
        res.status(500).send("Failed to get comments.");
    }
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})