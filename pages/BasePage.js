export class BasePage{

    constructor(page){
        this.page = page;
    }

    async navigate(url){
        await this.page.goto(url)
    }

    async clickElement(locator){
        await locator.click();
    }

	 async clickFirstElement(locator){
        await locator.first().click();
    }

    async enterText(locator, value){
        await locator.fill(value)
    }

    async enterFirstText(locator, value){
        await locator.first().fill(value)
    }

    async getText(){
        return await locator.textContent()
    }

    async isVisible(locator){
        return await locator.isVisible()
    }

    async waitForLoad(page){
        await page.waitForLoadState('domcontentloaded');
    }

}