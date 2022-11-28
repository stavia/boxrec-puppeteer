const puppeteer = require('puppeteer');

module.exports = {
    findBoxer: findBoxer,
    findScoring: findScoring
};

async function login(browser, username, password) {
    page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1200, height: 720 });
    await page.goto('https://boxrec.com/en/login');
    await page.waitForSelector('#username');
    await page.type('#username', username);
    await page.type('#password', password);
    await Promise.all([
        page.click('.submitButton'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
    var form = await page.$$('button[mode=primary]');
    form = form[0];
    await form.evaluate(form => form.click());

    return page;
};

async function findBoxer(boxerId, username, password) {
    const browser = await puppeteer.launch({ headless: true });
    page = await login(browser, username, password);
    await page.goto('https://boxrec.com/en/box-pro/' + boxerId);
    await page.waitForSelector('.careerTable');
    let boxerHtml = await page.evaluate(() => document.documentElement.outerHTML);
    await browser.close();

    return boxerHtml;
}

async function findScoring(boutId, username, password) {
    const browser = await puppeteer.launch({ headless: true });
    page = await login(browser, username, password);
    await page.goto('https://boxrec.com/en/scoring/' + boutId);
    await page.waitForSelector('.boutResult');
    let scoringHtml = await page.evaluate(() => document.documentElement.outerHTML);
    await browser.close();

    return scoringHtml;
}