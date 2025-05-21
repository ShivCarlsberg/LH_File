import fs from 'fs';
import puppeteer from 'puppeteer';
import { startFlow, desktopConfig } from 'lighthouse';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const timeout = 60000; // Increased timeout to allow more loading time
    page.setDefaultTimeout(timeout);

    // Throttling and Emulation Configuration
    const flags = {
        screenEmulation: {
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false, // Enable screen emulation
        },
        throttlingMethod: 'devtools', // Apply throttling via Chrome DevTools
        throttling: {
            rttMs: 40,                // Round Trip Time in ms
            throughputKbps: 10240,    // Network throughput (10 Mbps)
            cpuSlowdownMultiplier: 1, // No CPU slowdown
			requestLatencyMs: 0, // 0 means unset
			downloadThroughputKbps: 0,
			uploadThroughputKbps: 0,
        },
    };

    const config = desktopConfig; // Using desktop configuration

    for (let i = 0; i < 15; i++) { // Loop to run 15 iterations
        console.log(`Starting iteration ${i + 1}`);

        const lhFlow = await startFlow(page, { name: `user journey till pdp iteration ${i + 1}`, config, flags });
        try {
            await page.setViewport({
                width: 1350,
                height: 940 // Adjust height for better visibility
            });

            await page.goto('chrome://newtab/');
            console.log('Navigated to new tab');

            await lhFlow.startNavigation();
            await page.goto('https://la-sit.1901.carlsberg.com/en');
            console.log('Navigated to home page');

            await page.waitForSelector('#cbg_ccp_cookie_allow_all_btn', { timeout });
            await page.click('#cbg_ccp_cookie_allow_all_btn');
            console.log('Clicked Allow all cookies');

            await page.waitForSelector("[data-testid='confirm-action']", { timeout });
            await page.click("[data-testid='confirm-action']");
            console.log('Clicked confirm action');
            await lhFlow.endNavigation();
			
			
            await lhFlow.startNavigation();
            const promises = [];
            const startWaitingForEvents = () => {
                promises.push(page.waitForNavigation());
            };
            startWaitingForEvents();
//            await page.waitForSelector("[data-testid='login-action-item']", { timeout });
//            await page.click("[data-testid='login-action-item']");
			await page.waitForSelector('li:nth-of-type(3) span', { visible: true }); // Reliable CSS selector
			await page.click('li:nth-of-type(3) span'); // Click the 'Log in' button
            console.log('Clicked login action item');
            await Promise.all(promises);
            await lhFlow.endNavigation();

            await lhFlow.startTimespan();
            await page.waitForSelector('#signInName', { timeout });
            await page.type('#signInName', '+911234567892');
            console.log('Entered phone number');

            await page.waitForSelector('#password', { timeout });
            await page.type('#password', 'Password123!');
            console.log('Entered password');
            await lhFlow.endTimespan();

            await lhFlow.startNavigation();
            startWaitingForEvents();
            await page.waitForSelector('#next', { timeout });
            await page.click('#next');
            console.log('Clicked next');
            await Promise.all(promises);
            await lhFlow.endNavigation();

            console.log('Landing page post login completed');
	
    {
        const targetPage = page;
        await targetPage.keyboard.down('Escape');
    }


            console.log('Search started');
	

	await lhFlow.startTimespan();
    {
        const searchtab = await Promise.race([
            page.waitForSelector('::-p-aria(Search) >>>> ::-p-aria([role=\\"image\\"])'),
            page.waitForSelector("[data-testid='action-menu-group'] > li:nth-of-type(1) svg"),
            page.waitForSelector('::-p-xpath(//*[@data-testid=\\"search-action-item\\"]/svg)'),
            page.waitForSelector(":scope >>> [data-testid='action-menu-group'] > li:nth-of-type(1) svg")
        ])
await searchtab.click({
              offset: {
                x: 15.2239990234375,
                y: 8.015625,
              },
            });
    }
			await new Promise(resolve => setTimeout(resolve, 3000)); // Delay for 5 seconds	
    {
        const entertext = await Promise.race([
            page.waitForSelector('::-p-aria([role=\\"dialog\\"]) >>>> ::-p-aria([role=\\"textbox\\"])'),
            page.waitForSelector("[data-testid='search-input']"),
            page.waitForSelector('::-p-xpath(//*[@data-testid=\\"search-input\\"])'),
            page.waitForSelector(":scope >>> [data-testid='search-input']")
        ])
            //.setTimeout(timeout)
            //.fill('Pepsi Cola 480ml PET Bottle x24');
			await entertext.type('Pepsi Cola 480ml PET Bottle x24');
    }
    await lhFlow.endTimespan();
	
				await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds
				
    await lhFlow.startNavigation();
	{
        const searchpage = await Promise.race([
            page.waitForSelector('::-p-aria(Search for \\"Pepsi Cola 480ml PET Bottle x24\\") >>>> ::-p-aria([role=\\"generic\\"])'),
            page.waitForSelector("[data-testid='search-overlay'] span"),
            page.waitForSelector('::-p-xpath(//*[@data-testid=\\"search-overlay\\"]/div/div[2]/div/a/span)'),
            page.waitForSelector(":scope >>> [data-testid='search-overlay'] span"),
            page.waitForSelector('::-p-text(Search for \\"Pepsi)')
        ])
await searchpage.click({
              offset: {
                x: 175.01043701171875,
                y: 12.0390625,
              },
            });
    }
    await lhFlow.endNavigation();
	
/*    
	await lhFlow.startNavigation();
    {
        const pdppage = await Promise.race([
            page.waitForSelector('::-p-aria(Pepsi Cola 480ml PET Bottle x24[role=\\"image\\"])'),
            page.waitForSelector('#main img'),
            page.waitForSelector('::-p-xpath(//*[@data-testid=\\"product-card-10PSC480P-MC24-SF0\\"]/div[2]/a/div/picture/img)'),
            page.waitForSelector(':scope >>> #main img')
        ])
		await pdppage.click({
              offset: {
                x: 68.59637451171875,
                y: 139.51824951171875,
              },
            });
    }
	await lhFlow.endNavigation();
	
	await lhFlow.startTimespan();
    {
        const addtocart = await Promise.race([
            page.waitForSelector('::-p-aria(Add To Cart Pepsi Cola 480ml PET Bottle x24)'),
            page.waitForSelector("[data-testid='product-card-add-to-cart-button']"),
            page.waitForSelector('::-p-xpath(//*[@data-testid=\\"product-card-add-to-cart-button\\"])'),
            page.waitForSelector(":scope >>> [data-testid='product-card-add-to-cart-button']")
        ])
            await addtocart.click({
              offset: {
                x: 203.59375,
                y: 17.33856201171875,
              },
            });
    }
			
	await lhFlow.endTimespan();	
*/




            await lhFlow.startNavigation();
            await page.goto('https://la-sit.1901.carlsberg.com/en/categories/0ZGUD0000003u0r4AA');
            console.log('Navigated to PLP page');
            await lhFlow.endNavigation();

            await lhFlow.startNavigation();
 //         await page.goto('https://la-sit.1901.carlsberg.com/en/products/0ZGUD0000003u0r4AA/01tUD0000081xHSYAY');
			await page.goto('https://la-sit.1901.carlsberg.com/en/products/01tUD0000081xHSYAY');
            console.log('Navigated to PDP page');
            await lhFlow.endNavigation();
			
			await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds
            console.log('AddToCart');
            {
                const AddToCart = await Promise.race([
                    //page.waitForSelector("[data-testid='product-card-add-to-cart-button']"),
                    page.waitForSelector('::-p-xpath(//*[@data-testid=\\"product-card-add-to-cart-button\\"])'),
                    page.waitForSelector(":scope >>> [data-testid='product-card-add-to-cart-button']"),
                    page.waitForSelector('::-p-aria(Add To Cart Somersby Watermelon 330ml Bottle x24 \\(Crate\\))'),
                    page.waitForSelector('::-p-text(Add To Cart)')
                ]);
                await AddToCart.click({
                    offset: {
                        x: 129.6666259765625,
                        y: 34.666656494140625
                    }
                });
            }

			await new Promise(resolve => setTimeout(resolve, 3000)); // Delay for 5 seconds
			
            console.log('Add to cart end');

            await lhFlow.startNavigation();
            await page.goto('https://la-sit.1901.carlsberg.com/en/cart');
            console.log('Navigated to cart page');
            await lhFlow.endNavigation();

            console.log('IncreaseTheCount');
            {
                const IncreaseTheCount = await Promise.race([
                    page.waitForSelector("[data-testid='add-to-basket'] > svg"),
                    page.waitForSelector('::-p-xpath(//*[@data-testid=\\"add-to-basket\\"]/svg)'),
                    page.waitForSelector(":scope >>> [data-testid='add-to-basket'] > svg"),
                    page.waitForSelector('::-p-aria(Increment) >>>> ::-p-aria([role=\\"image\\"])')
                ]);
                await IncreaseTheCount.click({
                    offset: {
                        x: 12.11456298828125,
                        y: 22.333328247070312
                    }
                });
            }
			
			await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds


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
			
			await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds
			

             console.log('Checkout');
            await lhFlow.startNavigation();
            const Checkout = await page.waitForSelector('div.grid > div.md\\:col-span-4 > div > div > button');
            await Checkout.click({
                offset: { x: 170.89581298828125, y: 27 }
            });
            await lhFlow.endNavigation();
            console.log('Checkout end');


            console.log('CheckButton');
            const CheckButton = await page.waitForSelector("[data-testid='checkout-details-cart-info-container'] [data-testid='checkout-terms-container']");
            await CheckButton.click({
                offset: { x: 15.5625, y: 7.33331298828125 }
            });

           await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds

            await lhFlow.snapshot();

            console.log('PlaceOrder');
            await lhFlow.startNavigation();
            const PlaceOrder = await page.waitForSelector("[data-testid='checkout-details-cart-info-container'] > [data-testid='checkout-terms-and-conditions-button'] > span");
            await PlaceOrder.click({
                offset: { x: 38.48956298828125, y: 5.33331298828125 }
            });
            startWaitingForEvents();
            await Promise.all(promises);
            await lhFlow.endNavigation();

            await lhFlow.snapshot();




		
/*		
			await page.goto('https://la-sit.1901.carlsberg.com/en/cart');
            console.log('Navigated back to cart page');

			console.log('Clear the cart start');
    {
			const ClearTheCart = await Promise.race([
            page.waitForSelector('::-p-aria(Clear the cart) >>>> ::-p-aria([role=\\"generic\\"])'),
            page.waitForSelector('div.md\\:col-span-4 span'),
            page.waitForSelector('::-p-xpath(//*[@id=\\"main\\"]/div[2]/div[2]/div/div/div[2]/button/span)'),
            page.waitForSelector(':scope >>> div.md\\:col-span-4 span'),
            page.waitForSelector('::-p-text(Clear the cart)')
        ])
            await ClearTheCart.click({
              offset: {
                x: 33.53125,
                y: 9.33331298828125,
              },[
            });
    }
	console.log('Clear the cart End');
	
	 await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds
	 
	console.log('Empty Cart start');
    {
        const EmptyCart = await Promise.race([
            page.waitForSelector('::-p-aria(Empty Cart)'),
            page.waitForSelector("[data-testid='basket-checkout-overlay'] button.text-inverse-primary"),
            page.waitForSelector('::-p-xpath(//*[@data-testid=\\"basket-modal-checkout-buttons\\"]/button[1])'),
            page.waitForSelector(":scope >>> [data-testid='basket-checkout-overlay'] button.text-inverse-primary"),
            page.waitForSelector('::-p-text(Empty Cart)')
        ])
            await EmptyCart.click({
              offset: {
                x: 53.2603759765625,
                y: 28.166656494140625,
              },
            });
    }
	
	console.log('Clear the cart End');
	
	
*/	
	await new Promise(resolve => setTimeout(resolve, 5000)); // Delay for 5 seconds


            await page.waitForSelector('li.md\\:px-4xs svg', { timeout });
            await page.click('li.md\\:px-4xs svg');
            console.log('Clicked My Account');

            await lhFlow.startNavigation();
            await page.waitForSelector('div.flex-start span', { timeout });
            await page.click('div.flex-start span');
            console.log('Clicked Sign out');
            await Promise.all(promises);
            await lhFlow.endNavigation();

            const lhFlowReport = await lhFlow.generateReport();
            fs.writeFileSync(`./Report/SIT/20May_Desktop_place_order_LA/flow_${i + 1}.report.html`, lhFlowReport);
            console.log(`Report for iteration ${i + 1} saved.`);
        } catch (error) {
            console.error(`Error during iteration ${i + 1}:`, error);

            // Generate a report up to the point of failure
            const failureReport = await lhFlow.generateReport();
            fs.writeFileSync(`./Report/SIT/20May_Desktop_place_order_LA/flow_${i + 1}_failure.report.html`, failureReport);
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
