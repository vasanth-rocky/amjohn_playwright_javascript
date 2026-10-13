export class SelectProduct{

constructor(page){
    this.page = page;
}

async firstProduct(){
    // Once reached last page and navigate to first page
  const firstPage = this.page.locator('a.s-pagination-item').filter({ hasText: /^1$/ });
  await firstPage.scrollIntoViewIfNeeded();
  await firstPage.click();
  await this.page.waitForLoadState('domcontentloaded');
  console.log('Returned to first page.');

  //click on first product and add to cart
  const firstproductlink = this.page.locator('//a[@class="a-link-normal s-line-clamp-3 s-link-style a-text-normal"]').first();

  const [productPage] = await Promise.all([
    this.page.waitForEvent('popup'),
    firstproductlink.click()
  ]);

  console.log('First Product selected.');

  await productPage.waitForLoadState('domcontentloaded');

  return productPage;
}

}