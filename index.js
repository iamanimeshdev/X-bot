require('dotenv').config();

const { Builder, By, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome')

const BasePage = require("./WebPage")

async function sleep(timeInS) {
	await new Promise((resolve) => setTimeout(resolve, timeInS * 1000))
}

async function startBot() {
    let page;
	try {
        page = new BasePage();
        let site = "https://x.com/i/flow/login";
        await page.visit(site);
        await sleep(10)

        await page.signin();
        await sleep(3)

        site = "https://x.com/compose/post";
        await page.visit(site);

		await page.post();
    } catch (err) {
        console.error("Error in startBot:", err);
    } finally {
        if (page) {
            try {
                await page.quit();
            } catch (quitErr) {
                console.error("Error quitting page:", quitErr);
            }
        }
    }
}


(async () => {
    await startBot()
})()
