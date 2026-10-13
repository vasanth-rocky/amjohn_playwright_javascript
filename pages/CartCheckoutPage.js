import { BasePage } from "./BasePage";
import { SelectProduct } from "./SelectProduct";
import { expect } from "@playwright/test";

export class CartPage{

constructor(page){
    this.page = page;
}

async clickonCart(){
     const cartButton = productPage.locator('#add-to-cart-button').nth(1);
     await cartButton.click();
     console.log('First product from the list selected.');
}

async cartAndCheckout(productPage){
      
      await this.clickonCart();
    
      const goToCart = productPage.getByText('Go to Cart');
      await expect(goToCart).toBeVisible();
      await goToCart.click();
      console.log('Product added to cart.')
    
      //Add quantity
      const qty = productPage.locator('//span[@class="a-icon a-icon-small-add"]');
      await expect(qty).toBeVisible();
      await qty.click();
      await productPage.waitForTimeout(2000);
    
      const quantity = productPage.locator('span[data-a-selector="inner-value"]')
    //   await expect(quantity).toHaveText("2");
    
      //checkout
      const checkout = productPage.locator('//input[@name="proceedToRetailCheckout"]')
      await expect(checkout).toBeVisible();
      await checkout.click();
      console.log('Product Checkedout successfully.')
}

}