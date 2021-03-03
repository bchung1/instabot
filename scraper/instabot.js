const puppeteer = require('puppeteer');
require('dotenv').config();
fs = require('fs');

const COOKIES_PATH = "cookies.json"

class Instabot {
    constructor(username, password, headless=false){
        this.username = username;
        this.password = password;
        this.headless = headless;
        this.browser = null;
        this.page = null;
        this.loggedIn = false;
    }

    async goTo(url){
        await this.page.goto(
            url,
            {
                waitUntil: "networkidle0"
            });
    }

    async start(){
        // init browser
        this.browser = await puppeteer.launch({
            defaultViewport: null,
            headless: this.headless
        });
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
}

module.exports = Instabot;