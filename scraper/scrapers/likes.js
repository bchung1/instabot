
class LikesScraper {
    constructor(page){
        this.page = page;
    }

    async scrapeLikes(){
        await this.openLikesModal();
        await this.hoverLikesModal();
    }

    async openLikesModal(){
        // open likes modal
        let selector = "//a[contains(., 'others')]";
        await this.page.waitForXPath(selector);
    }
    
    async hoverLikesModal(){
        // comments modal selector
        let selector = "div[role='dialog'] > div > div:nth-child(2)";
        await this.page.hover(selector);
    }
    
}

export default LikesScraper;