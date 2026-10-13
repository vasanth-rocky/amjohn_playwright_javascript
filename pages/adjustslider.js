export class PriceRange {

    constructor(page) {
        this.page = page;
        this.minSlider = page.locator('input[aria-label="Minimum price"]');
        this.maxSlider = page.locator('input[aria-label="Maximum price"]');
        // this.minsliderwheel = page.locator('[id="p_36/range-slider_slider-item_lower-bound-slider"]');
        // this.maxsliderwheel = page.locator('[id="p_36/range-slider_slider-item_upper-bound-slider"]');
        // this.mintextlabel = page.locator('[for="p_36/range-slider_slider-item_lower-bound-slider"]');
        // this.maxtextlabel = page.locator('[for="p_36/range-slider_slider-item_upper-bound-slider"]');
    }

    async setPriceRanges(page, minPrice, maxPrice) {

        await this.minSlider.waitFor({ state: 'visible' });
        await this.maxSlider.waitFor({ state: 'visible' });

        // -------------------------
        // Minimum price
        // -------------------------

        await this.minSlider.focus();

        while (true) {

            const minText = await this.minSlider.getAttribute('aria-valuetext');

            if (minText) {

                const currentMin = Number(
                    minText.replace(/[₹,+]/g, '').replace(/,/g, '')
                );

                if (currentMin >= minPrice) {
                    break;
                }
            }

            await this.minSlider.press('ArrowRight');

        }

        // -------------------------
        // Maximum price
        // -------------------------

        await this.maxSlider.focus();

        let maxAttempts = 0;

        while (true) {

            const maxText = await this.maxSlider.getAttribute('aria-valuetext');

            if (maxText) {

                const currentMax = Number(
                    maxText.replace(/[₹,+]/g, '').replace(/,/g, '')
                );

                if (currentMax <= maxPrice) {
                    break;
                }
            }

            await this.maxSlider.press('ArrowLeft');

        }

        console.log(`Price range set: ₹${minPrice} - ₹${maxPrice}`);
    }

//     async sliderSetPrice(page, minimum, minMinimum, maximum, maxMaximum){ 

//         await this.minsliderwheel.focus();
//         let minPrice = await this.mintextlabel.innerText();
//         while(!minPrice.trim().includes(minimum)){
//             await this.minsliderwheel.press('ArrowRight');
//             minPrice = await this.mintextlabel.innerText();
//             if(minPrice.includes(minMinimum)){
//                 break;
//             }
//         }

//         await this.maxsliderwheel.focus();
//         let maxPrice = await this.maxtextlabel.innerText();
//         while(!maxPrice.trim().includes(maximum)){
//             await this.maxtextlabel.press('ArrowLeft');
//             maxPrice = await this.maxtextlabel.innerText();
//             if(maxPrice.includes(maxMaximum)){
//                 break;
//             }
//         }
// console.log(`Price range set: ₹${minPrice} - ₹${maxPrice}`);
//     }

}