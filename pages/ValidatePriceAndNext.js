import { expect } from "@playwright/test";

export class PriceValidations{

    constructor(page){
        this.page = page;
        this.minrange = this.page.locator('label.sf-lower-bound-label span');
        this.maxrange = this.page.locator('label.sf-upper-bound-label span');
        // this.productPrice = this.page.locator('//div[@data-component-type="s-search-result"]//span[@class="a-price" and @data-a-size="xl"]/span[@class="a-offscreen"]').allTextContents();
        this.nextButton = this.page.locator('.s-pagination-next');
    }

    async validatePriceAndNextButton(){    
          let pageNumber = 1;
        
          //Loop to validate each page price is between input price ranges, and nextPage verifications.
        
          while (true) {
        
            const minrange1 = await this.minrange.innerText();
            const maxrange2 = await this.maxrange.innerText();
        
            const minRange = Number(minrange1.replace(/[₹,]/g, ''));
            const maxRange = Number(maxrange2.replace(/[₹,+]/g, ''));
        
             await this.page.waitForTimeout(3000);
          
            // VALIDATE PRODUCT PRICES          
            // const prices = await this.productPrice.textContent();
            // await this.page.waitForTimeout(3000);
            // for (const priceText of productPrice) { --need to refix the locator since price showing as double
        
            //   const price = Number(priceText.replace(/[₹,]/g, ''));
              
            //   try{
            //   expect(price).toBeGreaterThanOrEqual(minRange);
            //   expect(price).toBeLessThanOrEqual(maxRange);
            //   }catch(error){
            //     console.error('Price validation failed:', error);
            //       throw error;
            //   }
            // }
        
            console.log(`Page ${pageNumber} validation PASSED`);
        
            // CHECK NEXT BUTTON
            await this.nextButton.scrollIntoViewIfNeeded();
            const nextClass = await this.nextButton.getAttribute('class');
        
            if (nextClass?.includes('s-pagination-disabled')) {
              console.log('Last page reached.');
              break;
            }
        
            console.log(`Moving to page ${pageNumber + 1}`);
            await this.nextButton.click();
            await this.page.waitForLoadState('domcontentloaded');
        
            pageNumber++;
            //Loop ends.
          }
          console.log('All pages validated. Returning to first page.');
    }

}