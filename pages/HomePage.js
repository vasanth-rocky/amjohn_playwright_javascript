import {BasePage} from "./BasePage.js"
import { testData } from '../testdata/testdata.js';
import { expect } from "@playwright/test";

export class HomePage extends BasePage{

constructor(page){
    super(page);
    this.page = page;
    this.search = page.locator('#twotabsearchtextbox');
    this.submit = page.locator('#nav-search-submit-button');
    this.minsliderwheel = page.locator('[id="p_36/range-slider_slider-item_lower-bound-slider"]');
    this.maxsliderwheel = page.locator('[id="p_36/range-slider_slider-item_upper-bound-slider"]');
    this.mintextlabel = page.locator('[for="p_36/range-slider_slider-item_lower-bound-slider"]');
    this.maxtextlabel = page.locator('[for="p_36/range-slider_slider-item_upper-bound-slider"]');
}

async searchAndsubmit(){
    await this.enterFirstText(this.search, testData.searchProduct);
    await this.clickElement(this.submit);
}

async sliderSetPrice(page, minimum, minMinimum, maximum, maxMaximum){ 

        await this.minsliderwheel.focus();
        let minPrice = await this.mintextlabel.innerText();
        while(!minPrice.trim().includes(minimum)){
            await this.minsliderwheel.press('ArrowRight');
            minPrice = await this.mintextlabel.innerText();
            if(minPrice.includes(minMinimum)){
                break;
            }
        }

        await this.maxsliderwheel.focus();
        let maxPrice = await this.maxtextlabel.innerText();
        while(!maxPrice.trim().includes(maximum)){
            await this.maxtextlabel.press('ArrowLeft');
            maxPrice = await this.maxtextlabel.innerText();
            if(maxPrice.includes(maxMaximum)){
                break;
            }
        }
    console.log(`Price range set: ₹${minPrice} - ₹${maxPrice}`);
    await page.waitForTimeout(3000);
    }

    async textResults(){
        //Verify "Results" is visible.
        const resultsText = await this.page.locator('//h2[@class="a-size-medium-plus a-spacing-none a-color-base a-text-bold"]').first().innerText();
        expect(resultsText).toBe("Results");    
    }

}

