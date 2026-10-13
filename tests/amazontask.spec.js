import { test, expect } from '@playwright/test';
import { PriceRange } from '../pages/slider.js';
import { testData } from '../testdata/testdata.js';
import { BasePage } from '../pages/BasePage.js';

test('Amazon E2E Purchase Flow', async ({ page }) => {

  const priceRange = new PriceRange(page);
  const basepage = new BasePage(page);

  await basepage.open('/');

  await page.goto('/', {
    waitUntil: 'domcontentloaded'
  });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(testData.expectedTitle);

  await page.locator('#twotabsearchtextbox').first().fill(testData.searchProduct);
  await page.locator('#nav-search-submit-button').click();
  // await page.waitForLoadState('domcontentloaded');

  await base.waitForPageLoad();

  // Set price ranges thru slider
  
  await priceRange.slidernew(page, testData.minimum, testData.minMinimum, testData.maximum, testData.maxMaximum);
  // await priceRange.slidernew(page);
  // await priceRange.setAmazonPriceRange(page, testData.minPrice, testData.maxPrice);
  // await page.waitForLoadState('domcontentloaded');
  await base.waitForPageLoad();

  let pageNumber = 1;
  // await page.waitForTimeout(3000);

  //Loop to validate each page price is between input price ranges, and nextPage verifications.

  while (true) {

    //Display current price ranges:
    const minrange = page.locator(
      'label.sf-lower-bound-label span'
    );
    const maxrange = page.locator(
      'label.sf-upper-bound-label span'
    );
    const minrange1 = await minrange.innerText();
    const maxrange2 = await maxrange.innerText();
    // console.log('The current ranges: ', minrange1, '-', maxrange2);

    const minRange = Number(minrange1.replace(/[₹,]/g, ''));
    const maxRange = Number(maxrange2.replace(/[₹,+]/g, ''));

     await page.waitForTimeout(3000);
  ////older start
    // VALIDATE PRODUCT PRICES
    // const productPrice = await page.locator('//span[@class="a-price" and @data-a-size="xl"]/span[@class="a-offscreen"]').allTextContents();
    const productPrice = await page.locator('//div[@data-component-type="s-search-result"]//span[@class="a-price" and @data-a-size="xl"]/span[@class="a-offscreen"]').allTextContents();
    
    // const prices = await productPrice.textContent();

    // await page.pause();
    await page.waitForTimeout(3000);
    for (const priceText of productPrice) {

      const price = Number(priceText.replace(/[₹,]/g, ''));
      
      try{
      expect(price).toBeGreaterThanOrEqual(minRange);
      expect(price).toBeLessThanOrEqual(maxRange);
      }catch(error){
        await page.pause();
          throw error();
      }
    }

    console.log(`Page ${pageNumber} validation PASSED`);

    // CHECK NEXT BUTTON
    const nextButton = page.locator('.s-pagination-next');

    await nextButton.scrollIntoViewIfNeeded();

    const nextClass = await nextButton.getAttribute('class');

    if (nextClass?.includes('s-pagination-disabled')) {
      console.log('Last page reached.');
      break;
    }

    console.log(`Moving to page ${pageNumber + 1}`);
    await nextButton.click();
    await page.waitForLoadState('domcontentloaded');

    pageNumber++;
    //Loop ends.
  }

  console.log('All pages validated. Returning to first page.');
  //Once reached last page and navigate to first page
  const firstPage = page.locator('a.s-pagination-item').filter({ hasText: /^1$/ });
  await firstPage.scrollIntoViewIfNeeded();
  await firstPage.click();
  await page.waitForLoadState('domcontentloaded');
  console.log('Returned to first page.');

  //click on first product and add to cart
  const firstproductlink = page.locator('//a[@class="a-link-normal s-line-clamp-3 s-link-style a-text-normal"]').first();

  const [productPage] = await Promise.all([
    page.waitForEvent('popup'),
    firstproductlink.click()
  ]);

  console.log('First Product selected.');
  await productPage.waitForLoadState('domcontentloaded');

  const cartButton = productPage.locator('#add-to-cart-button').nth(1);
  await cartButton.click();
  console.log('First product from the list selected.');

  const goToCart = productPage.getByText('Go to Cart');
  await expect(goToCart).toBeVisible();
  await goToCart.click();
  console.log('Product added to cart.')

  //Add quantity
  const qty = productPage.locator('//span[@class="a-icon a-icon-small-add"]');
  await qty.click();
  await productPage.waitForTimeout(2000);

  const quantity = productPage.locator('span[data-a-selector="inner-value"]')
  await expect(quantity).toHaveText("1");

  //checkout
  const checkout = productPage.locator('//input[@name="proceedToRetailCheckout"]')
  await expect(checkout).toBeVisible();
  await checkout.click();
  console.log('Product Checkedout successfully.')

  await productPage.waitForTimeout(5000);
});