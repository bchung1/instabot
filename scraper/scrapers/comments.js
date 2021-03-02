
class CommentsScraper {

    constructor(page, postUrl){
        this.page = page;
        this.postUrl = postUrl
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

    async loadComments(){
        // this.page.screenshot({"page": "screenshot.png"});
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

    async scrape(){
        await this.page.goto(
            this.postUrl,
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

module.exports = CommentsScraper;