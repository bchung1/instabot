const puppeteer = require('puppeteer');
require('dotenv').config();
fs = require('fs');

const COOKIES_PATH = "cookies.json"

class InstagramBot {
    constructor(username, password, headless=false){
        this.username = username;
        this.password = password;
        this.browser = null;
        this.page = null;
        this.headless = headless;
        this.loggedIn = false;
    }

    async start(){
        // init browser
        this.browser = await puppeteer.launch({headless: this.headless});
        [this.page] = await this.browser.pages()

        // override user agent
        await this.page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4298.0 Safari/537.36");
        await this.loadCookies();
        await this.page.goto(
            'https://www.instagram.com',
            {
                "waitUntil": "networkidle0"
            })
        // check if cookies were successful and we're logged in
        this.loggedIn = await this.page.$("img[alt='Instagram']") ? true : false;
    }

    async saveCookies(){
        const cookiesObject = await this.page.cookies()
        fs.writeFileSync(COOKIES_PATH, JSON.stringify(cookiesObject));
        console.log('Session has been saved to ' + COOKIES_PATH);
    }

    async loadCookies() {
        // If the cookies file exists, read the cookies.
        const previousSession = fs.existsSync(COOKIES_PATH);
        if (previousSession) {
            const content = fs.readFileSync(COOKIES_PATH);
            const cookiesArr = JSON.parse(content);
            if (cookiesArr.length !== 0) {
                for (let cookie of cookiesArr) {
                    await this.page.setCookie(cookie)
                }
                console.log('Session has been loaded in the browser')
            }
        }
    }

    async stop(){
        await this.browser.close();
    }

    async login() {
        if (!this.loggedIn){
            // click login button
            let [loginButton] = await this.page.$x("//span[contains(text(), 'Log in')]");
            await Promise.all([
                this.page.waitForNavigation(),
                this.page.evaluate(button => button.click(), loginButton)
            ]);

            // wait for email input selector
            await this.page.waitForSelector("input[name='email']");

            // enter username and password
            await this.page.$eval("input[name='email']", (el, username) => el.value = username, this.username);
            await this.page.$eval("input[name='pass']", (el, password) => el.value = password, this.password);

            // login into facebook
            await Promise.all([
                this.page.waitForNavigation({
                    waitUntil: 'networkidle0'
                }),
                this.page.click("button[name='login']")
            ])
            await this.saveCookies();
        }
    }

    async isElementVisible(cssSelector) {
        let visible = true;
        await this.page
          .waitForSelector(cssSelector, { visible: true, timeout: 5000 })
          .catch(() => {
            visible = false;
          });
        return visible;
    };

    async getCommentNodes(){
        let comments = await this.page.$x("//*[@id=\"react-root\"]/section/main/div/div[1]/article/div[3]/div[1]/ul/ul/div/li/div/div/div[2]");
    }

    async loadComments(){
        let comments = [];
        let new_comments = ["dummy"];
        let loadMoreCommentsSelector = "#react-root > section > main > div > div.ltEKP > article > div.eo2As > div.EtaWk > ul > li > div > button";
        // this is called initially in case the page is still rendering
        await this.page.waitForSelector(loadMoreCommentsSelector);
        await this.isElementVisible(loadMoreCommentsSelector);
        while (Object.keys(comments).length != Object.keys(new_comments).length) {
            comments = new_comments;
            await this.page
                .click(loadMoreCommentsSelector)
                .catch(() => {});
            await this.isElementVisible(loadMoreCommentsSelector);
            new_comments = await this.page.$x("//*[@id=\"react-root\"]/section/main/div/div[1]/article/div[3]/div[1]/ul/ul/div/li/div/div/div[2]");
        }
        return comments;
    }

    async getComments(url){
        await this.page.goto(
            url,
            {
                waitUntil: "networkidle0"
            });

        // click continue as user button
        // this may or may not be there
        await this.page.waitForXPath("//a[contains(text(), 'Continue as')]", {timeout: 3000})
            .then(async () => {
                let [continueAsButton] = await this.page.$x("//a[contains(text(), 'Continue as')]");
                await Promise.all([
                    this.page.waitForNavigation({
                        waitUntil: 'networkidle0'
                    }),
                    this.page.evaluate(button => button.click(), continueAsButton)
                ]);
            })
            .catch(() => {
                console.log("Can't find 'Continue as' button. Going to continue.")
            })

        let comments = await this.loadComments();
        return Promise.all(comments.map(async comment => {
            return await this.page.evaluate(comment => {
                let username = comment.querySelector("h3 div a").textContent;
                let commentText = comment.querySelectorAll("span")[1].textContent;

                return {
                    username,
                    comment: commentText
                }
            }, comment);
        }));
    }
}

(async () => {
    let post = process.argv[2];
    let headless = true;
    bot = new InstagramBot(process.env.USERNAME, process.env.PW, headless);
    await bot.start();
    await bot.login();
    // go to insta post
    let comments = await bot.getComments(post);
    console.log(`Scraped ${Object.keys(comments).length} comments`);
    fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
        if (err) return console.log(err);
      });
})();