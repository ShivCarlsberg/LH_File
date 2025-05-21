import fs from 'fs';
import puppeteer from 'puppeteer';
import { startFlow } from 'lighthouse';
import { KnownDevices } from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
	//const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();
    const timeout = 60000; // Increased timeout to allow more loading time
    page.setDefaultTimeout(timeout);

    const device = KnownDevices['iPhone 12 Pro'];
    console.log(device);
    // Define the Lighthouse flags with throttling settings
    const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
    const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;

    const flags = {			
        throttlingMethod: 'simulate',
        throttling: {
            throughputKbps: 700,  // Mobile network throughput
            requestLatencyMs: 300 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
            downloadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
            uploadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
			rttMs: 300,  // Mobile network latency
            cpuSlowdownMultiplier: 1  // Simulate slower mobile CPUs   1,2,3,4
        }
    };

    // Emulate device using Puppeteer
    await page.emulate(device);

    for (let i = 0; i < 15; i++) {
        console.log(`Starting iteration ${i + 1}`);

        // Pass the correct settings for Lighthouse emulation and throttling
        const lhFlow = await startFlow(page, {
            name: `Mobile user journey iteration ${i + 1}`,
            flags,
            settings: {
                emulatedDevice: {
                    deviceScaleFactor: 3,  // iPhone 12 Pro scale factor
                    mobile: true,          // Indicate it's a mobile device
                    width: 195,            // iPhone 12 Pro width - 390
                    height: 422,           // iPhone 12 Pro height - 844
                    screenWidth: 195,      // Screen width for the device
                    screenHeight: 422,     // Screen height for the device
                    isMobile: true,        // Indicate mobile device
                    hasTouch: true         // Enable touch events for mobile
                },
                throttlingMethod: 'devtools',
                throttling: flags.throttling // Using the throttling settings defined earlier
            }
        });

        try {

            // Navigate to the home page
            await lhFlow.startNavigation();
            await page.goto('https://lao-sit.1901.carlsberg.com/en', { waitUntil: 'networkidle2' });

			console.log(device);
        // Handle Cookies and Confirm Actions
//        await lhFlow.startTimespan();
//        {
            await page.waitForSelector('#cbg_ccp_cookie_allow_all_btn', { visible: true });
            await page.click('#cbg_ccp_cookie_allow_all_btn'); // Click 'Allow All Cookies'
            console.log('Clicked Allow All Cookies');

            await page.waitForSelector("[data-testid='confirm-action']", { visible: true });
            await page.click("[data-testid='confirm-action']"); // Click 'Confirm Action'
            console.log('Clicked Confirm Action');
 //       }
   //     await lhFlow.endTimespan();
		
		     await lhFlow.endNavigation();


 //           await page.evaluate(() => {
 //               window.scrollBy(0, 1300); // Scrolls 1300 pixels down
   //         });


    // Interact with the Menu button
    await page.waitForSelector("[data-testid='menu-item-Menu'] svg", { visible: true });
    await page.click("[data-testid='menu-item-Menu'] svg");
    console.log('Clicked on Menu button');



await lhFlow.startNavigation();

    // Click the Login link
    await page.waitForSelector('li:nth-of-type(3) span', { visible: true }); // Reliable CSS selector
    await page.click('li:nth-of-type(3) span');
    console.log('Clicked on Login link');

    // Wait for navigation to complete
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

await lhFlow.endNavigation();



await lhFlow.startTimespan();
{
    // Fill in the Phone Number
    await page.waitForSelector('#signInName', { visible: true });
    await page.type('#signInName', '+911234567892'); // Replace with actual data
    console.log('Entered Phone Number');

    // Fill in the Password
    await page.waitForSelector('#password', { visible: true });
    await page.type('#password', 'Password123!'); // Replace with actual data
    console.log('Entered Password');
}
await lhFlow.endTimespan();

await lhFlow.startNavigation();

    // Click the Login button
    await page.waitForSelector('#next', { visible: true });
    await page.click('#next');
    console.log('Submitted Login form');

    // Wait for the navigation after login
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
	
	await page.keyboard.down('Escape');

await lhFlow.endNavigation();

 /*   {
        const targetPage = page;
        await targetPage.keyboard.down('Escape');
    }
*/

           await lhFlow.startNavigation();
            await page.goto('https://lao-sit.1901.carlsberg.com/en/categories/0ZGUD0000003u0r4AA');
            console.log('Navigated to PLP page');
            await lhFlow.endNavigation();

            await lhFlow.startNavigation();
 //         await page.goto('https://lao-sit.1901.carlsberg.com/en/products/0ZGUD0000003u0r4AA/01tUD0000081xHSYAY');
 //			await page.goto('https://lao-sit.1901.carlsberg.com/en/products/01tUD0000081xHNYAY');
			await page.goto('https://lao-sit.1901.carlsberg.com/en/products/01tUD0000081xHSYAY');
            console.log('Navigated to PDP page');
            await lhFlow.endNavigation();
			


			await new Promise(resolve => setTimeout(resolve, 20000)); // Delay for 5 seconds
			
			console.log('Scrolling Down');
			
							await page.evaluate(() => {
    window.scrollBy(0, 700); // Scrolls 100 pixels down
});

            console.log('AddToCart');
            {
                const AddToCart = await Promise.race([
                    //page.waitForSelector("[data-testid='product-card-add-to-cart-button']"),
                     page.waitForSelector('#main section div.grid > div svg:nth-of-type(1) > path'),
                     page.waitForSelector('::-p-xpath(//*[@data-testid=\\"product-card-add-to-cart-button\\"]/svg[1]/path)'),
                     page.waitForSelector(':scope >>> #main section div.grid > div svg:nth-of-type(1) > path')
//                    page.waitForSelector('::-p-text(Add To Cart)')
					 ]);
					await page.click('#main section div.grid > div svg:nth-of-type(1) > path');

            }

await new Promise(resolve => setTimeout(resolve, 3000)); // Delay for 5 seconds
            console.log('Add to cart end');

            await lhFlow.startNavigation();
            await page.goto('https://lao-sit.1901.carlsberg.com/en/cart');
            console.log('Navigated to cart page');
            await lhFlow.endNavigation();
			
			
/*			    {
        const DeleteProduct = await Promise.race([
            page.waitForSelector("[data-testid='delete-from-basket'] > svg"),
            page.waitForSelector('::-p-xpath(//*[@data-testid=\\"delete-from-basket\\"]/svg)'),
            page.waitForSelector(":scope >>> [data-testid='delete-from-basket'] > svg")
        ])
 //           .setTimeout(timeout)
			await page.click("[data-testid='delete-from-basket'] > svg");
    }
	
	*/


            console.log('IncreaseTheCount');
            {
                const IncreaseTheCount = await Promise.race([
                    page.waitForSelector("[data-testid='add-to-basket'] > svg"),
                    page.waitForSelector('::-p-xpath(//*[@data-testid=\\"add-to-basket\\"]/svg)'),
                    page.waitForSelector(":scope >>> [data-testid='add-to-basket'] > svg"),
                    page.waitForSelector('::-p-aria(Increment) >>>> ::-p-aria([role=\\"image\\"])')
                ]);
                await page.click("[data-testid='add-to-basket'] > svg");
            }
			
			await new Promise(resolve => setTimeout(resolve, 3000)); // Delay for 5 seconds


			console.log('Refresh cart');
            {
                const Refreshcart = await Promise.race([
					page.waitForSelector("[data-testid='update-quantity-refresh-button'] > svg"),
					page.waitForSelector('::-p-xpath(//*[@data-testid=\\"update-quantity-refresh-button\\"]/svg)'),
					page.waitForSelector(":scope >>> [data-testid='update-quantity-refresh-button'] > svg")
                ]);
                await Refreshcart.click({
                    offset: {
						x: 13.5625,
						y: 10.73956298828125,
                    }
                });
            }
			
			await new Promise(resolve => setTimeout(resolve, 10000)); // Delay for 5 seconds
			
			

			console.log('Scrolling Down');
			
							await page.evaluate(() => {
			window.scrollBy(0, 1000); // Scrolls 100 pixels down
});

			await new Promise(resolve => setTimeout(resolve, 5000));
			
			await lhFlow.startNavigation();
            console.log('Checkout');
            {
                const Checkout = await Promise.race([
                    page.waitForSelector('div.grid > div.md\\:col-span-4 > div > div > button')
                ]);
                await page.click('div.grid > div.md\\:col-span-4 > div > div > button');
            }
		
			await lhFlow.endNavigation();
			
			
			
			console.log('Select Checkbox');
            {
                const SelectCheckbox = await Promise.race([
                    page.waitForSelector("div.md\\:hidden [data-testid='checkout-terms-container']")
                ]);
                await page.click("div.md\\:hidden [data-testid='checkout-terms-container']");
            }
			
			await new Promise(resolve => setTimeout(resolve, 3000));
			
			await lhFlow.startNavigation();
			console.log('PlaceOrder');
            {
                const PlaceOrder = await Promise.race([
                    page.waitForSelector("div.md\\:hidden > [data-testid='checkout-terms-and-conditions-button'] > span")
                ]);
                await page.click("div.md\\:hidden > [data-testid='checkout-terms-and-conditions-button'] > span");
            }
			await lhFlow.endNavigation();
			
			
			
			
/*
			await page.goto('https://lao-sit.1901.carlsberg.com/en/cart');
            console.log('Navigated back to cart page');

			
			console.log('ClearTheCart');
            {
                const ClearTheCart = await Promise.race([
//                    page.waitForSelector('::-p-aria(Clear the cart) >>>> ::-p-aria([role=\\"generic\\"])'),
                    page.waitForSelector('div.md\\:col-span-4 span'),
                    page.waitForSelector('::-p-xpath(//*[@id=\\"main\\"]/div[2]/div[3]/div/div/div[2]/button/span)'),
                    page.waitForSelector(':scope >>> div.md\\:col-span-4 span'),
					page.waitForSelector('::-p-text(Clear the cart)')
                ]);
                await page.click('::-p-aria(Clear the cart) >>>> ::-p-aria([role=\\"generic\\"])');
            }
			
			

			
				console.log('EmptyCart');
            {
                const EmptyCart = await Promise.race([
                    page.waitForSelector('::-p-aria(Empty Cart)'),
                    page.waitForSelector("[data-testid='basket-checkout-overlay'] button.text-inverse-primary"),
                    page.waitForSelector('::-p-xpath(//*[@data-testid=\\"basket-modal-checkout-buttons\\"]/button[1])'),
                    page.waitForSelector(":scope >>> [data-testid='basket-checkout-overlay'] button.text-inverse-primary"),
					page.waitForSelector('::-p-text(Empty Cart)')
                ]);
                await page.click('::-p-aria(Empty Cart)');
            }
			*/
			
			    {
        const clickmenu = await Promise.race([
            page.waitForSelector('::-p-aria(Menu)'),
            page.waitForSelector("[data-testid='menu-item-Menu'] > button"),
            page.waitForSelector('::-p-xpath(//*[@data-testid=\\"menu-item-Menu\\"]/button)'),
            page.waitForSelector(":scope >>> [data-testid='menu-item-Menu'] > button"),
            page.waitForSelector('::-p-text(Menu)')
        ])
			await page.click('::-p-aria(Menu)');
    }
		await new Promise(resolve => setTimeout(resolve, 2000));
    {
        const clickmenu = await Promise.race([
            page.waitForSelector('::-p-aria(My Account)'),
            page.waitForSelector('li.md\\:px-4xs button'),
            page.waitForSelector('::-p-xpath(//*[@data-testid=\\"action-menu-group\\"]/li[3]/div/button)'),
            page.waitForSelector(':scope >>> li.md\\:px-4xs button')
        ])
			await page.click('::-p-aria(My Account)');
    }
	
	
	await new Promise(resolve => setTimeout(resolve, 2000));
		
		
		
		    await lhFlow.startNavigation();
            await page.waitForSelector('div.flex-start span', { timeout });
            await page.click('div.flex-start span');
            console.log('Clicked Sign out');
           // await Promise.all(promises);
            await lhFlow.endNavigation();





            // Generate Lighthouse report
            const lhFlowReport = await lhFlow.generateReport();
            fs.writeFileSync(`./Report/SIT/30April_Mobile_place_order/flow_${i + 1}.report.html`, lhFlowReport);
            console.log(`Report for iteration ${i + 1} saved.`);
        } catch (error) {
            console.error(`Error during iteration ${i + 1}:`, error);

            // Generate a report up to the point of failure
            const failureReport = await lhFlow.generateReport();
            fs.writeFileSync(`./Report/SIT/30April_Mobile_place_order/flow_${i + 1}_failure.report.html`, failureReport);
            console.log(`Failure report for iteration ${i + 1} saved.`);

            // Clear cookies and cache after failure
            const client = await page.target().createCDPSession();
            await client.send('Network.clearBrowserCookies');
            await client.send('Network.clearBrowserCache');
            console.log(`Cleared cookies and cache for failed iteration ${i + 1}`);
        }

        // Clear cookies and cache
        const client = await page.target().createCDPSession();
        await client.send('Network.clearBrowserCookies');
        await client.send('Network.clearBrowserCache');
        console.log(`Cleared cookies and cache for iteration ${i + 1}`);
    }

    await browser.close();
})().catch(err => {
    console.error(err);
    process.exit(1);
});