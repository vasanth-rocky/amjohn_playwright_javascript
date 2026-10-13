import { test, expect } from '@playwright/test';
import { testData } from '../testdata/testdata.js';
import { BasePage } from '../pages/BasePage.js';
import { HomePage } from '../pages/HomePage.js';
import { PriceValidations } from '../pages/ValidatePriceAndNext.js';
import { SelectProduct } from '../pages/SelectProduct.js';
import { CartPage } from '../pages/CartCheckoutPage.js';

test('Amazon E2E Purchase Flow', async ({ page }) => {

  const basepage = new BasePage(page);
  const homepage = new HomePage(page);
  const validations = new PriceValidations(page);
  const selectProduct = new SelectProduct(page);
  const cartpage = new CartPage(page);

  //Step: 1 - Navigate to url
  await basepage.navigate('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(testData.expectedTitle);

  //Step: 2 - Search the product and click submit. - Homepage.js file
  await homepage.searchAndsubmit();
  await basepage.waitForLoad(page);
  
  // Step: 3 - Set price ranges thru slider.js file
  await homepage.sliderSetPrice(page, testData.minimum, testData.minMinimum, testData.maximum, testData.maxMaximum);
  await basepage.waitForLoad(page);

  // Step: 4 - To validate all pages prices is between ranges thru validationsloops.js file
  //Loop to validate each page price is between input price ranges, and nextPage verifications.
  await validations.validatePriceAndNextButton();

  //Once reached last page and navigate to first page
  // Step: 5 - To validate all pages prices is between ranges thru validationsloops.js file
  const productPage = await selectProduct.firstProduct();
  await basepage.waitForLoad(page);

  // Step: 6 - Cick on cartbutton add quantity and click on checkout.
  await cartpage.cartAndCheckout(productPage);

});