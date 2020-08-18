// <<< ----- ENTER YOUR LOGIN DATA AND SPECIFY TARGET-PAGE HERE ----- >>>
	const mail = `my-mail-adress@my-provider.org`;
	const password = `myPassword`;
	const targetPage = `enter full link to your specific wg offer`;
	// targetPage should roughly look like this:
	// `https://www.wg-gesucht.de/angebot-bearbeiten.html?action=update_offer&offer_id=1234567`
// <<< -------------------------------------------------------------- >>>

/*	If you run into any errors and need to fix 'em, you can use the following code to take
	a screenshot of the state right bevor the exception. Therefor just check the console
	output and put the screenshot-code right before the line that causes the error. I found
	this quite useful to detect incomplete entry-fields and monitor if the page state works
	as expected.
	
	await page.screenshot({ path: 'test.png', fullPage: true });
*/

// Setup puppeteer options
const args = [
	'--no-sandbox',
	'--disable-setuid-sandbox',
	'--disable-infobars',
	'--window-position=0,0',
	'--ignore-certificate-errors',
	'--ignore-certificate-errors-spki-list',
	'--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
];
const options = {
	args,
	headless: true,
	ignoreHTTPSErrors: true,
//	executablePath: '/usr/bin/chromium-browser',	// specify if you need use a standaline chromium version
};

const puppeteer = require( 'puppeteer-extra' );
const stealthPlugin = require( 'puppeteer-extra-plugin-stealth' );
puppeteer.use( stealthPlugin );

// Run refresh-function
refreshMyOffer();

async function refreshMyOffer(){
	
	// launch puppeteer, create new tab, go to specified targetPage
	console.log( 'starting puppeteer...' );
	const browser = await puppeteer.launch( options );
	console.log( 'opening target page...' );
	const page = await browser.newPage();
	// set ViewPort to 1600x1024 as an attempt to make it appear as a desktop-browser
	await page.setViewport( { width: 1600, height: 1024 } );
	await page.goto( targetPage, { waitUntil: 'networkidle0' } );
	
	// Accept Cookies
	if( await page.$( `a[onclick="window.cmpmngr.setConsentViaBtn(1); return false"]` ) !== null ) {
		await page.click( `a[onclick="window.cmpmngr.setConsentViaBtn(1); return false"]` );
	}
	
	// Get login-button and click it
	console.log( 'selecting login...' );
	const loginButton = await page.$x( "//button[contains(., 'Login')]" );
	await loginButton[0].click( { delay: 20 } );
	
	// Enter login-data
	console.log( 'entering login-data...' );
	await page.waitForSelector( '#login_email_username', { visible: true } );
	await page.waitForSelector( '#login_password', { visible: true } );
	await page.waitFor( '*' );
	const mailEntryField = await page.$( 'input[id=login_email_username]' );
	await page.evaluate( (mailEntryField, mail) => 
		{ 
			mailEntryField.setAttribute( 'value', mail ); 
		}, mailEntryField, mail );
	await page.waitFor( '*' );
	const passwordEntryField = await page.$( 'input[id=login_password]' );
	await page.evaluate( (passwordEntryField, password) => 
		{ 
			passwordEntryField.setAttribute( 'value', password ); 
		}, passwordEntryField, password );
	await page.waitFor( '*' );
	
	// Uncheck stay-connected-checkbox
	const cb = await page.$x( "//label[contains(., 'Angemeldet bleiben')]" );
	await cb[0].click();
	await page.waitFor( 2000 );
	
	// Click login-button
	await page.click( '#login_submit', { delay: 20 } );
	await page.waitFor( 2000 );
	
	// Click refresh-button
	console.log( 'click refresh offer...' );
	await page.waitForSelector( '#update_offer_nav', { visible: true } );
	await page.click( '#update_offer_nav', { delay: 20 } );
	
	// Logout
	console.log( 'logging out...' );
	await page.hover( `a[onclick="ga('send', 'event', 'service_navigation', 'username', '1st_level');"]` );
	await page.waitForSelector( `a[onclick="ga('send', 'event', 'service_navigation', 'logout', '2nd_level');"]`, { visible: true } );
	await page.click( `a[onclick="ga('send', 'event', 'service_navigation', 'logout', '2nd_level');"]`, { delay: 20 } );
	
	// Close browser
	console.log( 'closing browser...' );
	await browser.close();
	console.log( 'I am done!' );
}
