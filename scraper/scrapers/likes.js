
class LikesScraper {
    constructor(page){
        this.page = page;
        this.xpath = {
            likesButton: "//a[contains(., 'likes')]",
            likesContainer: "//div[@role='dialog']/div/div[2]/div",
            likes: "//div[@role='dialog']//button[contains(., 'Follow')]/../.."
        }
        this.likes = [];
    }

    async scrapeLikes(){
        await this.openLikesModal();
        let likesContainer = await this.getLikesContainer();
        await this.scrollAndCollectUsers(likesContainer);
        return this.likes;
    }

    async openLikesModal(){
        // open likes modal
        let [likesEl] = await this.page.$x(this.xpath.likesButton);
        await this.page.evaluate(el => el.click(), likesEl);
    }

    async getLikesContainer(){
        await this.page.waitForXPath(this.xpath.likesContainer);
        // capture likes container (scrollable)
        let [likesContainer] = await this.page.$x(this.xpath.likesContainer);
        return likesContainer;
    }

    async scrollAndCollectUsers(likesContainer){
        // this boolean indicates if we found at least 1 new like
        // first time we set to true
        let newLikeFound = true;
        while (newLikeFound) {
            // assume we don't fine anything
            newLikeFound = false;
            // like elements
            await this.page.waitForXPath(this.xpath.likes);
            let likes = await this.page.$x(this.xpath.likes);

            // last like element
            // this element's top attribute is used to scroll to for the next iteration
            let lastLike = likes[likes.length - 1];
            
            // attempt to add each like
            for (let i = 0; i < likes.length; i++){
                let likeAdded = await this.addLike(likes[i]);
                if (likeAdded) {
                    newLikeFound = true;
                }
            }

            // if we find at least 1 new like, then scroll to last like element
            if (newLikeFound){
                console.log("found new like, scrolling page");
                await this.page.evaluate((likes, lastLike) => {
                    likes.scrollTop = lastLike.offsetTop;
                }, likesContainer, lastLike);
            }

            await this.page.waitForTimeout(500);
        }

    }

    async addLike(likeEl){
        let username = await this.page.evaluate(el => {
            let username = el.querySelector("div:nth-child(2) > div:nth-child(1)").innerText;
            return username;
        }, likeEl);

        if (this.likes.includes(username)) {
            return false
        }else{
            this.likes.push(username);
            return true;
        }
    }
    
}

module.exports = LikesScraper;