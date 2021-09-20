'use strict';
const loginLink = "https://yourstory.com/companies/search?page=1&hitPerPage=20"
const puppeteer = require("puppeteer")
let browserStartPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--disable-notifications"]
});
let page, element, browser;
(async function fn() {
    try {
        let browserObj = await browserStartPromise;
        console.log("Browser opened");
        browser = browserObj
        page = await browserObj.newPage();
        await page.goto(loginLink);
        let val = []
        for (let i = 2; i < 20; i++) {
            let temp = []
            for(let k=2; k<=6; k++){
                await page.waitForSelector(`#root > main > div > main > section > div.sc-jSFjdj.hNVHSH > div.sc-gKAaRy.fCcgGo > table > tr:nth-child(${i}) > td:nth-child(${k}) > a > div`);
                let someLit = await page.$$(`#root > main > div > main > section > div.sc-jSFjdj.hNVHSH > div.sc-gKAaRy.fCcgGo > table > tr:nth-child(${i}) > td:nth-child(${k}) > a > div`);
                let value = ""
                for(let j=0; j<someLit.length; j++){
                    value = await page.evaluate(
                        function (element) { 
                            return element.textContent
                        }, someLit[j]
                    );
                }
                console.log(value)
            }
            console.log("------------------------------------")
        }
    }
    catch (err) {
        console.log(err);
    }
})();