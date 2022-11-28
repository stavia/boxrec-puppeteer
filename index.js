const puppeteer = require('puppeteer');
const yargs = require('yargs');
const scraper = require('./scraper');
require('dotenv').config();

const argv = yargs
    .command('boxer [id]', 'Returns the HTML of the boxer', {
        id: {
            description: 'id of the boxer in boxrec. For example: 356831',
            type: 'string',
        }
    })
    .command('scoring [boutId]', 'Returns the HTML of the scoring of the bout', {
        boutId: {
            description: 'id of the bout in boxrec. For example: 2850125',
            type: 'string',
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv._.includes('boxer')) {
    try {
        (async () => {
            if (!argv.id) {
                console.log("The ID of the boxer is required");
                process.exit(1);
            }

            const browser = await puppeteer.launch({ headless: true });
            let result = await scraper.findBoxer(browser, argv.id);
            console.log(result);
            await browser.close();
        })()
    } catch (err) {
        console.error(err)
        process.exit(1);
    }
}

if (argv._.includes('scoring')) {
    try {
        (async () => {
            if (!argv.boutId) {
                console.log("The ID of the bout is required");
                process.exit(1);
            }

            const browser = await puppeteer.launch({ headless: true });
            let result = await scraper.findScoring(browser, argv.boutId);
            console.log(result);
            await browser.close();
        })()
    } catch (err) {
        console.error(err)
        process.exit(1);
    }
}